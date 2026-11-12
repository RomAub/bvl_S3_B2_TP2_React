import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="notfound">
      <h2>404</h2>
      <p>Cette page n'existe pas.</p>
      <Link className="bouton" to="/">
        Retour à l'accueil
      </Link>
    </section>
  );
}

export default NotFound;
