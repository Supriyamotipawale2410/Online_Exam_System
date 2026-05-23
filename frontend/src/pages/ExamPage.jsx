import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ExamPage() {

  const { subject_id } = useParams();

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);

  const studentId = localStorage.getItem('student_id');
  const studentName = localStorage.getItem('student_name');

  useEffect(() => {

    axios.get(`http://127.0.0.1:5000/student/questions/${subject_id}`)
      .then((response) => {

        setQuestions(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

}, [subject_id]);

useEffect(() => {

    if (timeLeft <= 0) {

        submitExam();

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
      'http://127.0.0.1:5000/student/submit',
      payload
    )
    .then((response) => {

      alert(response.data.message);
      setQuestions([]);
      navigate('/');

    })
    .catch((error) => {

      alert(error.response.data.message);

    });

  };

  return (
        <>
    <Navbar />

    <div style={{ padding: '30px' }}>

      <h1>Exam Page</h1>
      <h2>
      Time Left: {timeLeft} Seconds
      </h2>

      {
        questions.map((q) => (

          <div
            key={q.id}
            style={{
              border: '1px solid black',
              padding: '20px',
              marginBottom: '20px'
            }}
          >

            <h3>{q.question}</h3>

            <div>
              <input
                type="radio"
                name={`question-${q.id}`}
                onChange={() => handleAnswer(q.id, q.option1)}
              />
              {q.option1}
            </div>

            <div>
              <input
                type="radio"
                name={`question-${q.id}`}
                onChange={() => handleAnswer(q.id, q.option2)}
              />
              {q.option2}
            </div>

            <div>
              <input
                type="radio"
                name={`question-${q.id}`}
                onChange={() => handleAnswer(q.id, q.option3)}
              />
              {q.option3}
            </div>

            <div>
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

      <button onClick={submitExam}>
        Submit Exam
      </button>

    </div>
      </>
  );

}

export default ExamPage;