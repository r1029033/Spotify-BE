import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx"


export default function Onboarding3() {
  const navigate = useNavigate();

  return (
    <main className="onboarding-screen">
      <div className="onboarding-screen__bg" />
      <div className="onboarding-screen__overlay" />

      <div className="onboarding-screen__phone">
        <div className="onboarding-screen__spotify-title-wrap">
          <h1 className="onboarding-screen__title">
            Connect Your
          </h1>

          <img
            src="/spotify-text.png"
            alt="Spotify"
            className="onboarding-screen__spotify-title-image"
          />
        </div>

        <p className="onboarding-screen__description">
          Connect Spotify to learn languages
          <br />
          through your favorite songs.
        </p>

        <Button
          text="Connect Spotify"
          className="onboarding-screen__button onboarding-screen__button--with-icon"
          onClick={() => navigate("/login")}
        >
          <span>Connect Spotify</span>
        </Button>
      </div>
    </main>
  );
}