import { useState } from "react";
import { Link } from "react-router-dom";
import { useTicketsContext } from "../context/TicketsContext";
import TicketList from "../components/TicketList";

const ORDRE_PRIORITE = { Haute: 3, Moyenne: 2, Basse: 1 };

function Tickets() {
  const { tickets, chargement, erreur } = useTicketsContext();
  const [recherche, setRecherche] = useState("");
  const [statutFiltre, setStatutFiltre] = useState("Tous");
  const [triPriorite, setTriPriorite] = useState(false);

  if (chargement) return <p className="info">Chargement...</p>;
  if (erreur) return <p className="erreur">Erreur : {erreur}</p>;

  let ticketsAffiches = tickets
    .filter((t) => t.titre.toLowerCase().includes(recherche.toLowerCase()))
    .filter((t) => statutFiltre === "Tous" || t.statut === statutFiltre);

  if (triPriorite) {
    ticketsAffiches = [...ticketsAffiches].sort(
      (a, b) => ORDRE_PRIORITE[b.priorite] - ORDRE_PRIORITE[a.priorite]
    );
  }

  return (
    <section className="page-tickets">
      <div className="barre-titre">
        <h2>Liste des tickets</h2>
        <Link className="bouton" to="/tickets/nouveau">
          + Nouveau ticket
        </Link>
      </div>

      <div className="filtres">
        <input
          type="text"
          placeholder="Rechercher par titre..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        <select value={statutFiltre} onChange={(e) => setStatutFiltre(e.target.value)}>
          <option>Tous</option>
          <option>Ouvert</option>
          <option>En cours</option>
          <option>Résolu</option>
        </select>
        <button onClick={() => setTriPriorite(!triPriorite)}>
          {triPriorite ? "Tri par priorité activé" : "Trier par priorité"}
        </button>
      </div>

      <p className="compteur">
        {ticketsAffiches.length} ticket(s) affiché(s) sur {tickets.length}
      </p>

      <TicketList tickets={ticketsAffiches} />
    </section>
  );
}

export default Tickets;
