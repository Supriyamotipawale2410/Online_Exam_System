import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function UploadStudentsPage() {

    const [file, setFile] = useState(null);

    const uploadFile = () => {

        const formData = new FormData();

        formData.append('file', file);

        axios.post(
            'http://127.0.0.1:5000/admin/upload-students',
            formData
        )
        .then((response) => {

            alert(response.data.message);

        })
        .catch((error) => {

            console.log(error);

        });

    };

    return (

        <>

            <Navbar />

            <div style={{padding:'30px'}}>

                <h1>Upload Students Excel</h1>

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <br /><br />

                <button onClick={uploadFile}>
                    Upload Students
                </button>

            </div>

        </>

    );

}

export default UploadStudentsPage;