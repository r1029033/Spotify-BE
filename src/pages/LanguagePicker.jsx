import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguagePickerButton from "../components/LanguagePickerButton";
import Button from "../components/Button";

const languages = ["Italian", "Dutch", "Spanish"];

export default function LanguagePicker({ userId }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  const handleSelect = async (lang) => {
    setSelected(lang);
    setError(null);
await fetch(`${import.meta.env.VITE_API_URL}/api/users/language`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ language: lang }),
});
  };

  const handleNext = () => {
    if (!selected) {
      setError("Please select a language first");
      return;
    }
navigate("/dashboard");
  };

  return (
    <main className="language-picker animate-fadeInUp">
      <h2>Select a language</h2>
      <div className="language-picker__buttons">
        {languages.map(lang => (
          <LanguagePickerButton
            key={lang}
            text={lang}
            onClick={() => handleSelect(lang)}
            className={selected === lang ? "button--selected" : ""}
          />
        ))}
      </div>
      {error && <p className="error">{error}</p>}
      <Button text="Next" onClick={handleNext} />
    </main>
  );
}


