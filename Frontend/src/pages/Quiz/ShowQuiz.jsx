import { replace, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SHOW_QUIZ } from "../../utils/Path";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


import {
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  Clock,
} from "lucide-react";
import ShowResult from "./ShowResult";



const ShowQuiz = () => {
  const navigate = useNavigate();
  const { tech, level } = useParams();
  const {isLoggedIn}  = useContext(AuthContext)


  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const getTimerValue = () => {
    if (level === "basic") return 6;
    if (level === "intermediate") return 10;
    if (level === "advanced") return 10;
    return 6;
  };

  const initialTime = getTimerValue();
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const timerRef = useRef(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    const handleViolation = () => {
      if (!showResults && !loading && questions.length > 0) {
        toast.error("⚠️ Violation: Tab switch or Minimize detected!", {
          toastId: "violation-toast",
          position: "top-center",
          autoClose: 2000,
        });

        setTimeout(() => {
          7;
          setShowResults(true);
        }, 3500);
      }
    };

    const handleVisibility = () => {
      if (document.hidden) handleViolation();
    };

    const handleBlur = () => {
      handleViolation();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
    };
  }, [showResults, loading, questions.length]);



  useEffect(() => {
    if( ! isLoggedIn){
       navigate('/register' , {replace : true})
       return ;  
    }

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${SHOW_QUIZ.QUESTION}`, {
          params: { technology: tech, level, limit: 10 },
        });
        if (res.data.success) {
          setQuestions(res.data.questions);
          setTimeLeft(getTimerValue());
        }
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [tech, level]);



  useEffect(() => {
    if (!isAnswered && !showResults && !loading && questions.length > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [currentQuestion, isAnswered, loading, showResults]);


  
  const handleTimeOut = () => {
    clearInterval(timerRef.current);
    setUserAnswers((prev) => ({ ...prev, [currentQuestion]: -1 }));
    setIsAnswered(true);
    setTimeout(() => handleNextQuestion(), 1500);
  };



  const handleAnswerSelect = (index) => {
    if (isAnswered) return;
    clearInterval(timerRef.current);
    setSelectedIdx(index);
    setIsAnswered(true);
    setUserAnswers((prev) => ({ ...prev, [currentQuestion]: index }));
  };


  
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedIdx(null);
      setTimeLeft(getTimerValue());
    } else {
      setShowResults(true);
    }
  };

  const correctCount = questions.filter(
    (q, i) => userAnswers[i] === q.correctAnswer
  ).length;
  const wrongCount = questions.length - correctCount;
  const score = questions.length
    ? Math.round((correctCount / questions.length) * 100)
    : 0;

  useEffect(() => {
    if (showResults) {
      const submit = async () => {
        if (submittedRef.current || !questions.length) return;
        const auth = JSON.parse(localStorage.getItem("auth"));
        try {
          submittedRef.current = true;
          await axios.post(
            `${SHOW_QUIZ.RESULT}`,
            {
              title: `${tech.toUpperCase()} - ${level} Quiz`,
              technology: tech,
              level,
              totalQuestions: questions.length,
              correct: correctCount,
              wrong: wrongCount,
            },
            {
              headers: { Authorization: `Bearer ${auth?.token}` },
            }
          );
        } catch (err) {
          console.log(err);
          submittedRef.current = false;
        }
      };
      submit();
    }
  }, [showResults]);

  

  if (showResults)
    return (
      <ShowResult
        wrongCount={wrongCount}
        correctCount={correctCount}
        score={score}
        questions={questions}
        userAnswers={userAnswers}
        tech={tech}
      />
    );


  if (loading)
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <Loader2 className="animate-spin text-purple-600 mb-2" size={40} />
        <p>Loading Assessment...</p>
      </div>
    );

  
  const currentQ = questions[currentQuestion];

  return (
    <div className="h-screen w-full flex justify-center bg-gray-50 p-4">

      <div
        className="w-full md:w-[600px] p-8 bg-white rounded-2xl shadow-xl border border-purple-100 relative overflow-auto 
  .no-scrollbar"
      >
       
        <div
          className="absolute top-0 left-0 h-1 transition-all duration-1000 linear"
          style={{
            width: `${(timeLeft / getTimerValue()) * 100}%`,
            backgroundColor: timeLeft <= 3 ? "#ef4444" : "#9333ea",
          }}
        ></div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
            {tech} <span className="text-purple-600"> {level} </span>
          </h1>
          <p className="text-xs text-gray-400 font-bold mt-1">
            Challenge Mode Active
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 font-bold">
            <Clock
              size={18}
              className={
                timeLeft <= 3 ? "text-red-500 animate-pulse" : "text-purple-600"
              }
            />
            <span
              className={timeLeft <= 3 ? "text-red-500" : "text-purple-600"}
            >
              {timeLeft}s
            </span>
          </div>
          <span className="text-xs font-bold text-gray-400">
            Question {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-8 leading-relaxed">
          {currentQ?.question}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {currentQ?.options.map((opt, i) => {
            const isCorrect = i === currentQ.correctAnswer;
            const isSelected = i === selectedIdx;
            let btnStyle = "border-gray-100";

            if (isAnswered) {
              if (isCorrect)
                btnStyle = "border-green-500 bg-green-50 text-green-700";
              else if (isSelected)
                btnStyle = "border-red-500 bg-red-50 text-red-700";
              else btnStyle = "opacity-40";
            } else {
              btnStyle = "hover:border-purple-400 hover:bg-purple-50";
            }

            return (
              <button
                key={i}
                disabled={isAnswered}
                onClick={() => handleAnswerSelect(i)}
                className={`w-full text-left px-6 py-4 border-2 rounded-xl font-medium transition-all ${btnStyle} flex justify-between items-center`}
              >
                {opt}
                {isAnswered && isCorrect && (
                  <CheckCircle size={20} className="text-green-600" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle size={20} className="text-red-600" />
                )}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-8">
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 mb-4 text-sm text-gray-700">
              <span className="font-bold text-purple-700 block mb-1">
                Explanation:
              </span>
              {currentQ?.explanation}
            </div>
            <button onClick={handleNextQuestion} className="btn w-full">
              {currentQuestion === questions.length - 1
                ? "See Results"
                : "Next Question"}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowQuiz;
