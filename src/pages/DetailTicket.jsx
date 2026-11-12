import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTicketsContext } from "../context/TicketsContext";
import TicketForm from "../components/TicketForm";

function DetailTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, chargement, modifierTicket, supprimerTicket, notifier } =
    useTicketsContext();
  const [edition, setEdition] = useState(false);

  if (chargement) return <p className="info">Chargement...</p>;

  const ticket = tickets.find((t) => String(t.id) === id);
  if (!ticket) return <p className="erreur">Ticket introuvable.</p>;

  async function handleModifier(form) {
    await modifierTicket(ticket.id, form);
    notifier("Ticket modifié");
    setEdition(false);
  }

  async function handleSupprimer() {
    await supprimerTicket(ticket.id);
    notifier("Ticket supprimé");
    navigate("/tickets");
  }

  if (edition) {
    return (
      <section className="page-formulaire">
        <h2>Modifier le ticket</h2>
        <TicketForm
          initial={ticket}
          onValider={handleModifier}
          texteBouton="Enregistrer"
        />
        <button onClick={() => setEdition(false)}>Annuler</button>
      </section>
    );
  }

  return (
    <section className="detail">
      <h2>{ticket.titre}</h2>
      <p>
        <strong>Auteur :</strong> {ticket.auteur}
      </p>
      <p>
        <strong>Priorité :</strong> {ticket.priorite}
      </p>
      <p>
        <strong>Statut :</strong> {ticket.statut}
      </p>
      <p>
        <strong>Description :</strong> {ticket.description || "Aucune description."}
      </p>
      <div className="actions">
        <button onClick={() => setEdition(true)}>Modifier</button>
        <button className="danger" onClick={handleSupprimer}>
          Supprimer
        </button>
        <Link className="bouton" to="/tickets">
          Retour à la liste
        </Link>
      </div>
    </section>
  );
}

export default DetailTicket;
