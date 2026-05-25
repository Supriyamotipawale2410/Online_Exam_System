import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function LoginPage() {

    const navigate = useNavigate();

    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [role, setRole] = useState('student');

    const login = () => {

        if(role === 'admin') {

            if(studentId === 'admin' && studentName === 'admin') {

                localStorage.setItem('role', 'admin');

                navigate('/admin-dashboard');

            }
            else {

                alert('Invalid Admin Credentials');

            }

        }
        else {

            fetch('http://127.0.0.1:5000/student/login', {

                method:'POST',

                headers:{
                    'Content-Type':'application/json'
                },

                body: JSON.stringify({

                    student_id: studentId,
                    student_name: studentName

                })

            })
            .then(async(res) => {

                const data = await res.json();

                if(res.ok) {

                    localStorage.setItem('student_id', studentId);

                    localStorage.setItem('student_name', studentName);

                    localStorage.setItem('role', 'student');

                    navigate('/subjects');

                }
                else {

                    alert(data.message);

                }

            });

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h1 className="login-title">
                    🎓 Online Exam System
                </h1>

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="login-input"
                >

                    <option value="student">
                       👨‍🎓 Student
                    </option>

                    <option value="admin">
                        👨Admin
                    </option>

                </select>

                <input
                    type="text"
                    placeholder="Enter ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="login-input"
                />

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="login-input"
                />

                <button
                    onClick={login}
                    className="login-btn"
                >
                    Login
                </button>

            </div>

        </div>

    );

}

export default LoginPage;