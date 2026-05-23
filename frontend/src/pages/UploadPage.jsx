import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function UploadPage() {

    const [subject_name, setSubjectName] = useState('');

    const [file, setFile] = useState(null);

    const uploadPaper = async () => {

        const formData = new FormData();

        formData.append("subject_name", subject_name);

        formData.append("file", file);

        try {

            const res = await axios.post(
                "http://127.0.0.1:5000/admin/upload-paper",
                formData
            );

            alert(res.data.message);

        }
        catch(err) {

            console.log(err);

        }

    };

    return (
        <>
        <Navbar />
        <div style={{padding:'30px'}}>

            <h1>Upload Excel Question Paper</h1>

            <input
                type="text"
                placeholder="Enter Subject Name"
                value={subject_name}
                onChange={(e) => setSubjectName(e.target.value)}
            />

            <br /><br />

            <input
                type="file"
                accept=".xlsx"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <br /><br />

            <button onClick={uploadPaper}>
                Upload Excel
            </button>

        </div>
        </>
    );

}

export default UploadPage;