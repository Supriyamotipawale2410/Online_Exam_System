import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/subject.css';

function SubjectPage() {

    const [subjects, setSubjects] = useState([]);
    const [attemptedSubjects, setAttemptedSubjects] = useState([]);

    const navigate = useNavigate();

    const student_id = localStorage.getItem("student_id");
    const student_name = localStorage.getItem("student_name");

    useEffect(() => {

        fetchSubjects();

        fetchAttemptedSubjects();

    }, []);

    const fetchSubjects = () => {

        axios.get("http://127.0.0.1:5000/student/subjects")
        .then((res) => {

            setSubjects(res.data);

        })
        .catch((err) => {

            console.log(err);

        });

    };

    const fetchAttemptedSubjects = () => {

        axios.get(
            `http://127.0.0.1:5000/student/attempted-subjects/${student_id}`
        )
        .then((res) => {

            setAttemptedSubjects(res.data);

        })
        .catch((err) => {

            console.log(err);

        });

    };

    const selectSubject = (subject_id, subject_name) => {

        localStorage.setItem('subject_name', subject_name);

        navigate(`/exam/${subject_id}`);

    };

    return (

        <>

            <Navbar />

            <div className="subject-container">

                <div className="subject-header">

                    <h1 className="welcome-text">
                        Welcome, {student_name}
                    </h1>

                    <p className="subject-subtitle">
                       📘 Select a subject to start your exam
                    </p>

                </div>

                <div className="subject-grid">

                    {
                        subjects.map((subject) => {

                            const attempted =
                                attemptedSubjects.includes(subject.id);

                            return (

                                <div
                                    key={subject.id}
                                    className={
                                        attempted
                                        ? "subject-card attempted-card"
                                        : "subject-card"
                                    }
                                >

                                    <h3 className="subject-title">
                                        {subject.subject_name}
                                    </h3>
                                    
                                    <div className="subject-info">

                                        <p>🕒 60 Minutes</p>

                                        <p>❓ 20 Questions</p>

                                        <p>🎯 Passing: 40%</p>

                                    </div>

                                    {
                                        attempted ? (

                                            <button
                                                disabled
                                                className="attempted-btn"
                                            >
                                                Attempted ✅
                                            </button>

                                        ) : (

                                            <button
                                                className="start-btn"
                                                onClick={() =>
                                                    selectSubject(
                                                        subject.id,
                                                        subject.subject_name
                                                    )
                                                }
                                            >
                                               📝 Start Exam
                                            </button>

                                        )
                                    }

                                </div>

                            );

                        })
                    }

                </div>

            </div>

        </>

    );

}

export default SubjectPage;