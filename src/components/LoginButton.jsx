import { Link } from "react-router-dom";

export default function LoginButton({ text, href, className = "" }) {
  return (
    <Link to={href} className={`login-button ${className}`}>
      {text}
    </Link>
  );
}

