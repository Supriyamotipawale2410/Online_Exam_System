import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/results.css';

function ResultsPage() {

    const [results, setResults] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:5000/admin/results')
        .then((response) => {

            setResults(response.data);

        })
        .catch((error) => {

            console.log(error);

        });

    }, []);

    return (

        <>

            <Navbar />

            <div className="results-container">

                <div className="results-header">

                    <h1 className="results-title">
                        Student Results 📊
                    </h1>

                    <a href="http://127.0.0.1:5000/admin/download-results">

                        <button className="download-btn">
                            Download Excel 📥
                        </button>

                    </a>

                </div>

                <div className="table-wrapper">

                    <table className="results-table">

                        <thead>

                            <tr>

                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Subject</th>
                                <th>Total Questions</th>
                                <th>Correct Answers</th>
                                <th>Score</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                results.map((result, index) => (

                                    <tr key={index}>

                                        <td>{result.student_id}</td>
                                        <td>{result.student_name}</td>
                                        <td>{result.subject_name}</td>
                                        <td>{result.total_questions}</td>
                                        <td>{result.correct_answers}</td>
                                        <td>{result.score}</td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}

export default ResultsPage;