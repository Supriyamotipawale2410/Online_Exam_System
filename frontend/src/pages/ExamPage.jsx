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
  const [submitted, setSubmitted] = useState(false);
const [timeLeft, setTimeLeft] = useState(

    Number(localStorage.getItem("duration_minutes")) * 60

);
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

useEffect(() => {

    if (timeLeft <= 0) {

        if (!submitted) {

            alert("Time Up!");

            submitExam();

        }

        return;

    }

    const timer = setInterval(() => {

        setTimeLeft(prev => prev - 1);

    }, 1000);

    return () => clearInterval(timer);

}, [timeLeft]);

  const handleAnswer = (questionId, option) => {

    setAnswers(prev => ({

        ...prev,

        [questionId]: option

    }));

};

 const submitExam = () => {

    if (submitted) {

        return;

    }

    if (questions.length === 0) {

        return;

    }

    if (Object.keys(answers).length === 0) {

        alert("Please answer at least one question.");

        return;

    }

    setSubmitted(true);

    const payload = {

        student_id: studentId,

        student_name: studentName,

        subject_id: subject_id,

        subject_name: localStorage.getItem("subject_name"),

        answers: answers

    };

    axios.post(

        "https://online-exam-system-00a8.onrender.com/student/submit",

        payload

    )

    .then((response) => {

        alert(response.data.message);

        setQuestions([]);

        navigate("/subjects");

    })

    .catch((error) => {

        alert(

            error.response?.data?.message ||

            "Submission Failed"

        );

        setSubmitted(false);

    });

};

 const minutes = Math.floor(timeLeft / 60);

const seconds = String(timeLeft % 60).padStart(2,'0');

if (questions.length === 0) {

    return (

        <>

            <Navbar />

            <div className="exam-container">

                <h2>Loading Questions...</h2>

            </div>

        </>

    );

}

if (questions.length === 0) {

    return (

        <>

            <Navbar />

            <div className="exam-container">

                <h2>Loading Questions...</h2>

            </div>

        </>

    );

}

  return (
        <>
    <Navbar />

    <div className="exam-container">

      <h1 className="exam-title">Exam Page</h1>
      <div className="exam-info">

    <p>

        Subject :
        {localStorage.getItem("subject_name")}

    </p>

    <p>

        Questions :
        {localStorage.getItem("total_questions")}

    </p>

    <p>

        Passing :
        {localStorage.getItem("passing_marks")}%

    </p>

</div>
      <h2 className="exam-timer">

    Time Left : {minutes}:{seconds}

    </h2>

      {
        questions.map((q, index) => (

          <div
            key={q.id}
            className="question-card"
          >

            <h3 className="question-title">

              Question {index + 1}

              <br />

              {q.question}

          </h3>

            <div className="option-box">
              <input
                type="radio"
                name={`question-${q.id}`}
                checked={answers[q.id]===q.option1}
                onChange={() => handleAnswer(q.id,q.option1)}
            />
              {q.option1}
            </div>

            <div className="option-box">
              <input
                type="radio"
                name={`question-${q.id}`}
                checked={answers[q.id]===q.option2}

                onChange={() => handleAnswer(q.id, q.option2)}
              />
              {q.option2}
            </div>

            <div className="option-box">
              <input
                type="radio"
                name={`question-${q.id}`}                                
                checked={answers[q.id]===q.option3}

                onChange={() => handleAnswer(q.id, q.option3)}
              />
              {q.option3}
            </div>

            <div className="option-box">
              <input
                type="radio"
                name={`question-${q.id}`}
                checked={answers[q.id]===q.option4}

                onChange={() => handleAnswer(q.id, q.option4)}
              />
              {q.option4}
            </div>

          </div>

        ))
      }

      <div className="exam-progress">

          Answered :

          {Object.keys(answers).length}

          /

          {questions.length}

          (

          {

              questions.length > 0

              ?

              Math.round(

                  (Object.keys(answers).length / questions.length) * 100

              )

              : 0

          }%

          )

      </div>
      <button
    className="submit-btn"
    onClick={submitExam}
    disabled={submitted}
>
        Submit Exam 
      </button>

    </div>
      </>
  );

}

export default ExamPage;