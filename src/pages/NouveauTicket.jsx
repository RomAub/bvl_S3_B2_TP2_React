import { useNavigate } from "react-router-dom";
import { useTicketsContext } from "../context/TicketsContext";
import TicketForm from "../components/TicketForm";

function NouveauTicket() {
  const { ajouterTicket, notifier } = useTicketsContext();
  const navigate = useNavigate();

  async function handleAjouter(form) {
    await ajouterTicket(form);
    notifier("Ticket ajouté avec succès");
    navigate("/tickets");
  }

  return (
    <section className="page-formulaire">
      <h2>Nouveau ticket</h2>
      <TicketForm onValider={handleAjouter} texteBouton="Ajouter le ticket" />
    </section>
  );
}

export default NouveauTicket;
