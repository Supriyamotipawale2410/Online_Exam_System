import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SubjectPage from './pages/SubjectPage';
import ExamPage from './pages/ExamPage';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';
import AdminDashboard from './pages/AdminDashboard';

import ProtectedRoute from './components/ProtectedRoute';

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
                    element={
                        <ProtectedRoute role="student">
                            <SubjectPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/exam/:subject_id"
                    element={
                        <ProtectedRoute role="student">
                            <ExamPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/upload"
                    element={
                        <ProtectedRoute role="admin">
                            <UploadPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/results"
                    element={
                        <ProtectedRoute role="admin">
                            <ResultsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;