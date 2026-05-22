import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  return (

    <div style={{ textAlign: 'center', marginTop: '100px' }}>

      <h6>Online Exam System</h6>

      <button
        onClick={() => navigate('/admin-login')}
        style={{
          padding: '15px',
          margin: '20px',
          width: '200px'
        }}
      >
        Admin Login
      </button>

      <button
        onClick={() => navigate('/student-login')}
        style={{
          padding: '15px',
          margin: '20px',
          width: '200px'
        }}
      >
        Student Exam
      </button>

    </div>

  );

}

export default Home;