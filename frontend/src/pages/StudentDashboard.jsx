import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/studentdashboard.css';

function StudentDashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
    total_subjects: 0,
    attempted: 0,
    remaining: 0,
    highest: 0
});

    const studentName =
        localStorage.getItem('student_name');

    const studentId =
        localStorage.getItem('student_id');

    useEffect(() => {

        axios.get(
            `https://online-exam-system-00a8.onrender.com/student/dashboard/${studentId}`
        )
        .then((response) => {

            setStats(response.data);

        })
        .catch((error) => {

            console.log(error);

        });

    }, [studentId]);

    return (

        <>
            <Navbar />

            <div className="dashboard-container">

                <h1 className="dashboard-title">
                    👋 Welcome, {studentName}
                </h1>

                <div className="stats-container">

                    <div className="stats-card">
                        <h2>📚 {stats.total_subjects}</h2>
                        <p>Total Subjects</p>
                    </div>

                    <div className="stats-card">
                        <h2>✅ {stats.attempted}</h2>
                        <p>Attempted</p>
                    </div>

                    <div className="stats-card">
                        <h2>📝 {stats.remaining}</h2>
                        <p>Remaining</p>
                    </div>

                    <div className="stats-card">
                        <h2>🏆 {stats.highest}</h2>
                        <p>Highest Score</p>
                    </div>

                </div>

                <div className="action-container">

                    <div
                        className="action-card"
                        onClick={() => navigate('/subjects')}
                    >
                        📘 Subjects
                    </div>

                    <div
                        className="action-card"
                        onClick={() => navigate('/my-results')}
                    >
                        📊 My Results
                    </div>

                    <div
                        className="action-card"
                        onClick={() => navigate('/profile')}
                    >
                        👤 Profile
                    </div>

                </div>

            </div>

        </>
    );
}

export default StudentDashboard;