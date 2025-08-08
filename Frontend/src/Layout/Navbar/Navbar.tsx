import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isConnected, setIsConnected } = useContext(AuthContext);

  const handleSignOut = async () => {
    // sessionStorage.removeItem("userToken");
    try {
      const response = await fetch("http://localhost:5000/user/signout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setIsConnected(false);
        navigate("/signin");
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  return (
    <nav className="navbar">
      {isConnected ? (
        <>
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
          <button type="button" onClick={() => navigate("/learn-by-copying")}>
            Recopier
          </button>
          <button type="button" onClick={handleSignOut}>
            Se déconnecter
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={() => navigate("/signin")}>
            Se connecter
          </button>
          <button type="button" onClick={() => navigate("/signup")}>
            S'enregistrer
          </button>
        </>
      )}
    </nav>
  );
};
