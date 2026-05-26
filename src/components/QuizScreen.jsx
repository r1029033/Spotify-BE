import { useMemo, useState } from "react";


function QuizScreen({ questions, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const question = questions[currentQuestion];

  const options = useMemo(() => {
    return [question.correct_answer, question.wrong_option].sort(
      () => Math.random() - 0.5
    );
  }, [currentQuestion, question.correct_answer, question.wrong_option]);

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === null) return;

    const isCorrect = selected === question.correct_answer;
    const newScore = isCorrect ? score + 1 : score;

    if (currentQuestion + 1 < questions.length) {
      setScore(newScore);
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelected(null);
    } else {
      onComplete(newScore);
    }
  };

  const renderQuestionContent = () => (
    <div className="quiz-card-content animate-fadeInUp">
      <h3 className="question-text">{question.question_text}</h3>

      <div className="options">
        {options.map((option) => (
          <label
            key={option}
            className={`option ${selected === option ? "selected" : ""}`}
          >
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selected === option}
              onChange={() => handleSelect(option)}
            />

            {option}
          </label>
        ))}
      </div>

      <button
        className="next-button"
        onClick={handleNext}
        disabled={selected === null}
      >
        {currentQuestion + 1 === questions.length ? "Finish" : "Next"}
      </button>
    </div>
  );

  return (
    <div className="quiz-layout">
      <div className={`quiz-stack quiz-stack--${currentQuestion}`}>
        <div className="quiz-card quiz-card--pink">
          {currentQuestion === 0 && renderQuestionContent()}
        </div>

        <div className="quiz-card quiz-card--yellow">
          {currentQuestion === 1 && renderQuestionContent()}
        </div>

        <div className="quiz-card quiz-card--red">
          {currentQuestion === 2 && renderQuestionContent()}
        </div>
      </div>
    </div>
  );
}

export default QuizScreen;


