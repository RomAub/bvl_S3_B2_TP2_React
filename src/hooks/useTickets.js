import { useState, useEffect } from "react";

const API = "http://localhost:3001/tickets";

export function useTickets() {
  const [tickets, setTickets] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    async function charger() {
      try {
        const reponse = await fetch(API);
        if (!reponse.ok) throw new Error("Erreur " + reponse.status);
        setTickets(await reponse.json());
      } catch (e) {
        setErreur(e.message);
      } finally {
        setChargement(false);
      }
    }
    charger();
  }, []);

  async function ajouterTicket(donnees) {
    const nouveau = { ...donnees, id: Date.now(), statut: "Ouvert" };
    const reponse = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nouveau),
    });
    const cree = await reponse.json();
    setTickets((liste) => [...liste, cree]);
    return cree;
  }

  async function supprimerTicket(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setTickets((liste) => liste.filter((t) => t.id !== id));
  }

  async function changerStatut(id, nouveauStatut) {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut: nouveauStatut }),
    });
    setTickets((liste) =>
      liste.map((t) => (t.id === id ? { ...t, statut: nouveauStatut } : t))
    );
  }

  async function modifierTicket(id, modifs) {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modifs),
    });
    setTickets((liste) =>
      liste.map((t) => (t.id === id ? { ...t, ...modifs } : t))
    );
  }

  return {
    tickets,
    chargement,
    erreur,
    ajouterTicket,
    supprimerTicket,
    changerStatut,
    modifierTicket,
  };
}
