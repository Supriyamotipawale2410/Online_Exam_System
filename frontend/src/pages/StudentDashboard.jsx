import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/studentdashboard.css';

function StudentDashboard() {

    const navigate = useNavigate();
    const [stats, setStats] = useState({});
    const studentName =
        localStorage.getItem('student_name');

        useEffect(() => {

    axios.get(
        `http://127.0.0.1:5000/student/dashboard/${localStorage.getItem('student_id')}`
    )
    .then((response) => {

        setStats(response.data);

    });

}, []);

    return (

        <>

            <Navbar />

            <div className="dashboard-container">

                <h1 className="dashboard-title">
                    👋 Welcome, {studentName}
                </h1>

                <div className="stats-container">

                    <div className="stats-card">
                        <h2>📚 5</h2>
                        <p>Total Subjects</p>
                    </div>

                    <div className="stats-card">
                        <h2>✅ 2</h2>
                        <p>Attempted</p>
                    </div>

                    <div className="stats-card">
                        <h2>📝 3</h2>
                        <p>Remaining</p>
                    </div>

                    <div className="stats-card">
                        <h2>🏆 18</h2>
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