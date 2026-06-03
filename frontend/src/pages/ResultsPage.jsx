import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/resultspage.css';

function ResultsPage() {

    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [subjectFilter, setSubjectFilter] = useState('');

    useEffect(() => {

        axios.get('https://online-exam-system-00a8.onrender.com/admin/results')
        .then((response) => {

            setResults(response.data);

        })
        .catch((error) => {

            console.log(error);

        });

    }, []);

    const uniqueSubjects = [

        ...new Set(
            results.map((r) => r.subject_name)
        )

    ];

    const filteredResults = results
    .filter((result) => {

        return result.student_name
        .toLowerCase()
        .includes(search.toLowerCase());

    })
    .filter((result) => {

        if(subjectFilter === '') return true;

        return result.subject_name === subjectFilter;

    })
    .sort((a,b) => {

        if(sortOrder === 'high'){

            return b.score - a.score;

        }

        if(sortOrder === 'low'){

            return a.score - b.score;

        }

        return 0;

    });

    return (

        <>

            <Navbar />

            <div className="results-container">

                <h1 className="results-title">
                    📊 Student Results
                </h1>

                <div className="filter-bar">

                    <input
                        type="text"
                        placeholder="🔍 Search Student"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="search-input"
                    />

                    <select
                        value={sortOrder}
                        onChange={(e) =>
                            setSortOrder(e.target.value)
                        }
                        className="filter-select"
                    >

                        <option value="">
                            Sort By Marks
                        </option>

                        <option value="high">
                            Highest Marks
                        </option>

                        <option value="low">
                            Lowest Marks
                        </option>

                    </select>

                    <select
                        value={subjectFilter}
                        onChange={(e) =>
                            setSubjectFilter(e.target.value)
                        }
                        className="filter-select"
                    >

                        <option value="">
                            All Subjects
                        </option>

                        {
                            uniqueSubjects.map((subject,index) => (

                                <option
                                    key={index}
                                    value={subject}
                                >
                                    {subject}
                                </option>

                            ))
                        }

                    </select>

                    <a href="https://online-exam-system-00a8.onrender.com/admin/download-results">

                        <button className="download-btn">
                            <h3>⬇ Download </h3>
                            <p>You can download Excel of all Students Result Record here</p>
                        </button>

                    </a>

                </div>

                <table className="results-table">

                    <thead>

                        <tr>

                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Total</th>
                            <th>Correct</th>
                            <th>Score</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            filteredResults.map((result,index) => (

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

        </>

    );

}

export default ResultsPage;