import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/myresults.css';

function MyResultsPage() {

    const [results, setResults] = useState([]);

    const studentId =
        localStorage.getItem('student_id');

    useEffect(() => {

        axios.get(
            `http://https://online-exam-system-00a8.onrender.com/student/my-results/${studentId}`
        )
        .then((response) => {

            setResults(response.data);

        });

    }, []);

    return (

        <>

            <Navbar />

            <div className="results-container">

                <h1>📊 My Results</h1>

                <table className="results-table">

                    <thead>

                        <tr>

                            <th>Subject</th>
                            <th>Total</th>
                            <th>Correct</th>
                            <th>Score</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            results.map((result,index) => (

                                <tr key={index}>

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

        </>

    );

}

export default MyResultsPage;