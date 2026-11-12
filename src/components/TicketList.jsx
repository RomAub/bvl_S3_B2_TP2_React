import Ticket from "./Ticket";

function TicketList({ tickets }) {
  if (tickets.length === 0) {
    return <p className="vide">Aucun ticket à afficher.</p>;
  }

  return (
    <div className="liste">
      {tickets.map((t) => (
        <Ticket key={t.id} ticket={t} />
      ))}
    </div>
  );
}

export default TicketList;
