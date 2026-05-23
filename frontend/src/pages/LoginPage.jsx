import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';

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

            localStorage.setItem('student_id', studentId);
            localStorage.setItem('student_name', studentName);
            localStorage.setItem('role', 'student');

            navigate('/subjects');

        }

    };

    return (

        <div
            style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                height:'100vh',
                background:'#f5f5f5'
            }}
        >

            <div
                style={{
                    width:'400px',
                    background:'white',
                    padding:'30px',
                    borderRadius:'10px',
                    boxShadow:'0px 0px 10px gray'
                }}
            >

                <h1 style={{textAlign:'center'}}>
                    Online Exam System
                </h1>

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                        width:'100%',
                        padding:'10px',
                        marginBottom:'20px'
                    }}
                >
                    <option value="student">
                        Student
                    </option>

                    <option value="admin">
                        Admin
                    </option>
                </select>

                <input
                    type="text"
                    placeholder="Enter ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    style={{
                        width:'100%',
                        padding:'10px',
                        marginBottom:'20px'
                    }}
                />

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    style={{
                        width:'100%',
                        padding:'10px',
                        marginBottom:'20px'
                    }}
                />

                <button
                    onClick={login}
                    style={{
                        width:'100%',
                        padding:'12px',
                        background:'blue',
                        color:'white',
                        border:'none',
                        cursor:'pointer'
                    }}
                >
                    Login
                </button>

            </div>

        </div>

    );

}

export default LoginPage;