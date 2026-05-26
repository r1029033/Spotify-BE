import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

import tenseGameVideo from "../assets/videos/tense_game_video.mp4";

export default function TenseGameExplanation() {
  const navigate = useNavigate();

const startGame = () => {
navigate("/game");
};

  return (
    <main className="transition-screen animate-fadeInUp">
      <section className="transition-screen__cards">
        <div className="tense-explanation__video-card">
          <video
            className="tense-explanation__video"
            src={tenseGameVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <div className="tense-explanation__content">
          <h2 className="tense-explanation__title">Fill in the blanks</h2>

          <p className="tense-explanation__text">
            Identify the missing verb in each lyric and choose the correct
            conjugation from the options
          </p>

          <Button
            text="Let’s go"
            variant="primary"
            size="medium"
            onClick={startGame}
            className="transition-screen__bottom-button"
          />
        </div>
      </section>
    </main>
  );
}