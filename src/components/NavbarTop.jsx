import { useNavigate, useLocation } from "react-router-dom";

function NavbarTop() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-top" aria-label="Dashboard navigation">
      <button type="button" className={`navbar-top-link ${isActive("/dashboard") ? "active" : ""}`} onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button type="button" className={`navbar-top-link ${isActive("/stats") ? "active" : ""}`} onClick={() => navigate("/stats")}>Stats</button>
      <button type="button" className={`navbar-top-link ${isActive("/profile") ? "active" : ""}`} onClick={() => navigate("/profile")}>Profile</button>
    </nav>
  );
}

export default NavbarTop;