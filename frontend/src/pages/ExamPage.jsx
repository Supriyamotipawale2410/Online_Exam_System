import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/exam.css';

function ExamPage() {

  const { subject_id } = useParams();

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);

  const studentId = localStorage.getItem('student_id');
  const studentName = localStorage.getItem('student_name');

  useEffect(() => {

    axios.get(
    `https://online-exam-system-00a8.onrender.com/student/questions/${subject_id}`
    )
      .then((response) => {

        setQuestions(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

}, [subject_id]);

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {

    if (timeLeft <= 0) {

        alert("Time Up!");
        return;

    }

    const timer = setInterval(() => {

        setTimeLeft((prev) => prev - 1);

    }, 1000);

    return () => clearInterval(timer);

}, [timeLeft]);

  const handleAnswer = (questionId, option) => {

    setAnswers({
      ...answers,
      [questionId]: option
    });

  };

  const submitExam = () => {

    if (questions.length === 0) return;

  const payload = {

  student_id: studentId,

  student_name: studentName,

  subject_id: subject_id,

  subject_name: localStorage.getItem('subject_name'),

  answers: answers

};

    axios.post(
      'https://online-exam-system-00a8.onrender.com/student/submit',
      payload
    )
    .then((response) => {

      alert(response.data.message);
      setQuestions([]);
      navigate('/subjects');

    })
    .catch((error) => {

      alert(error.response.data.message);

    });

  };

  return (
        <>
    <Navbar />

    <div className="exam-container">

      <h1 className="exam-title">🧠 Exam Page</h1>
      <h2 className="exam-timer">
      ⏳ Time Left: {timeLeft} Seconds
      </h2>

      {
        questions.map((q) => (

          <div
            key={q.id}
            className="question-card"
          >

            <h3 className="question-title">
              📄 {q.question}
            </h3>

            <div className="option-box">
              <input
                type="radio"
                name={`question-${q.id}`}
                onChange={() => handleAnswer(q.id, q.option1)}
              />
              {q.option1}
            </div>

            <div className="option-box">
              <input
                type="radio"
                name={`question-${q.id}`}
                onChange={() => handleAnswer(q.id, q.option2)}
              />
              {q.option2}
            </div>

            <div className="option-box">
              <input
                type="radio"
                name={`question-${q.id}`}
                onChange={() => handleAnswer(q.id, q.option3)}
              />
              {q.option3}
            </div>

            <div className="option-box">
              <input
                type="radio"
                name={`question-${q.id}`}
                onChange={() => handleAnswer(q.id, q.option4)}
              />
              {q.option4}
            </div>

          </div>

        ))
      }

      <button
        className="submit-btn"
        onClick={submitExam}
      >
        🚀 Submit Exam 
      </button>

    </div>
      </>
  );

}

export default ExamPage;