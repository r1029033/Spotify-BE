import transitionVideo from "../assets/videos/Transition.mp4";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Transition() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login-success");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="transition-page">
      <video className="transition-video" autoPlay muted loop playsInline>
        <source src={transitionVideo} type="video/mp4" />
      </video>
    </main>
  );
}
