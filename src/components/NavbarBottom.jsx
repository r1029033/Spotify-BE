import { useNavigate, useLocation } from "react-router-dom";
import dashboardNav from "../assets/images/dashboard.svg";
import statsNav from "../assets/images/Stats.svg";
import profileNav from "../assets/images/profile.svg";

function NavbarBottom() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar">
      <div className={`navbar-item ${isActive("/dashboard") ? "active" : ""}`} onClick={() => navigate("/dashboard")}>
        <img src={dashboardNav} alt="dashboard" />
        <span>Dashboard</span>
      </div>
      <div className={`navbar-item ${isActive("/stats") ? "active" : ""}`} onClick={() => navigate("/stats")}>
        <img src={statsNav} alt="stats" />
        <span>Stats</span>
      </div>
      <div className={`navbar-item ${isActive("/profile") ? "active" : ""}`} onClick={() => navigate("/profile")}>
        <img src={profileNav} alt="profile" />
        <span>Profile</span>
      </div>
    </div>
  );
}

export default NavbarBottom;
