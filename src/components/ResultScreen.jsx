import abstractResult from "../assets/images/abstract_result.png";

function ResultScreen({ score, total, onPlayAgain }) {
  // This component receives:
  // score       → number of correct answers
  // total       → total number of questions
  // onPlayAgain → function that loads a brand new random song

  return (
    <div className="result-screen animate-fadeInUp">

<img src={abstractResult} alt="" />
      <h2>Well done!</h2>

      {/* Score display */}
      <p className="score">
        {score} / {total}
      </p>

      {/* Simple feedback based on score */}
      <p className="feedback">
        {score === total && "Perfect score!"}
        {score >= total / 2 && score < total && "Good job!"}
        {score < total / 2 && "Keep practising!"}
      </p>

      {/* Play again button — calls fetchRandomSong in Game2 */}
      <button className="play-again-button" onClick={onPlayAgain}>
        Play Again
      </button>
      <button className="home-button" onClick={() => window.location.href = "/dashboard"}>
        Dashboard
      </button>

    </div>
  );
}

export default ResultScreen;


