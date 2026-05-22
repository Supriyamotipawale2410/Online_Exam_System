from flask import Flask
from flask_cors import CORS

from db_config import mysql

from routes.student_routes import student_bp
from routes.admin_routes import admin_bp

app = Flask(__name__)

# ---------------- MYSQL CONFIG ----------------

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'online_exam'

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

    app.run(debug=True)