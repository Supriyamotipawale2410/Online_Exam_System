from flask import Blueprint, jsonify, request
from db_config import mysql

student_bp = Blueprint('student_bp', __name__)


# =========================================
# STUDENT LOGIN
# =========================================

@student_bp.route('/login', methods=['POST'])
def login():

    data = request.json

    student_id = data['student_id']
    student_name = data['student_name']

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT *
        FROM students
        WHERE student_id = %s
        AND student_name = %s
    """, (
        student_id,
        student_name
    ))

    student = cursor.fetchone()

    cursor.close()

    if student:

        return jsonify({
            "message": "Login Successful"
        })

    else:

        return jsonify({
            "message": "Invalid Student Credentials"
        }), 401
    
    # =========================================
# GET ATTEMPTED SUBJECTS
# =========================================

@student_bp.route('/attempted-subjects/<student_id>', methods=['GET'])
def attempted_subjects(student_id):

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT subject_id
        FROM results
        WHERE student_id = %s
    """, (student_id,))

    rows = cursor.fetchall()

    attempted = []

    for row in rows:

        attempted.append(row[0])

    cursor.close()

    return jsonify(attempted)

# =========================================
# GET ALL SUBJECTS
# =========================================

@student_bp.route('/subjects', methods=['GET'])
def student_subjects():

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT * FROM subjects
    """)

    data = cursor.fetchall()

    subjects = []

    for row in data:

        subjects.append({
            "id": row[0],
            "subject_name": row[1]
        })

    cursor.close()

    return jsonify(subjects)


# =========================================
# GET QUESTIONS SUBJECT-WISE
# =========================================

@student_bp.route('/questions/<subject_id>', methods=['GET'])
def get_questions(subject_id):

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT
            id,
            question,
            option1,
            option2,
            option3,
            option4
        FROM questions
        WHERE subject_id = %s
    """, (subject_id,))

    rows = cursor.fetchall()

    questions = []

    for row in rows:

        questions.append({
            "id": row[0],
            "question": row[1],
            "option1": row[2],
            "option2": row[3],
            "option3": row[4],
            "option4": row[5]
        })

    cursor.close()

    return jsonify(questions)


# =========================================
# SUBMIT EXAM
# =========================================

@student_bp.route('/submit', methods=['POST'])
def submit_exam():

    data = request.json
    print(data)
    student_id = int(data['student_id'])
    student_name = data['student_name']
    subject_id = data['subject_id']
    answers = data['answers']
    subject_name = data['subject_name']

    cursor = mysql.connection.cursor()

    # =====================================
    # CHECK MULTIPLE ATTEMPT
    # =====================================

    cursor.execute("""
        SELECT *
        FROM results
        WHERE student_id = %s
        AND subject_id = %s
    """, (student_id, subject_id))
    print(student_id,subject_id)
    existing_attempt = cursor.fetchone()
    print(existing_attempt)

    if existing_attempt:

        cursor.close()

        return jsonify({
            "message": "You already attempted this exam"
        }), 400

    # =====================================
    # CHECK ANSWERS
    # =====================================

    correct_count = 0

    for question_id, selected_answer in answers.items():

        cursor.execute("""
            SELECT correct_answer
            FROM questions
            WHERE id = %s
        """, (question_id,))

        result = cursor.fetchone()

        if result and result[0] == selected_answer:

            correct_count += 1

    total_questions = len(answers)

    score = correct_count

    # =====================================
    # STORE RESULT
    # =====================================

    cursor.execute("""
        INSERT INTO results
        (
            student_id,
            student_name,
            subject_id,
            subject_name,
            total_questions,
            correct_answers,
            score
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s)
    """, (
        student_id,
        student_name,
        subject_id,
        subject_name,
        total_questions,
        correct_count,
        score
    ))

    mysql.connection.commit()

    cursor.close()

    return jsonify({
        "message": "Exam Submitted Successfully"
    })