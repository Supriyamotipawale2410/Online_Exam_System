import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/papers.css';

function PapersPage() {

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {

        fetchSubjects();

    }, []);

    const fetchSubjects = () => {

        axios.get('http://127.0.0.1:5000/admin/all-subjects')
        .then((response) => {

            setSubjects(response.data);

        });

    };

    const deletePaper = (id) => {

        axios.delete(
            `http://127.0.0.1:5000/admin/delete-subject/${id}`
        )
        .then(() => {

            alert('Question Paper Deleted');

            fetchSubjects();

        });

    };

    return (

        <>

            <Navbar />

            <div className="page-container">

                <h1 className="page-title">
                    Question Papers 📄
                </h1>

                <div className="papers-grid">

                    {
                        subjects.map((subject) => (

                            <div
                                key={subject.id}
                                className="paper-card"
                            >

                                <h3 className="paper-title">
                                    {subject.subject_name}
                                </h3>

                                <button
                                    className="delete-btn"
                                    onClick={() => deletePaper(subject.id)}
                                >
                                    Delete Paper 📄
                                </button>

                            </div>

                        ))
                    }

                </div>

            </div>

        </>

    );

}

export default PapersPage;