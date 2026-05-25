import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/global.css';
import './styles/navbar.css';
import './styles/table.css';
import './styles/forms.css';
import './styles/dashboard.css';
import './styles/exam.css';
import './styles/login.css';
import './styles/papers.css';
import './styles/results.css';
import './styles/studentlogin.css';
import './styles/students.css';
import './styles/subject.css';
import './styles/upload.css';
import './styles/uploadoptions.css';
import './styles/uploadstudents.css';
import './styles/theme.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
