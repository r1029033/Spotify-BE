import { useState, useEffect, useRef } from "react";
import LyricDisplay from "../components/LyricDisplay";
import QuizScreen from "../components/QuizScreen";
import ResultScreen from "../components/ResultScreen";
import PlayButton from "../assets/icons/playButton.svg";
import PauseButton from "../assets/icons/pauseButton.svg";
import ReplayButton from "../assets/icons/replayButton.svg";
import SkipButton from "../assets/icons/skipButton.svg";

function Game2() {

  const MAX_PLAY_TIME = 60; // Cap the song at 1 mins 
  const [song, setSong] = useState(null);
  const [lyrics, setLyrics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [gamePhase, setGamePhase] = useState("loading");
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  // duration: total length of the song in seconds

  const audioRef = useRef(null);

  useEffect(() => {
    fetchRandomSong();
  }, []);

  const fetchRandomSong = () => {
    setGamePhase("loading");
    setScore(0);
    setCurrentTime(0);
    setIsPlaying(false);
    setDuration(0);

    fetch("${import.meta.env.VITE_API_URL}/api/game2/random")
      .then((res) => res.json())
      .then((data) => {
        setSong(data.song);
        setLyrics(data.lyrics);
        setQuestions(data.questions);
        setGamePhase("playing");
      })
      .catch((err) => {
        console.error("Failed to fetch song:", err);
      });
  };

  // Gets the total duration once the audio file has loaded, but then caps it at 1 min
const handleLoadedMetadata = () => {
  if (audioRef.current) {
    setDuration(Math.min(audioRef.current.duration, MAX_PLAY_TIME));
  }
};

  // Updates currentTime constantly as the song plays, capped at 1 min
const handleTimeUpdate = () => {
  if (audioRef.current) {
    const time = audioRef.current.currentTime;
    setCurrentTime(time);

    if (time >= MAX_PLAY_TIME) {
      audioRef.current.pause();
      setGamePhase("quiz");
      setIsPlaying(false);
    }
  }
};

  // Called automatically when the song finishes
  const handleSongEnd = () => {
    setGamePhase("quiz");
    setIsPlaying(false);
  };

  // Called by QuizScreen when all questions are answered
const handleQuizComplete = (finalScore) => {
  setScore(finalScore);
  setGamePhase("result");

  // Calculate how many seconds the user listened
  const listenedTime = audioRef.current ? audioRef.current.currentTime : 0;

  // Send the results to the backend to update stats
  fetch("${import.meta.env.VITE_API_URL}/api/stats/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      score: finalScore,
      total: questions.length,
      listeningTime: listenedTime,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Stats updated:", data);
    })
    .catch((err) => {
      console.error("Failed to update stats:", err);
    });
};
  // Toggles between play and pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Restarts the song from the beginning
  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Skips straight to the quiz without waiting for song to end
  const handleSkipToQuiz = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setGamePhase("quiz");
  };

  if (gamePhase === "loading") {
    return <div className="game-loading">Loading song...</div>;
  }

  return (
<div className={`game2-container ${gamePhase === "quiz" ? "quiz-bg" : ""} ${gamePhase === "result" ? "result-bg" : ""}` }>
        {/* Audio element — invisible, always present */}
      <audio
        ref={audioRef}
        src={song.jamendo_url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSongEnd}
        onLoadedMetadata={handleLoadedMetadata}
        // onLoadedMetadata fires once the browser has read
        // the audio file and knows its total duration
      />

      {/* Lyrics screen — visible while song is playing */}
      {gamePhase === "playing" && (
        <LyricDisplay lyrics={lyrics} currentTime={currentTime} />
      )}

      {/* Quiz screen — visible after song ends or skip is pressed */}
      {gamePhase === "quiz" && (
  <div className="quiz-wrapper">
    <div className="quiz-blob quiz-blob--red" />
    <div className="quiz-blob quiz-blob--purple" />
    <div className="quiz-blob quiz-blob--yellow" />
    <QuizScreen
      questions={questions}
      onComplete={handleQuizComplete}
    />
  </div>
)}

      {/* Result screen — visible after all questions are answered */}
      {gamePhase === "result" && (
        <ResultScreen
          score={score}
          total={questions.length}
          onPlayAgain={fetchRandomSong}
        />
      )}

      {/* Player controls — only visible during playing phase */}
      {gamePhase === "playing" && (
        <div className="player-controls">

          {/* Song title and artist */}
          <div className="song-info">
            <p className="song-title">{song.title}</p>
            <p className="song-artist">{song.artist}</p>
          </div>

          {/* Progress bar with current time and total duration */}
          <div className="progress-bar-container">

            {/* Current time in mm:ss format */}
            <span>
              {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, "0")}
            </span>

            {/* Draggable range input that acts as a scrubber */}
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => {
                // When user drags the bar, jump to that position
                audioRef.current.currentTime = Number(e.target.value);
                setCurrentTime(Number(e.target.value));
              }}
              className="progress-bar"
            />

            {/* Total duration in mm:ss format */}
            <span>
              {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, "0")}
            </span>

          </div>

          {/* Control buttons row */}
          <div className="control-buttons">

            {/* Restart button — goes back to beginning */}
            <button onClick={handleRestart}>
              <img src={ReplayButton} alt="Restart" />
            </button>

            {/* Play/pause toggle */}
            <button onClick={togglePlay}>
              {isPlaying 
              ? <img src={PauseButton} alt="Pause" />
              : <img src={PlayButton} alt="Play" />
              }
            </button>

            {/* Skip to questions button */}
            <button onClick={handleSkipToQuiz}>
              <img src={SkipButton} alt="Skip to Quiz"/>
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Game2;

