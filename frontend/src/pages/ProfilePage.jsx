import Navbar from '../components/Navbar';
import '../styles/profile.css';

function ProfilePage() {

    return (

        <>

            <Navbar />

            <div className="profile-container">

                <h1>👤 My Profile</h1>

                <div className="profile-card">

                    <p>
                        <strong>ID:</strong>
                        {' '}
                        {localStorage.getItem('student_id')}
                    </p>

                    <p>
                        <strong>Name:</strong>
                        {' '}
                        {localStorage.getItem('student_name')}
                    </p>

                </div>

            </div>

        </>

    );

}

export default ProfilePage;