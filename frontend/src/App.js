import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SubjectPage from './pages/SubjectPage';
import ExamPage from './pages/ExamPage';
import UploadPage from './pages/QuestionUploadPage';
import ResultsPage from './pages/ResultsPage';
import AdminDashboard from './pages/AdminDashboard';
import UploadStudentsPage from './pages/UploadStudentsPage';
import StudentsPage from './pages/StudentsPage';
import ProtectedRoute from './components/ProtectedRoute';
import UploadOptionsPage from './pages/UploadOptionsPage';
import QuestionUploadPage from './pages/QuestionUploadPage';
import StudentUploadPage from './pages/StudentUploadPage';
import PapersPage from './pages/PapersPage';
import StudentDashboard from './pages/StudentDashboard';
import MyResultsPage from './pages/MyResultsPage';
import ProfilePage from './pages/ProfilePage';

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
                    path="/students"
                    element={
                        <ProtectedRoute role="admin">
                            <StudentsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/papers"
                    element={
                        <ProtectedRoute role="admin">
                            <PapersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/upload-students"
                    element={
                        <ProtectedRoute role="admin">
                            <UploadStudentsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    
    path="/upload"
    element={
        <ProtectedRoute role="admin">
            <UploadOptionsPage />
        </ProtectedRoute>
    }
        />

        <Route
            path="/upload-questions"
            element={
                <ProtectedRoute role="admin">
                    <QuestionUploadPage />
                </ProtectedRoute>
            }
        />

        <Route
            path="/upload-students"
            element={
                <ProtectedRoute role="admin">
                    <StudentUploadPage />
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

                <Route
                path="/student-dashboard"
                element={
                    <ProtectedRoute role="student">
                        <StudentDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/my-results"
                element={
                    <ProtectedRoute role="student">
                        <MyResultsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute role="student">
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />


            </Routes>

            
        </BrowserRouter>

    );

}

export default App;