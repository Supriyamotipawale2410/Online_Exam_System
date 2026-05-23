import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function StudentLogin() {

  const navigate = useNavigate();

  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');

  const handleLogin = () => {

    localStorage.setItem('student_id', studentId);
    localStorage.setItem('student_name', studentName);

    navigate('/subjects');

  };

  return (

    <div style={{ padding: '30px' }}>

      <h1>Online Exam System</h1>

      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Continue
      </button>

    </div>

  );

}

export default StudentLogin;