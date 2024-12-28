import { useNavigate } from "react-router";
import "./navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="menu-icon"></div>
          <button type="button" onClick={() => navigate("/display")}>
            Afficher
          </button>
          <button type="button" onClick={() => navigate("/add")}>
            Ajouter
          </button>
          <button type="button" onClick={() => navigate("/modify")}>
            Modifier
          </button>
          <button type="button" onClick={() => navigate("/quiz")}>
            Quizzer
          </button>
          <button type="button">SignIn</button>
        </div>
      </nav>
    </>
  );
};
