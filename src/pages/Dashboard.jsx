import { useNavigate } from "react-router-dom";
import mondayGamesImg from "../assets/images/monday-games-img.png";
import onTheGoImg from "../assets/images/on-the-go-img.png";
import gameImg1 from "../assets/images/game-img-1.png";
import gameImg2 from "../assets/images/game-img-2.png";
import NavbarTop from "../components/NavbarTop";
import NavbarBottom from "../components/NavbarBottom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <NavbarTop />
      <div className="dashboard-page animate-fadeInUp">

        <div className="hero-container">
          <div className="hero">
            <div className="hero_section">
              <h2 className="hero_title">Monday games</h2>
              <p className="hero_subtitle">Play now!</p>
            </div>
            <img src={mondayGamesImg} alt="Monday games" className="monday-games_img" />
          </div>
        </div>

        <h2 className="road-section_title">When you're on the road</h2>
        <div className="road-section">
          <div className="road-section_text">
            <h2 className="road-section_subtitle">On the go</h2>
            <p className="road-section_description">Just listen - we'll notify you when questions appear</p>
          </div>
          <img src={onTheGoImg} alt="On the go" className="on-the-go_img" />
        </div>

        <h2 className="game-card_title">All games</h2>
        <div className="game-card" onClick={() => navigate("/tense-intro")}>
          <img src={gameImg1} alt="Fill in the verse" className="game-img_1" />
          <div className="game-card-wrap">
            <h2 className="game-card-type">Fill in the verse</h2>
            <p className="game-card_description">Listen to the song and fill in the gaps</p>
          </div>
          <p className="duration">4 mins</p>
        </div>

        <div className="game-card" onClick={() => navigate("/listenup")}>
          <img src={gameImg2} alt="Listen up" className="game-img_2" />
          <div className="game-card-wrap">
            <h2 className="game-card-type">Listen up!</h2>
            <p className="game-card_description">Listen to the song and answer the questions</p>
          </div>
          <p className="duration">5 mins</p>
        </div>


      </div>
              <NavbarBottom />
    </>
  );
}
