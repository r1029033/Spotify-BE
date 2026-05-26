import { Link } from "react-router-dom";

export default function LanguagePickerButton({ text, onClick, className = "" }) {
  return (
    <button className={`language-picker-button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}
