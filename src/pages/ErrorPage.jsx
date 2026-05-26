import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import error404 from "../assets/images/error-404.png";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <main className="error-page">
      <h1 className="error-page__title">
        Oops! This page is offbeat
      </h1>

      <img
        src={error404}
        alt="404 page not found"
        className="error-page__image"
      />

      <Button
        text="‹ Go Home"
        variant="primary"
        size="medium"
        onClick={() => navigate("/dashboard")}
        className="error-page__button"
      />
    </main>
  );
}

