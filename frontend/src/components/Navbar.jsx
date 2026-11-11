import { useNavigate } from "react-router-dom";
import { UserCircle, LogOut } from "lucide-react";
import useAuth from "../hooks/useAuth";
import LanguageSelector from "./LanguageSelector";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <img src="/logo.png" alt="Logo" />
        <h2>Integration Platform</h2>
      </div>

      <div className="navbar-actions">
        <LanguageSelector />

        <div className="navbar-user">
          <UserCircle size={25} />
          <span>{user?.name || "User"}</span>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
