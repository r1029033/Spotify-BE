import Button from "../components/Button";
import listenupintro from "../assets/images/listenupintro.png";
import { useNavigate } from "react-router-dom";

function Listenup() {
  const navigate = useNavigate();

return (
  <main className="transition-screen animate-fadeInUp">
    <section className="transition-screen__cards">
      <div className="listenup-card">
        <img
          src={listenupintro}
          alt="Listen Up Intro"
          className="listenup-card__image"
        />
      </div>

      <div className="tense-explanation__content">
        <h2 className="tense-explanation__title">Listen Up</h2>

        <p className="tense-explanation__text">
          Listen to the song, pay attention to the lyrics, then answer the
          questions.
        </p>

        <Button
          text="Let's go"
          variant="primary"
          size="medium"
          onClick={() => navigate("/game2")}
          className="transition-screen__bottom-button"
        />
      </div>
    </section>
  </main>
);
}

export default Listenup;