import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/dashboard.css';

function AdminDashboard() {

    return (

        <>

            <Navbar />

            <div className="admin-dashboard-container">

                <h1 className="admin-dashboard-title">
                    Admin Dashboard
                </h1>

                <p className="admin-dashboard-subtitle">
                    Manage students, papers, uploads and results
                </p>

                <div className="admin-dashboard-grid">

                    <Link
                        to="/upload-students"
                        className="dashboard-link"
                    >

                        <div className="dashboard-box pastel-pink">

                            <h3>Upload Students Data</h3>

                            <p>
                                Upload student Excel sheet
                            </p>

                        </div>

                    </Link>

                    <Link
                        to="/students"
                        className="dashboard-link"
                    >

                        <div className="dashboard-box pastel-purple">

                            <h3>Manage Students Data</h3>

                            <p>
                                Edit and manage student data
                            </p>

                        </div>

                    </Link>

                    <Link
                        to="/upload-questions"
                        className="dashboard-link"
                    >

                        <div className="dashboard-box pastel-blue">

                            <h3>Upload Question Paper</h3>

                            <p>
                                Upload exam papers in Excel
                            </p>

                        </div>

                    </Link>

                    <Link
                        to="/results"
                        className="dashboard-link"
                    >

                        <div className="dashboard-box pastel-green">

                            <h3>View Results</h3>

                            <p>
                                Check student performance
                            </p>

                        </div>

                    </Link>

                </div>

            </div>

        </>

    );

}

export default AdminDashboard;