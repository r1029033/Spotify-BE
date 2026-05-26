import { useEffect, useState } from "react";
import lightning from "../assets/images/lightning-bolt.svg";

import NavbarTop from "../components/NavbarTop";
import NavbarBottom from "../components/NavbarBottom";
import Loader from "../components/Loader";


  function Stats() {
    const [stats, setStats] = useState(null);
    const [dailyStats, setDailyStats] = useState([]);

    useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/api/stats`)
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch((err) => console.error("Failed to fetch stats:", err));

      fetch(`${import.meta.env.VITE_API_URL}/api/stats/daily`)
    .then((res) => res.json())
    .then((data) => setDailyStats(data))
    .catch((err) => console.error("Failed to fetch daily stats:", err));
    }, []);

if (!stats) {
  return <Loader text="Loading stats..." />;
}

    return (
      <>
        <NavbarTop />
        <div className="statscontent animate-fadeInUp">
          <h1>Stats</h1>

          <section className="statstop">
            <h2>Daily learning time</h2>

            <div className="barchart">
              {dailyStats.map((day) => {
                const maxTime = Math.max(...dailyStats.map(d => d.learning_time));
                const height = Math.min((day.learning_time / maxTime) * 100, 100);
                const mins = Math.round(day.learning_time / 60);

                return (
                  <div key={day.date} className="bar-col">
                    <span className="bar-mins">{mins}m</span>
                    <div className="bar" style={{ height: `${height}%` }}></div>
                    <span className="bar-label">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="motivationtile">
            <img src={lightning} alt="" />
            <p>Keep up the good work!</p>
          </section>

          <section className="statsoverview">
            <h2>Overview</h2>

            <div className="statstiles">
              <div className="statstile">
                <h3>Total games played</h3>
                <p>{stats.games_played}</p>
              </div>

              <div className="statstile">
                <h3>Best score</h3>
                <p>{stats.best_score}%</p>
              </div>

              <div className="statstile">
                <h3>Listening time</h3>
                <p>{Math.round(stats.listening_time / 60)} mins</p>
              </div>

              <div className="statstile">
                <h3>Streak</h3>
                <p>{stats.streak} days</p>
              </div>
            </div>
          </section>
        </div>
        <NavbarBottom />
      </>
    );
  }

  export default Stats;


