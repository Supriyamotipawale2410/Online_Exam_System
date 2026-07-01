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

// eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(() => {

    fetchSubjects();

    axios.get(
        `https://online-exam-system-00a8.onrender.com/student/attempted-subjects/${student_id}`
    )
    .then((res) => {

        setAttemptedSubjects(res.data);

    })
    .catch((err) => {

        console.log(err);

    });

}, [student_id]);

    const fetchSubjects = () => {

        axios.get("https://online-exam-system-00a8.onrender.com/student/subjects")
        .then((res) => {

            setSubjects(res.data);

        })
        .catch((err) => {

            console.log(err);

        });

    };

    

    const selectSubject = (subject) => {

    localStorage.setItem("subject_name", subject.subject_name);

    localStorage.setItem(
        "duration_minutes",
        subject.duration_minutes
    );

    localStorage.setItem(
        "total_questions",
        subject.total_questions
    );

    localStorage.setItem(
        "passing_marks",
        subject.passing_marks
    );

    navigate(`/exam/${subject.id}`);
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
                       Select a subject to start your exam
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

                                        <p>{subject.duration_minutes} Minutes</p>

                                        <p>{subject.total_questions} Questions</p>

                                        <p> Passing: {subject.passing_marks}%</p>
                                    </div>

                                    {
                                        attempted ? (

                                            <button
                                                disabled
                                                className="attempted-btn"
                                            >
                                                Attempted
                                            </button>

                                        ) : (

                                            <button
                                                className="start-btn"
                                                onClick={() => selectSubject(subject)}
                                            >
                                               Start Exam
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