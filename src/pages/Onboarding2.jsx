import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx"

export default function Onboarding2() {
  const navigate = useNavigate();

  return (
    <main className="onboarding-screen">
      <div className="onboarding-screen__bg" />
      <div className="onboarding-screen__overlay" />

      <div className="onboarding-screen__phone">
        
        <div className="onboarding-screen__content-top">
          <h1 className="onboarding-screen__title">
            Learn languages
            through your
            music
          </h1>

          <p className="onboarding-screen__description">
            Practice vocabulary and grammar
            <br />
            with your favorite Spotify songs.
          </p>
        </div>

        <Button
          text="Next"
          className="onboarding-screen__button"
          onClick={() => navigate("/onboarding3")}
        >
        </Button>
      </div>
    </main>
  );
}