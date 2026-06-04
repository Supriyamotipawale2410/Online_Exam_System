import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {

    const navigate = useNavigate();

    const role = localStorage.getItem('role');

    const logout = () => {

        localStorage.clear();

        navigate('/');

    };

    return (

        <div className="navbar">

            <div className="logo">

                Online Exam System

            </div>

            <div className="nav-links">

                {
                    role === 'admin' ? (

                        <>

                            <Link to="/admin-dashboard">Dashboard</Link>
                            <Link to="/upload">Upload</Link>
                            <Link to="/students">Students</Link>
                            <Link to="/papers">Papers</Link>
                            <Link to="/results">Results</Link>

                        </>

                    ) : (

                        <>

                            <Link to="/student-dashboard">
                                Dashboard
                            </Link>

                            <Link to="/subjects">
                                Subjects
                            </Link>

                            <Link to="/my-results">
                                My Results
                            </Link>

                            <Link to="/profile">
                                Profile
                            </Link>

                            

                        </>

                    )
                }

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </div>

    );

}

export default Navbar;