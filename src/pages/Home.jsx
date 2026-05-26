import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Lyric Learner</h1>
      <button onClick={() => navigate("/game")}>
        Go To Game
      </button>
    </div>
  );
}

export default Home;