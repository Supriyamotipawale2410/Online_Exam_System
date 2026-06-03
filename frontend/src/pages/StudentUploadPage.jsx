import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/uploadstudents.css';

function UploadStudentsPage() {

    const [file, setFile] = useState(null);

    const uploadFile = () => {

        const formData = new FormData();

        formData.append('file', file);

        axios.post(
            'https://online-exam-system-00a8.onrender.com/admin/upload-students',
            formData
        )
        .then((response) => {

            alert(response.data.message);

        })
        .catch((error) => {

            console.log(error);

            alert('Upload Failed');

        });

    };

    return (

        <>

            <Navbar />

            <div className="upload-students-container">

                <div className="upload-students-card">

                    <h1 className="upload-students-title">
                        Upload Students Excel
                    </h1>

                    <p className="upload-students-subtitle">
                        Upload student data using Excel sheet
                    </p>

                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="upload-students-file"
                    />

                    <button
                        onClick={uploadFile}
                        className="upload-students-btn"
                    >
                        Upload Students
                    </button>

                </div>

            </div>

        </>

    );

}

export default UploadStudentsPage;