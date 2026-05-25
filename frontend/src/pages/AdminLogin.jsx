import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function AdminLogin() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = () => {

        if(username === "admin" && password === "admin123") {

            navigate('/admin/dashboard');

        }
        else {

            alert("Invalid Credentials");

        }

    };

    return (

        <div className="page-container">

            <h1>Admin Login</h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={login}>
                Login
            </button>

        </div>

    );

}

export default AdminLogin;