from flask import Flask
from flask_cors import CORS
import os
from db_config import mysql

from routes.student_routes import student_bp
from routes.admin_routes import admin_bp

app = Flask(__name__)

# ---------------- MYSQL CONFIG ----------------

app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
app.config['MYSQL_PORT'] = int(os.getenv('MYSQL_PORT', 3306))

mysql.init_app(app)

# ---------------- CORS ----------------

CORS(app)

# ---------------- BLUEPRINTS ----------------

app.register_blueprint(student_bp, url_prefix='/student')

app.register_blueprint(admin_bp, url_prefix='/admin')

# ---------------- MAIN ----------------

@app.route('/')
def home():

    return "Online Exam System Backend Running"

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )