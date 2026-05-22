import { useEffect, useState } from 'react';
import axios from 'axios';

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

        <div style={{padding:'30px'}}>

            <h1>Student Results</h1>

            <a href="http://127.0.0.1:5000/admin/download-results">

                <button
                    style={{
                        padding:'10px 20px',
                        marginBottom:'20px',
                        cursor:'pointer'
                    }}
                >
                    Download Excel
                </button>

            </a>

            <table
                border="1"
                cellPadding="10"
                style={{
                    width:'100%',
                    borderCollapse:'collapse'
                }}
            >

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

    );

}

export default ResultsPage;