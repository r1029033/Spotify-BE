import Abstract_success from "../assets/images/abstract_success.png";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Success() {
  const navigate = useNavigate();
  return (
    <main className="login-page-success animate-fadeInUp">
        <img
            className="login-page__image_success"
            src={Abstract_success}
            alt="Success visual"
        />
        <h2>Successfully</h2>
        <p>Your Spotify account is now connected.</p>
        <Button text="Next" onClick={() => navigate("/onboarding-profile")} />

    </main>
  );
}

