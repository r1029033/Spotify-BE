import { useState } from "react";

function Game() {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState("any");
  const [onlyLanguage, setOnlyLanguage] = useState(false);

  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(false);

  const [lyricsLines, setLyricsLines] = useState([]);
  const [lyricsStatus, setLyricsStatus] = useState("idle");

  const [lyricLine, setLyricLine] = useState("");
  const [correctWord, setCorrectWord] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const maxRounds = 5;
  const [gameFinished, setGameFinished] = useState(false);

  function resetGame() {
    setScore(0);
    setRound(1);
    setGameFinished(false);
    setSelectedAnswer(null);

    setLyricsLines([]);
    setLyricsStatus("idle");

    setLyricLine("");
    setCorrectWord("");
    setOptions([]);
  }

  async function searchSongs(e) {
    e.preventDefault();

    const q = query.trim();

    // If user wants language-only but didn't pick a language, stop
    if ((onlyLanguage || !q) && lang === "any") {
      alert("Choose a language first (or type a search word).");
      return;
    }

    setLoading(true);
    setSelectedSong(null);
    setSongs([]);
    resetGame();

    try {
      const langParam = lang !== "any" ? `&lang=${encodeURIComponent(lang)}` : "";
      const qParam = onlyLanguage ? "" : `q=${encodeURIComponent(q)}`;

      // If onlyLanguage=true, we omit q and backend will use a safe fallback query.
      const url =
        onlyLanguage || !q
          ? `http://localhost:3001/api/jamendo/search?limit=10&onlyLyrics=1${langParam}`
          : `http://localhost:3001/api/jamendo/search?${qParam}&limit=10&onlyLyrics=1${langParam}`;

      const res = await fetch(url);
      const data = await res.json();
      setSongs(data.results || []);
    } catch (err) {
      console.error(err);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  }

  function sanitizeLines(raw) {
    let text = "";
    if (Array.isArray(raw)) text = raw.join("\n");
    else if (typeof raw === "string") text = raw;
    else return [];

    return text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
  }

  function pickLineAndBuildQuestion(lines) {
    const candidates = lines.filter((l) => l.split(/\s+/).length >= 4);
    if (candidates.length === 0) return false;

    const line = candidates[Math.floor(Math.random() * candidates.length)];

    const words = line
      .split(/\s+/)
      .map((w) => w.replace(/[^\p{L}'-]/gu, ""))
      .filter(Boolean);

    const learnable = words.filter((w) => w.length > 3);
    if (learnable.length === 0) return false;

    const chosen = learnable[Math.floor(Math.random() * learnable.length)];

    const corpus = Array.from(
      new Set(
        lines
          .join(" ")
          .split(/\s+/)
          .map((w) => w.replace(/[^\p{L}'-]/gu, ""))
          .filter((w) => w.length > 3)
      )
    ).filter((w) => w.toLowerCase() !== chosen.toLowerCase());

    const fallbackPool = ["dream", "heart", "night", "light", "music", "world", "fire", "storm"];
    const pool = corpus.length >= 10 ? corpus : [...corpus, ...fallbackPool];

    const wrongs = [];
    while (wrongs.length < 2 && pool.length > 0) {
      const w = pool[Math.floor(Math.random() * pool.length)];
      if (
        w &&
        w.toLowerCase() !== chosen.toLowerCase() &&
        !wrongs.some((x) => x.toLowerCase() === w.toLowerCase())
      ) {
        wrongs.push(w);
      }
    }

    const allOptions = [...wrongs, chosen].sort(() => Math.random() - 0.5);

    setLyricLine(line);
    setCorrectWord(chosen);
    setOptions(allOptions);
    setSelectedAnswer(null);

    return true;
  }

  async function loadLyricsAndStart(song) {
    setSelectedSong(song);
    resetGame();
    setLyricsStatus("loading");

    try {
      const res = await fetch(`http://localhost:3001/api/jamendo/lyrics/${song.id}`);
      const data = await res.json();

      const lines = sanitizeLines(data.lyrics);

      if (!lines || lines.length === 0) {
        setLyricsStatus("missing");
        return;
      }

      setLyricsLines(lines);
      setLyricsStatus("ready");

      const ok = pickLineAndBuildQuestion(lines);
      if (!ok) setLyricsStatus("missing");
    } catch (err) {
      console.error(err);
      setLyricsStatus("error");
    }
  }

  function handleAnswer(word) {
    if (gameFinished || lyricsStatus !== "ready") return;

    setSelectedAnswer(word);

    const isCorrect = word.toLowerCase() === correctWord.toLowerCase();
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (round >= maxRounds) {
        setGameFinished(true);
      } else {
        setRound((r) => r + 1);
        const ok = pickLineAndBuildQuestion(lyricsLines);
        if (!ok) setLyricsStatus("missing");
      }
    }, 700);
  }

  return (
    <div style={{ padding: "40px", fontFamily: "system-ui" }}>
      <h1>Spotify Lingo 🎵</h1>

      <form
        onSubmit={searchSongs}
        style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search songs (optional)"
          style={{ padding: "10px", width: "320px" }}
          disabled={onlyLanguage}
        />

        <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: "10px" }}>
          <option value="any">Any language</option>
          <option value="en">English (en)</option>
          <option value="fr">French (fr)</option>
          <option value="es">Spanish (es)</option>
          <option value="it">Italian (it)</option>
          <option value="de">German (de)</option>
          <option value="pl">Polish (pl)</option>
        </select>

        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            checked={onlyLanguage}
            onChange={(e) => setOnlyLanguage(e.target.checked)}
          />
          Search only by language
        </label>

        <button type="submit" style={{ padding: "10px 14px" }}>
          Search
        </button>
      </form>

      {loading && <p style={{ marginTop: "16px" }}>Searching…</p>}

      {!loading && songs.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Lyric-ready Results ✅</h2>
          <ul style={{ paddingLeft: "18px" }}>
            {songs.map((song) => (
              <li key={song.id} style={{ marginBottom: "10px" }}>
                <button onClick={() => loadLyricsAndStart(song)} style={{ cursor: "pointer" }}>
                  {song.title} — {song.artist}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && (query.trim() || lang !== "any") && songs.length === 0 && (
        <p style={{ marginTop: "16px" }}>
          No lyric-ready tracks found. Try another language or keyword.
        </p>
      )}

      {selectedSong && (
        <div style={{ marginTop: "30px" }}>
          <h2>Now Playing</h2>
          <p>
            <b>{selectedSong.title}</b> — {selectedSong.artist}
          </p>

          {selectedSong.image && (
            <img
              src={selectedSong.image}
              alt="cover"
              style={{
                width: "180px",
                borderRadius: "12px",
                display: "block",
                marginBottom: "12px",
              }}
            />
          )}

          <audio controls src={selectedSong.audio} style={{ width: "420px" }} />

          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              maxWidth: "700px",
            }}
          >
            <h3>Fill in the missing word</h3>

            {lyricsStatus === "loading" && <p>Loading lyrics…</p>}
            {lyricsStatus === "missing" && <p>Lyrics not available. Try another track.</p>}
            {lyricsStatus === "error" && <p>Something went wrong loading lyrics.</p>}

            {lyricsStatus === "ready" && !gameFinished && (
              <>
                <p style={{ marginTop: "6px" }}>
                  Round <b>{round}</b> / {maxRounds} · Score: <b>{score}</b>
                </p>

                <p style={{ fontSize: "20px", marginTop: "14px" }}>
                  {lyricLine
                    ? lyricLine.replace(new RegExp(`\\b${correctWord}\\b`, "i"), "____")
                    : "Loading line…"}
                </p>

                <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
                  {options.map((word) => {
                    const isPicked = selectedAnswer === word;
                    const isCorrect = word.toLowerCase() === correctWord.toLowerCase();
                    const showColor = selectedAnswer !== null && isPicked;

                    return (
                      <button
                        key={word}
                        onClick={() => handleAnswer(word)}
                        disabled={selectedAnswer !== null}
                        style={{
                          padding: "8px 14px",
                          border: "none",
                          cursor: selectedAnswer ? "default" : "pointer",
                          borderRadius: "10px",
                          background: showColor ? (isCorrect ? "green" : "red") : "#eee",
                          color: "black",
                        }}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {lyricsStatus === "ready" && gameFinished && (
              <>
                <h3 style={{ marginTop: "16px" }}>Game Finished 🎉</h3>
                <p>
                  Your score: <b>{score}</b> / {maxRounds}
                </p>
                <button
                  onClick={() => {
                    setScore(0);
                    setRound(1);
                    setGameFinished(false);
                    setSelectedAnswer(null);
                    const ok = pickLineAndBuildQuestion(lyricsLines);
                    if (!ok) setLyricsStatus("missing");
                  }}
                  style={{ padding: "10px 14px", cursor: "pointer" }}
                >
                  Play Again
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;