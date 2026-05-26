import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Logo from "../assets/images/Logo_Lingo.png";

export default function Onboarding1() {
  const navigate = useNavigate();

  return (
    <main className="onboarding-screen">
      <div className="onboarding-screen__bg" />
      <div className="onboarding-screen__overlay" />

      <div className="onboarding-screen__phone onboarding-screen__phone--center">
        <img
          src={Logo}
          alt="Lingo logo"
          className="onboarding-screen__logo"
        />

        <h1 className="onboarding-screen__title onboarding-screen__title--center">
          Welcome to Lingo</h1>

        <div className="onboarding-screen__from">from</div>

        <img
          src="/spotify-text.png"
          alt="Spotify"
          className="onboarding-screen__spotify-text"
        />
      <Button text="Let's get started!" onClick={() => navigate("/onboarding2")} />
      </div>
    </main>
  );
}

