import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import NicknameIcon from "../assets/icons/nickname.png";

const AVATAR_OPTIONS = [
  "Felix",
  "Luna",
  "Zara",
  "Max",
  "Ivy",
];

export default function OnboardingProfile() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [selectedSeed, setSelectedSeed] = useState(AVATAR_OPTIONS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!nickname.trim()) {
      setError("Please enter a nickname!");
      return;
    }

    setLoading(true);
    setError("");

    fetch("http://localhost:3001/api/users/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname: nickname.trim(),
        avatar_seed: selectedSeed,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/language-picker");
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      });
  };

  return (
    <main className="onboarding-profile animate-fadeInUp">

      <h2>Setup your profile</h2>
      <h3>Select an avatar</h3>
    
      {/* Live preview — uses selectedSeed*/}
      <div className="onboarding-profile__preview">
        <img
          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${selectedSeed}`}
          alt="Your avatar"
          className="onboarding-profile__preview-img"
        />
      </div>

      {/* 5 avatar options */}
      <div className="onboarding-profile__avatars">
        {AVATAR_OPTIONS.map((seed) => (
          <button
            key={seed}
            className={`onboarding-profile__avatar-btn ${
              selectedSeed === seed ? "selected" : ""
            }`}
            onClick={() => setSelectedSeed(seed)}
          >
            <img
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`}
              alt={seed}
            />
          </button>
        ))}
      </div>

      <h3>Write your nickname </h3>

            <div className="onboarding-profile__input-wrap" style={{ position: "relative" }}>
              <img          src={NicknameIcon}
          alt="Nickname icon"
          className="onboarding-profile__input-icon" 
          style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--neutral-color-white)",
          pointerEvents: "none"
  }}
        />
        <input
          className="onboarding-profile__input"
          style={{ paddingLeft: "36px" }}
          type="text"
          placeholder="Your nickname"
          value={nickname}
          maxLength={20}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      {error && <p className="onboarding-profile__error">{error}</p>}

      <Button
        text={loading ? "Saving..." : "Continue"}
        onClick={handleContinue}
        disabled={loading}
      />

    </main>
  );
}