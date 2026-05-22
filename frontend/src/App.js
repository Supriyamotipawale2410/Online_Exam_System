import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SubjectPage from './pages/SubjectPage';
import ExamPage from './pages/ExamPage';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    path="/subjects"
                    element={<SubjectPage />}
                />

                <Route
                    path="/exam/:subject_id"
                    element={<ExamPage />}
                />

                <Route
                    path="/upload"
                    element={<UploadPage />}
                />

                <Route
                    path="/results"
                    element={<ResultsPage />}
                />

                <Route
                    path="/admin-dashboard"
                    element={<AdminDashboard />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;