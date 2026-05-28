import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/studentlogin.css';

function StudentLogin() {

    const navigate = useNavigate();

    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');

    const handleLogin = () => {

        localStorage.setItem('student_id', studentId);
        localStorage.setItem('student_name', studentName);

        navigate('/student-dashboard');

    };

    return (

        <div className="student-login-container">

            <div className="student-login-card">

                <h1 className="student-login-title">
                    Online Exam System
                </h1>

                <p className="student-login-subtitle">
                    Student Login
                </p>

                <input
                    type="text"
                    placeholder="Enter Student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="student-login-input"
                />

                <input
                    type="text"
                    placeholder="Enter Student Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="student-login-input"
                />

                <button
                    onClick={handleLogin}
                    className="student-login-btn"
                >
                    Continue
                </button>

            </div>

        </div>

    );

}

export default StudentLogin;