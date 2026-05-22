from flask import Blueprint, jsonify, request, send_file
from db_config import mysql
import pandas as pd
import os

admin_bp = Blueprint('admin_bp', __name__)

UPLOAD_FOLDER = 'uploads'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

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