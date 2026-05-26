# Spotify Lingo – Full System Markmap

## 0. What this map is for
### Goal
- Explain the whole project in one place
- Show frontend, backend, database/API, game logic, and debugging
- Help the team understand how the code works
- Help the team continue working without being stuck

### Main rule
- Always follow the data

### Full app flow
- User does something
- React handles it
- State changes
- Frontend sends API request
- Backend receives request
- Backend gets data from Spotify / lyrics API / database
- Backend sends response
- React saves response in state
- UI changes

---

## 1. Big picture

### What is Spotify Lingo?
- A language learning game app
- Users learn through games
- The app can have many different games

### Current games
#### Lyrics game
- User searches for a song
- App only shows songs with lyrics
- User selects a song
- App loads lyrics
- App hides one word
- User guesses the word

#### Verb tense game
- User gets a sentence
- One verb is missing
- User chooses the correct verb form

### Main goal
- One platform
- Multiple games
- Same basic game structure
- Easy to add more games later

---

## 2. Full architecture

### System flow
- User
  - clicks
  - types
  - selects answers
- Frontend
  - React
  - UI
  - state
  - fetch requests
- Backend
  - API routes
  - validation
  - Spotify logic
  - lyrics logic
  - database logic
- External data
  - Spotify API
  - lyrics API
  - database
- Back to frontend
  - JSON response
  - setState
  - UI update

### Simple diagram
```text
User
↓
React Frontend
↓ fetch()
Backend API
↓
Spotify API / Lyrics API / Database
↓
Backend response
↓
React state update
↓
UI changes
```

### Most important idea
- UI comes from state
- If the UI is wrong, check the state
- If the state is wrong, check the data
- If the data is wrong, check backend/API

---

## 3. Full story from click to UI

### Whole flow
- User types song
- → `setQuery`

- User clicks search
- → `handleSearch()`

- Frontend calls backend
- → `/api/songs`

- Backend runs:
  - `searchSpotify()`
  - `filterSongsWithLyrics()`
  - return songs

- Frontend:
  - receives songs
  - `setSongs(data.songs)`
  - UI shows songs

- User clicks song
- → `handleSelectSong()`

- Frontend calls backend
- → `/api/lyrics`

- Backend runs:
  - `findLyrics()`
  - `cleanLyrics()`
  - return lines

- Frontend:
  - `setLyricsLines()`
  - `useEffect` runs
  - `generateQuestion()`

- Game:
  - show question
  - user answers
  - `handleAnswer()`
  - score updates
  - next question

### Full flow as diagram
```text
type in input
→ setQuery
→ click search
→ handleSearch
→ fetch /api/songs
→ backend searchSpotify
→ backend filterSongsWithLyrics
→ return songs
→ setSongs
→ show song cards
→ click song
→ handleSelectSong
→ fetch /api/lyrics
→ backend findLyrics
→ backend cleanLyrics
→ return lyric lines
→ setLyricsLines
→ useEffect
→ generateQuestion
→ show question
→ handleAnswer
→ update score
```

---

## 4. React basics used in this project

### Components
- Small parts of the screen
- Examples:
  - Search input
  - Search button
  - Song card
  - Game card
  - Progress bar
  - Result screen

### State
- Data that changes while the app runs
- When state changes, React updates the screen

### useState example
```js
const [score, setScore] = useState(0);
```

### Meaning
- `score` is the current value
- `setScore` changes the value
- When `setScore` runs, React re-renders the UI

### useEffect example
```js
useEffect(() => {
  if (lyricsLines.length > 0) {
    generateQuestion(lyricsLines);
  }
}, [lyricsLines]);
```

### Meaning
- When `lyricsLines` changes
- React runs this function
- If lyrics exist, the game creates a question

### Events
- User actions
- Examples:
  - typing in input
  - clicking search
  - clicking song
  - clicking answer

---

## 5. Main frontend state

### Search state
```js
const [query, setQuery] = useState("");
const [songs, setSongs] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
```

### Meaning
#### query
- What the user typed in the search input

#### songs
- Song results from backend

#### loading
- True when app is waiting for data

#### error
- Error message shown to user

### Song and lyrics state
```js
const [selectedSong, setSelectedSong] = useState(null);
const [lyricsLines, setLyricsLines] = useState([]);
const [lyricsStatus, setLyricsStatus] = useState("idle");
```

### Meaning
#### selectedSong
- The song the user clicked

#### lyricsLines
- Clean lyric lines from selected song

#### lyricsStatus
- Current lyrics loading status
- Can be:
  - idle
  - loading
  - success
  - error

### Game state
```js
const [lyricLine, setLyricLine] = useState("");
const [correctWord, setCorrectWord] = useState("");
const [options, setOptions] = useState([]);
const [score, setScore] = useState(0);
const [feedback, setFeedback] = useState("");
const [currentQuestion, setCurrentQuestion] = useState(1);
const [totalQuestions, setTotalQuestions] = useState(10);
const [gameOver, setGameOver] = useState(false);
```

### Meaning
#### lyricLine
- Current lyric line with blank

#### correctWord
- The hidden word

#### options
- Multiple choice answers

#### score
- Number of correct answers

#### feedback
- Correct or wrong message

#### currentQuestion
- Current question number

#### totalQuestions
- Total questions in round

#### gameOver
- True when game is finished

---

## 6. Search input flow

### Input code
```js
<input
  type="text"
  value={query}
  placeholder="Search for a song"
  onChange={(e) => setQuery(e.target.value)}
/>
```

### What happens
- User types in input
- `onChange` runs
- `setQuery(e.target.value)` updates query state
- React remembers what the user typed

### Flow
```text
User types
→ onChange runs
→ setQuery runs
→ query state changes
→ input value updates
```

---

## 7. Search button flow

### Button code
```js
<button onClick={handleSearch}>
  Search
</button>
```

### What happens
- User clicks search
- `handleSearch()` runs
- App starts search flow

### Flow
```text
User clicks Search
→ handleSearch()
→ frontend search starts
```

---

## 8. Frontend search function

### Code
```js
async function handleSearch() {
  if (!query.trim()) {
    setError("Please type a song name");
    return;
  }

  setLoading(true);
  setError("");
  setSongs([]);

  try {
    const response = await fetch(
      `/api/songs?query=${encodeURIComponent(query)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Search failed");
    }

    setSongs(data.songs);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}
```

### Small explanation
#### Check query
- If input is empty
- Show error
- Stop function

#### Start loading
- `setLoading(true)`
- UI can show searching message

#### Clear old data
- `setError("")`
- `setSongs([])`

#### Fetch backend
- Calls `/api/songs`
- Sends query to backend

#### Read response
- Converts response to JSON

#### Save songs
- `setSongs(data.songs)`
- React updates UI

#### Stop loading
- `setLoading(false)`

### Full search story
```text
User clicks search
→ handleSearch runs
→ check if query exists
→ loading becomes true
→ old songs are cleared
→ frontend calls /api/songs
→ backend receives query
→ backend searches Spotify
→ backend filters songs with lyrics
→ backend returns songs
→ frontend receives JSON
→ setSongs(data.songs)
→ loading becomes false
→ UI shows song cards
```

---

## 9. Search UI

### Loading UI
```js
{loading && <p>Searching...</p>}
```

### Error UI
```js
{error && <p>{error}</p>}
```

### Song results UI
```js
{songs.map((song) => (
  <div key={song.id} onClick={() => handleSelectSong(song)}>
    <img src={song.image} alt={song.title} />
    <h3>{song.title}</h3>
    <p>{song.artist}</p>
  </div>
))}
```

### What the UI does
- If loading is true, show searching
- If error exists, show error
- If songs exist, show song cards
- When user clicks song card, run `handleSelectSong(song)`

---

## 10. Backend search route

### Route code
```js
app.get("/api/songs", async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: "Missing search query"
      });
    }

    const spotifySongs = await searchSpotify(query);

    const songsWithLyrics = await filterSongsWithLyrics(spotifySongs);

    return res.json({
      success: true,
      songs: songsWithLyrics
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Could not search songs"
    });
  }
});
```

### Backend receives
```js
req.query.query
```

### Example request
```text
/api/songs?query=hello
```

### What backend does
- Receives query
- Checks if query exists
- Calls Spotify search function
- Gets songs from Spotify
- Checks which songs have lyrics
- Sends only songs with lyrics back to frontend

### Backend search flow
```text
GET /api/songs
→ read req.query.query
→ validate query
→ searchSpotify(query)
→ filterSongsWithLyrics(songs)
→ return JSON
```

---

## 11. Backend Spotify search function

### Code
```js
async function searchSpotify(query) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`
      }
    }
  );

  const data = await response.json();

  return data.tracks.items.map((track) => ({
    id: track.id,
    title: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    image: track.album.images[0]?.url,
    spotifyUrl: track.external_urls.spotify
  }));
}
```

### What this does
- Sends query to Spotify
- Gets track results
- Converts Spotify result into simpler song objects
- Returns clean array to backend route

### Example output
```js
{
  id: "spotify-track-id",
  title: "Hello",
  artist: "Adele",
  album: "25",
  image: "image-url",
  spotifyUrl: "spotify-link"
}
```

### Why format data?
- Spotify returns a lot of data
- Frontend does not need all of it
- Backend sends only useful data

---

## 12. Backend filter songs with lyrics

### Code
```js
async function filterSongsWithLyrics(songs) {
  const result = [];

  for (const song of songs) {
    const hasLyrics = await checkLyricsExist(song.title, song.artist);

    if (hasLyrics) {
      result.push({
        ...song,
        hasLyrics: true
      });
    }
  }

  return result;
}
```

### What this does
- Loops through Spotify songs
- Checks if each song has lyrics
- Keeps only songs that have lyrics
- Removes songs without lyrics

### Flow
```text
Spotify songs
→ loop each song
→ check lyrics
→ if lyrics exist, keep song
→ return filtered list
```

---

## 13. Backend check lyrics exist

### Code
```js
async function checkLyricsExist(title, artist) {
  try {
    const lyrics = await findLyrics(title, artist);
    return Boolean(lyrics);
  } catch {
    return false;
  }
}
```

### What this does
- Tries to find lyrics
- If lyrics exist, returns true
- If lyrics do not exist, returns false
- If API fails, returns false

### Why this matters
- User should only see songs that can be used in the game
- Songs without lyrics should not appear

---

## 14. Select song frontend flow

### Song card click
```js
<div onClick={() => handleSelectSong(song)}>
  <h3>{song.title}</h3>
  <p>{song.artist}</p>
</div>
```

### What happens
- User clicks a song
- React sends the song object into `handleSelectSong(song)`

### Flow
```text
User clicks song card
→ handleSelectSong(song)
→ selectedSong updates
→ old lyrics clear
→ lyrics request starts
```

---

## 15. Frontend select song function

### Code
```js
async function handleSelectSong(song) {
  setSelectedSong(song);
  setLyricsLines([]);
  setLyricsStatus("loading");
  setError("");

  try {
    const url =
      `/api/lyrics?songId=${encodeURIComponent(song.id)}` +
      `&title=${encodeURIComponent(song.title)}` +
      `&artist=${encodeURIComponent(song.artist)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Lyrics failed");
    }

    if (data.songId !== song.id) {
      return;
    }

    setLyricsLines(data.lines);
    setLyricsStatus("success");
  } catch (err) {
    setError(err.message);
    setLyricsStatus("error");
  }
}
```

### Small explanation
#### Save selected song
```js
setSelectedSong(song);
```
- React remembers clicked song

#### Clear old lyrics
```js
setLyricsLines([]);
```
- Prevents old song lyrics from showing

#### Set loading
```js
setLyricsStatus("loading");
```
- UI can show lyrics are loading

#### Create backend URL
```js
/api/lyrics?songId=...&title=...&artist=...
```
- Sends song ID, title, and artist

#### Check response
```js
if (!response.ok) throw new Error(...);
```
- Handles backend errors

#### Sync check
```js
if (data.songId !== song.id) return;
```
- Prevents wrong lyrics from being saved

#### Save lyrics
```js
setLyricsLines(data.lines);
setLyricsStatus("success");
```

### Full select song story
```text
User clicks song
→ handleSelectSong(song)
→ selectedSong becomes song
→ old lyrics are removed
→ lyricsStatus becomes loading
→ frontend calls /api/lyrics
→ backend receives song info
→ backend finds lyrics
→ backend cleans lyrics
→ backend returns lines
→ frontend checks songId
→ setLyricsLines(data.lines)
→ lyricsStatus becomes success
→ game can start
```

---

## 16. Backend lyrics route

### Code
```js
app.get("/api/lyrics", async (req, res) => {
  try {
    const { songId, title, artist } = req.query;

    if (!songId || !title || !artist) {
      return res.status(400).json({
        success: false,
        error: "Missing song information"
      });
    }

    const lyrics = await findLyrics(title, artist);

    if (!lyrics) {
      return res.status(404).json({
        success: false,
        error: "Lyrics not found"
      });
    }

    const lines = cleanLyrics(lyrics);

    return res.json({
      success: true,
      songId,
      title,
      artist,
      lines
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Could not load lyrics"
    });
  }
});
```

### Backend receives
```js
songId
title
artist
```

### Example request
```text
/api/lyrics?songId=123&title=Hello&artist=Adele
```

### What backend does
- Checks if song ID exists
- Checks if title exists
- Checks if artist exists
- Searches lyrics
- If no lyrics, returns error
- Cleans lyrics
- Returns lyrics lines

### Backend lyrics flow
```text
GET /api/lyrics
→ read songId, title, artist
→ validate data
→ findLyrics(title, artist)
→ cleanLyrics(lyrics)
→ return songId and lines
```

---

## 17. Backend find lyrics function

### Code
```js
async function findLyrics(title, artist) {
  const response = await fetch(
    `https://lyrics-api.example.com/search?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`
  );

  const data = await response.json();

  if (!data.lyrics) {
    return null;
  }

  return data.lyrics;
}
```

### What this does
- Sends title and artist to lyrics API
- Gets lyrics text
- Returns lyrics
- Returns null if no lyrics found

### Important
- Searching only by title is risky
- Better to use title + artist
- Best is title + artist + song ID if possible

---

## 18. Backend clean lyrics function

### Code
```js
function cleanLyrics(lyrics) {
  return lyrics
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !line.startsWith("["))
    .filter((line) => line.split(" ").length >= 4);
}
```

### What this does
- Splits lyrics into separate lines
- Removes empty lines
- Removes labels like `[Chorus]`
- Removes lines that are too short
- Returns clean usable lyric lines

### Example input
```text
[Verse 1]
Hello from the other side

I must have called a thousand times
```

### Example output
```js
[
  "Hello from the other side",
  "I must have called a thousand times"
]
```

### Why cleaning matters
- Game needs real lyric lines
- Very short lines are bad questions
- Section labels are not useful
- Empty lines should not become questions

---

## 19. Lyrics sync problem

### What sync means
- Selected song and lyrics must match
- The lyrics shown must belong to the clicked song
- The game questions must use the correct lyrics

### Bad sync example
```text
User clicks Song A
→ request A starts

User clicks Song B
→ request B starts

Request A returns late
→ app saves Song A lyrics
→ UI shows Song B selected but Song A lyrics
```

### Why it happens
- API requests are async
- Old request can finish after new request
- Old lyrics might not be cleared
- Lyrics API might return wrong song
- Backend might search by title only

### Frontend fix
```js
if (data.songId !== song.id) {
  return;
}
```

### Clear old lyrics fix
```js
setLyricsLines([]);
setLyricsStatus("loading");
```

### Backend matching fix
- Use song ID
- Use title
- Use artist
- Avoid title-only search
- Return metadata with lyrics response

### Debug questions
- What song is selected?
- What song ID was sent?
- What lyrics came back?
- Did returned song ID match selected song ID?
- Did old lyrics stay in state?
- Did a previous request finish late?

---

## 20. Start game when lyrics load

### Code
```js
useEffect(() => {
  if (lyricsLines.length > 0) {
    generateQuestion(lyricsLines);
  }
}, [lyricsLines]);
```

### What happens
- React watches `lyricsLines`
- When lyrics are loaded, `lyricsLines` changes
- `useEffect` runs
- First question is generated

### Flow
```text
Backend returns lyrics
→ setLyricsLines(data.lines)
→ lyricsLines changes
→ useEffect runs
→ generateQuestion(lyricsLines)
→ question appears
```

---

## 21. Generate lyrics question

### Code
```js
function generateQuestion(lines) {
  const validLines = lines.filter((line) => {
    const words = line.split(" ");
    return words.length >= 4;
  });

  const randomLine =
    validLines[Math.floor(Math.random() * validLines.length)];

  const words = randomLine.split(" ");

  const validWords = words.filter((word) => word.length > 3);

  const answer =
    validWords[Math.floor(Math.random() * validWords.length)];

  const hiddenWords = words.map((word) => {
    if (word === answer) {
      return "____";
    }

    return word;
  });

  const wrongOptions = getWrongOptions(answer);

  const allOptions = shuffle([
    answer,
    ...wrongOptions
  ]);

  setLyricLine(hiddenWords.join(" "));
  setCorrectWord(answer);
  setOptions(allOptions);
  setFeedback("");
}
```

### What this function does
- Gets lyrics lines
- Filters valid lines
- Picks one random line
- Splits line into words
- Picks a word to hide
- Replaces the word with `____`
- Gets wrong answer options
- Adds correct answer to options
- Shuffles options
- Saves question in state

### Question generation flow
```text
lyricsLines
→ filter good lines
→ pick random line
→ split into words
→ pick answer word
→ replace answer with blank
→ create wrong options
→ add correct answer
→ shuffle options
→ setLyricLine
→ setCorrectWord
→ setOptions
→ UI updates
```

### Important checks
- Line should have enough words
- Hidden word should not be too short
- Options should include correct answer
- Options should not have duplicates

---

## 22. Wrong options function

### Code
```js
function getWrongOptions(correctWord) {
  const wordBank = [
    "love",
    "time",
    "night",
    "heart",
    "dream",
    "life",
    "world",
    "baby"
  ];

  return wordBank
    .filter((word) => word !== correctWord)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
}
```

### What this does
- Uses a word bank
- Removes the correct word
- Randomly chooses 3 wrong words
- Returns wrong options

### Better future version
- Use words from the lyrics
- Use same language words
- Use words with similar difficulty
- Avoid random unrelated words

---

## 23. Shuffle function

### Code
```js
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
```

### What this does
- Copies array
- Randomizes order
- Returns shuffled array

### Why shuffle is needed
- Correct answer should not always be first
- Game feels more fair
- User cannot guess by position

---

## 24. Question UI

### Code
```js
<div className="game-card">
  <p>{lyricLine}</p>

  <div className="options">
    {options.map((option) => (
      <button key={option} onClick={() => handleAnswer(option)}>
        {option}
      </button>
    ))}
  </div>
</div>
```

### What this UI does
- Shows lyric line with missing word
- Shows answer buttons
- Each button calls `handleAnswer(option)`

### Flow
```text
React state has lyricLine and options
→ UI renders lyricLine
→ UI maps options into buttons
→ user clicks option
→ handleAnswer(option)
```

---

## 25. Answer function

### Code
```js
function handleAnswer(option) {
  const userAnswer = option.toLowerCase().trim();
  const correctAnswer = correctWord.toLowerCase().trim();

  if (userAnswer === correctAnswer) {
    setScore((oldScore) => oldScore + 1);
    setFeedback("Correct!");
  } else {
    setFeedback(`Wrong. Correct answer: ${correctWord}`);
  }
}
```

### What this does
- Gets clicked answer
- Converts user answer to lowercase
- Converts correct answer to lowercase
- Removes spaces
- Compares both
- If correct, increases score
- Shows feedback

### Answer flow
```text
User clicks answer
→ handleAnswer(option)
→ normalize option
→ normalize correctWord
→ compare
→ correct = score + 1
→ wrong = show correct answer
→ feedback appears
```

### Why normalize?
- Prevents small text issues
- Example:
  - `Love`
  - `love`
  - ` love `
- These should be treated the same

---

## 26. Next question function

### Code
```js
function handleNextQuestion() {
  if (currentQuestion >= totalQuestions) {
    setGameOver(true);
    return;
  }

  setCurrentQuestion((old) => old + 1);
  generateQuestion(lyricsLines);
}
```

### What this does
- Checks if current question is last question
- If yes, game ends
- If no, question number goes up
- New question is generated

### Next question flow
```text
User clicks next
→ handleNextQuestion()
→ check currentQuestion
→ if last question, gameOver true
→ else currentQuestion + 1
→ generateQuestion again
```

---

## 27. Progress bar

### Calculation
```js
const progress = (currentQuestion / totalQuestions) * 100;
```

### UI
```js
<div className="progress-bar">
  <div
    className="progress-fill"
    style={{ width: `${progress}%` }}
  />
</div>
```

### What this does
- Calculates how far user is
- Turns question number into percentage
- Uses percentage as progress bar width

### Progress flow
```text
currentQuestion / totalQuestions
→ percentage
→ progress bar width
→ visual progress
```

---

## 28. Result screen

### Code
```js
if (gameOver) {
  return (
    <div className="result-screen">
      <h2>Game finished</h2>
      <p>Your score: {score} / {totalQuestions}</p>
      <button onClick={restartGame}>Play again</button>
    </div>
  );
}
```

### What happens
- If `gameOver` is true
- React shows result screen
- Final score is displayed
- User can restart game

### Result flow
```text
currentQuestion reaches totalQuestions
→ setGameOver(true)
→ React renders result screen
→ user sees score
```

---

## 29. Restart function

### Code
```js
function restartGame() {
  setScore(0);
  setCurrentQuestion(1);
  setGameOver(false);
  setFeedback("");

  if (lyricsLines.length > 0) {
    generateQuestion(lyricsLines);
  }
}
```

### What this does
- Resets score
- Resets question number
- Hides result screen
- Clears feedback
- Creates new question

### Restart flow
```text
User clicks Play again
→ restartGame()
→ score = 0
→ question = 1
→ gameOver = false
→ generateQuestion
→ game starts again
```

---

## 30. Verb tense game

### Purpose
- Practice grammar
- Learn verb forms
- Choose correct tense

### Question object
```js
const question = {
  sentence: "Yesterday I ____ to school.",
  baseVerb: "go",
  tense: "past simple",
  correctAnswer: "went",
  options: ["go", "went", "gone", "going"]
};
```

### UI
```js
<p>{question.sentence}</p>

{question.options.map((option) => (
  <button key={option} onClick={() => handleVerbAnswer(option)}>
    {option}
  </button>
))}
```

### Answer function
```js
function handleVerbAnswer(option) {
  if (option === question.correctAnswer) {
    setScore((oldScore) => oldScore + 1);
    setFeedback("Correct!");
  } else {
    setFeedback(`Wrong. Correct answer: ${question.correctAnswer}`);
  }
}
```

### Verb tense flow
```text
Load question
→ show sentence
→ show options
→ user clicks answer
→ compare with correctAnswer
→ update score
→ show feedback
→ next question
```

### Similar to lyrics game
- Both have a question
- Both have options
- Both check answer
- Both update score
- Both show feedback
- Both move to next question

---

## 31. Reusable game structure

### Every game has
- Start
- Load question
- Show question
- User answers
- Check answer
- Show feedback
- Update score
- Next question
- End screen

### Shared state
```js
const [score, setScore] = useState(0);
const [feedback, setFeedback] = useState("");
const [currentQuestion, setCurrentQuestion] = useState(1);
const [totalQuestions, setTotalQuestions] = useState(10);
const [gameOver, setGameOver] = useState(false);
```

### Shared functions
```js
function startGame() {}
function generateQuestion() {}
function handleAnswer() {}
function handleNextQuestion() {}
function restartGame() {}
```

### Why reusable structure matters
- Easier to add games
- Less repeated code
- Easier for team to understand
- Easier to debug

---

## 32. Database idea

### What database can store
#### users
- user id
- name
- email

#### songs
- song id
- spotify id
- title
- artist
- album
- image
- has lyrics

#### lyrics
- lyrics id
- song id
- lyrics text
- lyrics lines
- source

#### games
- game id
- game type
- game name

#### questions
- question id
- game id
- question text
- correct answer
- options

#### scores
- score id
- user id
- game id
- score
- total questions
- date

### Database relationship idea
```text
User → Scores
Song → Lyrics
Game → Questions
User → Progress
```

### Why database helps
- Save progress
- Store lyrics
- Store songs
- Store scores
- Avoid fetching everything again

---

## 33. Full debugging flow

### Main debugging rule
```text
Do not guess
Follow the data
```

### Full debug order
```text
1. What did the user do?
2. Which React function ran?
3. Which state changed?
4. Which API request was sent?
5. Which backend route received it?
6. Which backend function ran?
7. What did Spotify / lyrics API / database return?
8. What did backend send back?
9. What did React save in state?
10. What did the UI show?
```

---

## 34. Search bug checklist

### Check frontend
- Is query empty?
- Did `handleSearch()` run?
- Did loading become true?
- Did fetch call correct URL?
- Did response return?

### Check backend
- Did `/api/songs` receive query?
- Did `searchSpotify(query)` run?
- Did Spotify return songs?
- Did `filterSongsWithLyrics` remove everything?

### Check UI
- Did `setSongs(data.songs)` run?
- Is `songs` array empty?
- Is error shown?
- Is loading stuck?

---

## 35. Lyrics bug checklist

### Check frontend
- Is selectedSong correct?
- Did `handleSelectSong(song)` run?
- Were old lyrics cleared?
- Did lyricsStatus become loading?
- Did fetch send songId, title, artist?

### Check backend
- Did `/api/lyrics` receive song data?
- Did `findLyrics(title, artist)` return lyrics?
- Did `cleanLyrics(lyrics)` remove too much?
- Did backend return `songId`?

### Check sync
- Does `data.songId` match `song.id`?
- Did old request return late?
- Did old lyrics stay on screen?

---

## 36. Game bug checklist

### Check question generation
- Are lyricsLines loaded?
- Did `generateQuestion()` run?
- Is validLines empty?
- Is randomLine selected?
- Is correctWord set?
- Is lyricLine set?
- Are options created?

### Check answer
- Did user click option?
- Is option correct?
- Is correctWord correct?
- Are both normalized?
- Did score update?
- Did feedback show?

### Check next question
- Did currentQuestion update?
- Did gameOver become true too early?
- Did generateQuestion run again?

---

## 37. File structure

### Frontend
#### components
- Button
- SongCard
- ProgressBar
- ResultScreen

#### games
- LyricsGame
- VerbTenseGame

#### utils
- shuffle
- cleanText
- generateQuestion

#### styles
- CSS
- layout
- responsive design

### Backend
#### routes
- `/api/songs`
- `/api/lyrics`

#### services
- spotifyService
- lyricsService
- databaseService

#### utils
- cleanLyrics
- filterSongsWithLyrics

#### models
- User
- Song
- Lyrics
- Score

---


## 38. Final summary

### Whole app in one sentence
```text
User does something
→ React stores it in state
→ backend gets or processes data
→ React receives data
→ UI updates
```

### Most important frontend rule
```text
UI = state
```

### Most important backend rule
```text
Backend returns clean data
```

### Most important debugging rule
```text
Follow the data
```

### Most important team rule
```text
Understand one flow first, then the whole system becomes easier
```
