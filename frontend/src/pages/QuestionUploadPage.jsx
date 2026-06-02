import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/upload.css';

function UploadPage() {

    const [subject_name, setSubjectName] = useState('');
    const [file, setFile] = useState(null);

    const uploadPaper = async () => {

        const formData = new FormData();

        formData.append("subject_name", subject_name);
        formData.append("file", file);

        try {

            const res = await axios.post(
                "http://https://online-exam-system-00a8.onrender.com/admin/upload-paper",
                formData
            );

            alert(res.data.message);

            setSubjectName('');
            setFile(null);

        }
        catch(err) {

            console.log(err);

            alert("Upload Failed");

        }

    };

    return (

        <>

            <Navbar />

            <div className="upload-container">

                <div className="upload-card">

                    <h1 className="upload-title">
                        Upload Question Paper
                    </h1>
                    <p>Upload question paper using Excel sheet</p>
                    <input
                        type="text"
                        placeholder="Enter Subject Name"
                        value={subject_name}
                        onChange={(e) => setSubjectName(e.target.value)}
                        className="upload-input"
                    />
                
                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="upload-file"
                    />

                    <button
                        onClick={uploadPaper}
                        className="upload-btn"
                    >
                        Upload Excel ⬆️
                    </button>

                </div>

            </div>

        </>

    );

}

export default UploadPage;