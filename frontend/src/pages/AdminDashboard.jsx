import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function AdminDashboard() {

    return (
        <>
        <Navbar />
        <div style={{padding:'30px'}}>

            <h1>Admin Dashboard</h1>

            <div style={{marginTop:'30px'}}>

                <Link to="/upload">

                    <button
                        style={{
                            padding:'15px',
                            marginRight:'20px'
                        }}
                    >
                        Upload Questions
                    </button>

                </Link>

                <Link to="/results">

                    <button
                        style={{
                            padding:'15px'
                        }}
                    >
                        View Results
                    </button>

                </Link>

            </div>

        </div>
        </>
    );

}

export default AdminDashboard;