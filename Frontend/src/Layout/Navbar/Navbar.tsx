import "./navbar.css";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="menu-icon"></div>
          <button type="button">Afficher</button>
          <button type="button">Ajouter</button>
          <button type="button">Modifier</button>
          <button type="button">Quizzer</button>
          <button type="button">SignIn</button>
        </div>
      </nav>
    </>
  );
};
