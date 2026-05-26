import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

import background from "../assets/images/background_blur.png";
import italy from "../assets/images/italy.png";
import spanishFlag from "../assets/images/spain.png";
import dutchFlag from "../assets/images/dutch.png";
import songsImage1 from "../assets/images/songsimage1.png";
import songsImage2 from "../assets/images/songsimage2.png";
import streakBadge from "../assets/images/streak.png";
import mondayGamesImage from "../assets/images/monday-games-img.png";
import lightningActive from "../assets/images/lightning_active.png";
import lightningInactive from "../assets/images/lightning_inactive.png";
import NavbarTop from '../components/NavbarTop';
import NavbarBottom from '../components/NavbarBottom';
import Loader from "../components/Loader";

const AVATAR_OPTIONS = [
  "Felix",
  "Luna",
  "Zara",
  "Max",
  "Ivy",
];
const LANGUAGE_OPTIONS = [
  { name: "Italian", image: italy },
  { name: "Dutch", image: dutchFlag },
  { name: "Spanish", image: spanishFlag },
];

function Profile() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [selectedSeed, setSelectedSeed] = useState(AVATAR_OPTIONS[0]);
  const [draftNickname, setDraftNickname] = useState("");
  const [draftSeed, setDraftSeed] = useState(AVATAR_OPTIONS[0]);
  const [saving, setSaving] = useState(false);
  const [joinedDate, setJoinedDate] = useState("");
  const [language, setLanguage] = useState("");
  const [draftLanguage, setDraftLanguage] = useState("Italian");

const streakDays = ["M", "T", "W", "Th", "F", "S", "Su"];

const getActiveDay = () => {
  if (!stats?.last_played) return null;

  const dayIndex = new Date(stats.last_played).getDay();
  const dayMap = ["Su", "M", "T", "W", "Th", "F", "S"];

  return dayMap[dayIndex];
};

const activeDay = getActiveDay();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users`)
      .then((res) => res.json())
.then((data) => {
  setNickname(data.nickname || "Player");
  setSelectedSeed(data.avatar_seed || AVATAR_OPTIONS[0]);
  setLanguage(data.language || "Italian");

  if (data.created_at) {

    const formattedDate = new Date(
      data.created_at
    ).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    setJoinedDate(`Joined ${formattedDate}`);
  }
})
      .catch((err) => console.error("Failed to fetch user:", err));

    fetch(`${import.meta.env.VITE_API_URL}/api/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  const handleSave = () => {
    if (!draftNickname.trim()) return;
    setSaving(true);

    fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
  nickname: draftNickname.trim(),
  avatar_seed: draftSeed,
  language: draftLanguage,
}),
    })
      .then((res) => res.json())
      .then((data) => {
        setNickname(data.nickname);
        setSelectedSeed(data.avatar_seed);
        setLanguage(data.language);
        setIsEditing(false);
        setSaving(false);
      })
      .catch((err) => {
        console.error("Failed to save profile:", err);
        setSaving(false);
      });
  };

if (!stats) {
  return <Loader text="Loading profile..." />;
}

  return (
    <>
      <NavbarTop />

      <main className="profile-page animate-fadeInUp">

        <section
          className="profile-header"
          style={{ backgroundImage: `url(${background})` }}
        >
          {/* ✅ selectedSeed not seed */}
          <img
            className="profile-avatar"
            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${selectedSeed}`}
            alt="avatar"
          />

          <h1>{nickname || "Your name"}</h1>

          <Button
            text="✎ Edit"
            onClick={() => {
  setDraftNickname(nickname);
  setDraftSeed(selectedSeed);
  setDraftLanguage(language);
  setIsEditing(true);
}}
            className="profile-edit-button"
          />
        </section>

        {isEditing && (
  <section className="profile-edit-overlay">
    <div className="profile-edit-modal">

      <h2>Edit profile</h2>

      <label className="profile-edit-label">
        Edit nickname

        <input
          className="profile-edit__input"
          type="text"
          value={draftNickname}
          maxLength={20}
          onChange={(e) => setDraftNickname(e.target.value)}
          placeholder="Your nickname"
        />
      </label>

      <h3>Avatar</h3>

      <div className="profile-edit__avatars">
        {AVATAR_OPTIONS.map((seed) => (
          <button
            key={seed}
            type="button"
            className={`profile-edit__avatar-btn ${
            draftSeed === seed ? "selected" : ""
            }`}
            onClick={() => setDraftSeed(seed)}
          >
            <img
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`}
              alt={seed}
            />
          </button>
        ))}
      </div>
      <h3>Language</h3>

<div className="profile-edit__languages">
  {LANGUAGE_OPTIONS.map((option) => (
    <button
      key={option.name}
      type="button"
      className={`profile-edit__language-btn ${
        draftLanguage === option.name ? "selected" : ""
      }`}
      onClick={() => setDraftLanguage(option.name)}
    >
      <img
        src={option.image}
        alt={option.name}
        className="profile-edit__language-image"
      />

      <span className="profile-edit__language-name">
        {option.name}
      </span>
    </button>
  ))}
</div>

      <div className="profile-edit__buttons">
        <Button
          text={saving ? "Saving..." : "Save changes"}
          onClick={handleSave}
          disabled={saving}
        />

        <button
          type="button"
          className="profile-edit__cancel"
          onClick={() => {
setDraftNickname(nickname);
setDraftSeed(selectedSeed);
setDraftLanguage(language);
setIsEditing(false);

}}
        >
          Cancel
        </button>
      </div>

    </div>
  </section>
)}

        <section className="profile-info">
          <p>{joinedDate || "Joined recently"}</p>
<div className="profile-course">
  <span>Language</span>

  <img
    src={
      language === "Spanish"
        ? spanishFlag
        : language === "Dutch"
        ? dutchFlag
        : italy
    }
    alt={`${language} language`}
  />
</div>
        </section>

        <section className="profile-streak">
          <h2>Streak</h2>
          <div className="profile-streak-card">
            <div className="profile-streak-badge">
              <img src={streakBadge} alt="Streak badge" />
              <span>{stats?.streak ?? 0}</span>
            </div>
            <div className="profile-streak-days">
              {streakDays.map((day) => {
                const isActive = day === activeDay;
                return (
                  <div
                    key={day}
                    className={`profile-streak-day ${isActive ? "active" : ""}`}
                  >
                    <img
                      src={isActive ? lightningActive : lightningInactive}
                      alt=""
                      className="profile-streak-icon"
                    />
                    <small>{day}</small>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="profile-games">
          <h2>Continue learning</h2>
          <div
         className="profile-game-card"
        onClick={() => navigate("/tense-intro")}
          >
            <img src={songsImage1} alt="Tense game" />
            <div>
              <h3>Tense game</h3>
              <p>Practice grammar with songs</p>
            </div>
            <span>›</span>
          </div>
          <div className="profile-game-card" onClick={() => navigate("/listenup")}>
            <img src={songsImage2} alt="Listen up" />
            <div>
              <h3>Listen up</h3>
              <p>Train listening skills</p>
            </div>
            <span>›</span>
          </div>
        </section>

        <section
          className="hero profile-monday-card"
          onClick={() => navigate("/tense-intro")}
        >
          <div className="hero_section">
            <h2 className="hero_title">Monday games</h2>
            <p className="hero_subtitle">Play now!</p>
          </div>
          <img
            src={mondayGamesImage}
            alt="Monday games img"
            className="monday-games_img"
          />
        </section>

      </main>
      <NavbarBottom />
    </>
  );
}

export default Profile;


