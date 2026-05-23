from flask import Blueprint, jsonify, request, send_file
from db_config import mysql
import pandas as pd
import os

admin_bp = Blueprint('admin_bp', __name__)

UPLOAD_FOLDER = 'uploads'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


# =========================================
# UPLOAD STUDENT EXCEL
# =========================================

# =========================================
# UPLOAD STUDENT EXCEL
# =========================================

@admin_bp.route('/upload-students', methods=['POST'])
def upload_students():

    try:

        file = request.files['file']

        df = pd.read_excel(file)

        cursor = mysql.connection.cursor()

        for index, row in df.iterrows():

            student_id = str(row['student_id'])
            student_name = str(row['student_name'])
            email = str(row['email'])
            city = str(row['city'])
            phone = str(row['phone'])
            gender = str(row['gender'])

            # CHECK IF STUDENT ALREADY EXISTS

            cursor.execute("""
                SELECT *
                FROM students
                WHERE student_id = %s
            """, (student_id,))

            existing_student = cursor.fetchone()

            if existing_student:

                continue

            cursor.execute("""
                INSERT INTO students
                (
                    student_id,
                    student_name,
                    email,
                    city,
                    phone,
                    gender
                )
                VALUES (%s,%s,%s,%s,%s,%s)
            """, (
                student_id,
                student_name,
                email,
                city,
                phone,
                gender
            ))

        mysql.connection.commit()

        cursor.close()

        return jsonify({
            "message": "Students Uploaded Successfully"
        })

    except Exception as e:

        return jsonify({
            "message": str(e)
        }), 500
    
# =========================================
# GET ALL STUDENTS
# =========================================

@admin_bp.route('/students', methods=['GET'])
def get_students():

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT
            id,
            student_id,
            student_name,
            email,
            city,
            phone,
            gender
        FROM students
    """)

    rows = cursor.fetchall()

    students = []

    for row in rows:

        students.append({

            "id": row[0],
            "student_id": row[1],
            "student_name": row[2],
            "email": row[3],
            "city": row[4],
            "phone": row[5],
            "gender": row[6]

        })

    cursor.close()

    return jsonify(students)


# =========================================
# DELETE STUDENT
# =========================================

@admin_bp.route('/delete-student/<id>', methods=['DELETE'])
def delete_student(id):

    cursor = mysql.connection.cursor()

    cursor.execute("""
        DELETE FROM students
        WHERE id = %s
    """, (id,))

    mysql.connection.commit()

    cursor.close()

    return jsonify({
        "message": "Student Deleted Successfully"
    })


# =========================================
# UPDATE STUDENT
# =========================================

@admin_bp.route('/update-student/<id>', methods=['PUT'])
def update_student(id):

    data = request.json

    student_name = data['student_name']
    email = data['email']
    city = data['city']
    phone = data['phone']
    gender = data['gender']

    cursor = mysql.connection.cursor()

    cursor.execute("""
        UPDATE students
        SET
            student_name = %s,
            email = %s,
            city = %s,
            phone = %s,
            gender = %s
        WHERE id = %s
    """, (
        student_name,
        email,
        city,
        phone,
        gender,
        id
    ))

    mysql.connection.commit()

    cursor.close()

    return jsonify({
        "message": "Student Updated Successfully"
    })


# =========================================
# DOWNLOAD STUDENTS EXCEL
# =========================================

@admin_bp.route('/download-students', methods=['GET'])
def download_students():

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT
            student_id,
            student_name,
            email,
            city,
            phone,
            gender
        FROM students
    """)

    rows = cursor.fetchall()

    cursor.close()

    data = []

    for row in rows:

        data.append({

            "Student ID": row[0],
            "Student Name": row[1],
            "Email": row[2],
            "City": row[3],
            "Phone": row[4],
            "Gender": row[5]

        })

    df = pd.DataFrame(data)

    file_name = "students.xlsx"

    df.to_excel(file_name, index=False)

    return send_file(
        file_name,
        as_attachment=True
    )


# Upload Excel Question Paper
@admin_bp.route('/upload-paper', methods=['POST'])
def upload_paper():

    subject_name = request.form['subject_name']

    file = request.files['file']

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)

    file.save(filepath)

    # READ EXCEL
    df = pd.read_excel(filepath)

    cursor = mysql.connection.cursor()

    # INSERT SUBJECT
    cursor.execute("""
        INSERT INTO subjects(subject_name)
        VALUES(%s)
    """, (subject_name,))

    mysql.connection.commit()

    subject_id = cursor.lastrowid

    # INSERT QUESTIONS
    for index, row in df.iterrows():

        cursor.execute("""
            INSERT INTO questions
            (
                subject_id,
                question,
                option1,
                option2,
                option3,
                option4,
                correct_answer
            )
            VALUES(%s,%s,%s,%s,%s,%s,%s)
        """, (
            subject_id,
            row['question'],
            row['option1'],
            row['option2'],
            row['option3'],
            row['option4'],
            row['correct_answer']
        ))

    mysql.connection.commit()

    cursor.close()

    return jsonify({
        "message":"Excel Question Paper Uploaded Successfully"
    })


# VIEW RESULTS
@admin_bp.route('/results', methods=['GET'])
def get_results():

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT
            id,
            student_id,
            student_name,
            subject_name,
            total_questions,
            correct_answers,
            score
        FROM results
    """)

    rows = cursor.fetchall()

    results = []

    for row in rows:

        results.append({
            "id": row[0],
            "student_id": row[1],
            "student_name": row[2],
            "subject_name": row[3],
            "total_questions": row[4],
            "correct_answers": row[5],
            "score": row[6]
        })

    cursor.close()

    return jsonify(results)

# DOWNLOAD RESULTS EXCEL

@admin_bp.route('/download-results', methods=['GET'])
def download_results():

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT
            student_id,
            student_name,
            subject_name,
            total_questions,
            correct_answers,
            score,
            exam_date
        FROM results
    """)

    rows = cursor.fetchall()

    cursor.close()

    data = []

    for row in rows:

        data.append({
            "Student ID": row[0],
            "Student Name": row[1],
            "Subject": row[2],
            "Total Questions": row[3],
            "Correct Answers": row[4],
            "Score": row[5],
            "Exam Date": row[6]
        })

    df = pd.DataFrame(data)

    file_name = "results.xlsx"

    df.to_excel(file_name, index=False)

    return send_file(
        file_name,
        as_attachment=True
    )