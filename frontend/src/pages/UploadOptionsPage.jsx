import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/uploadoptions.css';

function UploadOptionsPage() {

    const navigate = useNavigate();

    return (

        <>

            <Navbar />

            <div className="upload-options-container">

                <h1 className="upload-options-title">
                    Upload Center
                </h1>

                <p className="upload-options-subtitle">
                    Choose what you want to upload
                </p>

                <div className="upload-options-grid">

                    <div
                        onClick={() => navigate('/upload-questions')}
                        className="upload-option-card"
                    >

                        <div className="upload-icon">
                            📄
                        </div>

                        <h2>
                            Upload Question Paper
                        </h2>

                        <p>
                            Upload MCQ question papers using Excel
                        </p>

                    </div>

                    <div
                        onClick={() => navigate('/upload-students')}
                        className="upload-option-card"
                    >

                        <div className="upload-icon">
                            👨‍🎓
                        </div>

                        <h2>
                            Upload Students
                        </h2>

                        <p>
                            Upload student records using Excel
                        </p>

                    </div>

                </div>

            </div>

        </>

    );

}

export default UploadOptionsPage;