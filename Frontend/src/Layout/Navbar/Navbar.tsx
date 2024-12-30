import { useNavigate } from "react-router";
import "./navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar">
        <button type="button" onClick={() => navigate("/display")}>
          Afficher
        </button>
        <button type="button" onClick={() => navigate("/add")}>
          Ajouter
        </button>
        <button type="button" onClick={() => navigate("/modify")}>
          Modifier
        </button>
        <button
          type="button"
          onClick={() => navigate("/quiz-english-to-french")}
        >
          Quiz E-F
        </button>
        <button
          type="button"
          onClick={() => navigate("/quiz-french-to-english")}
        >
          Quiz F-E
        </button>
      </nav>
    </>
  );
};
