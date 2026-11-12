import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1>Gestion des tickets</h1>
      <nav className="nav">
        <NavLink to="/" end>
          Accueil
        </NavLink>
        <NavLink to="/tickets">Tickets</NavLink>
        <NavLink to="/tickets/nouveau">Nouveau ticket</NavLink>
      </nav>
    </header>
  );
}

export default Header;
