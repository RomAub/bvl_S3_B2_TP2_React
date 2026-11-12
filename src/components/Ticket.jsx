import { useState } from "react";
import { Link } from "react-router-dom";
import { useTicketsContext } from "../context/TicketsContext";

const STATUTS = ["Ouvert", "En cours", "Résolu"];

function classePriorite(priorite) {
  if (priorite === "Haute") return "badge priorite-haute";
  if (priorite === "Moyenne") return "badge priorite-moyenne";
  return "badge priorite-basse";
}

function classeStatut(statut) {
  if (statut === "Ouvert") return "badge statut-ouvert";
  if (statut === "En cours") return "badge statut-encours";
  return "badge statut-resolu";
}

function Ticket({ ticket }) {
  const { supprimerTicket, changerStatut, notifier } = useTicketsContext();
  const [confirmer, setConfirmer] = useState(false);

  function handleSupprimer() {
    supprimerTicket(ticket.id);
    notifier("Ticket supprimé");
  }

  return (
    <div className="ticket">
      <div className="ticket-haut">
        <h3>
          <Link to={"/tickets/" + ticket.id}>{ticket.titre}</Link>
        </h3>
        <span className={classePriorite(ticket.priorite)}>{ticket.priorite}</span>
      </div>
      <p className="auteur">Déclaré par : {ticket.auteur}</p>
      <div className="ticket-bas">
        <span className={classeStatut(ticket.statut)}>{ticket.statut}</span>
        <select
          value={ticket.statut}
          onChange={(e) => changerStatut(ticket.id, e.target.value)}
        >
          {STATUTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {confirmer ? (
          <span className="confirmation">
            Confirmer ?
            <button className="danger" onClick={handleSupprimer}>
              Oui
            </button>
            <button onClick={() => setConfirmer(false)}>Non</button>
          </span>
        ) : (
          <button className="danger" onClick={() => setConfirmer(true)}>
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
}

export default Ticket;
