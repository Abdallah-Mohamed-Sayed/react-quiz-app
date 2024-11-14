import { useState, useEffect, useCallback } from "react";
const questions = [
  {
    question: "What is the capital of France?",
    options: [
      { text: "New York", isCorrect: false },
      { text: "London", isCorrect: false },
      { text: "Paris", isCorrect: true },
      { text: "Dublin", isCorrect: false },
    ],
  },
  {
    question: "Who is CEO of Tesla?",
    options: [
      { text: "Jeff Bezos", isCorrect: false },
      { text: "Elon Musk", isCorrect: true },
      { text: "Bill Gates", isCorrect: false },
      { text: "Tony Stark", isCorrect: false },
    ],
  },
  {
    question: "The iPhone was created by which company?",
    options: [
      { text: "Apple", isCorrect: true },
      { text: "Intel", isCorrect: false },
      { text: "Amazon", isCorrect: false },
      { text: "Microsoft", isCorrect: false },
    ],
  },
  {
    question: "How many Harry Potter books are there?",
    options: [
      { text: "1", isCorrect: false },
      { text: "4", isCorrect: false },
      { text: "6", isCorrect: false },
      { text: "7", isCorrect: true },
    ],
  },
  {
    question: "How many continents are there?",
    options: [
      { text: "5", isCorrect: false },
      { text: "6", isCorrect: false },
      { text: "7", isCorrect: true },
      { text: "8", isCorrect: false },
    ],
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const handleNextQuestion = useCallback(() => {
    if (questions.length > currentQuestion + 1 && answered) {
      setAnswered(false);
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
    } else {
      setShowScore(true);
    }
  }, [currentQuestion, answered]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleNextQuestion]);

  const handleAnswer = (index, isCorrect) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(index);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleRestartQuiz = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setTimeLeft(10);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-96 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Quiz App</h1>
        <div>
          {!showScore ? (
            <div className="question-section mb-6">
              <h2 className="text-xl mb-4">
                {questions[currentQuestion].question}
              </h2>
              <div className="options-section">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    onClick={() => handleAnswer(index, option.isCorrect)}
                    key={index}
                    className={`${
                      answered
                        ? option.isCorrect
                          ? "bg-green-200"
                          : selectedAnswer === index
                          ? "bg-red-200"
                          : "bg-gray-200"
                        : ""
                    } option-button py-2 px-4 rounded mb-2 w-full border border-gray-300`}
                  >
                    {option.text}
                  </button>
                ))}
                <button
                  disabled={!answered}
                  onClick={handleNextQuestion}
                  className={`${
                    answered ? "bg-green-500" : "bg-gray-300"
                  } submit-button py-2 px-4 rounded text-white w-full mt-4`}
                >
                  {questions.length > currentQuestion + 1 ? "Next" : "Submit"}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
                <p className="text-sm text-gray-500 mt-5 mb-2">
                  Time left: {timeLeft}s
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{
                      width: `${
                        ((currentQuestion + 1) / questions.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xl mb-4">
                Your score is {score} of {questions.length}
              </p>
              <button
                onClick={handleRestartQuiz}
                className="bg-green-500 w-full text-white py-2 px-4 rounded"
              >
                Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
