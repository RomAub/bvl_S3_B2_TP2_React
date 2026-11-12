import { Link } from "react-router-dom";
import { useTicketsContext } from "../context/TicketsContext";

function Accueil() {
  const { tickets, chargement, erreur } = useTicketsContext();

  if (chargement) return <p className="info">Chargement...</p>;
  if (erreur) return <p className="erreur">Erreur : {erreur}</p>;

  const parStatut = (statut) => tickets.filter((t) => t.statut === statut).length;

  return (
    <section className="accueil">
      <h2>Bienvenue sur l'application de suivi de tickets</h2>
      <p>Application interne de WebDev Solutions pour gérer les demandes d'assistance.</p>

      <div className="stats">
        <div className="stat">
          <span className="stat-nombre">{tickets.length}</span>
          <span className="stat-label">Tickets au total</span>
        </div>
        <div className="stat">
          <span className="stat-nombre">{parStatut("Ouvert")}</span>
          <span className="stat-label">Ouverts</span>
        </div>
        <div className="stat">
          <span className="stat-nombre">{parStatut("En cours")}</span>
          <span className="stat-label">En cours</span>
        </div>
        <div className="stat">
          <span className="stat-nombre">{parStatut("Résolu")}</span>
          <span className="stat-label">Résolus</span>
        </div>
      </div>

      <Link className="bouton" to="/tickets">
        Voir les tickets
      </Link>
    </section>
  );
}

export default Accueil;
