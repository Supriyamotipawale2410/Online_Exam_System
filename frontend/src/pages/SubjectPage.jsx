import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SubjectPage() {

    const [subjects, setSubjects] = useState([]);

    const navigate = useNavigate();

    // const student_id = localStorage.getItem("student_id");
    const student_name = localStorage.getItem("student_name");

    useEffect(() => {

        axios.get("http://127.0.0.1:5000/student/subjects")
        .then((res) => {

            console.log(res.data);

            setSubjects(res.data);

        })
        .catch((err) => {

            console.log(err);

        });

    }, []);

    const selectSubject = (subject_id, subject_name) => {
        localStorage.setItem('subject_name', subject_name);
        navigate(`/exam/${subject_id}`);

    };

    return (

        <div style={{padding:'30px'}}>

            <h1>Welcome {student_name}</h1>

            <h2>Select Subject</h2>

            {
                subjects.map((subject) => (

                    <div
                        key={subject.id}
                        style={{
                            border:'1px solid gray',
                            padding:'20px',
                            marginBottom:'20px',
                            cursor:'pointer'
                        }}
                        onClick={() => selectSubject(subject.id, subject.subject_name)}
                    >

                        <h3>{subject.subject_name}</h3>

                    </div>

                ))
            }

        </div>

    );

}

export default SubjectPage;