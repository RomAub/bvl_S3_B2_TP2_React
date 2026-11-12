import { useState } from "react";

const PRIORITES = ["Haute", "Moyenne", "Basse"];

function TicketForm({ initial, onValider, texteBouton }) {
  const [form, setForm] = useState(
    initial || { titre: "", auteur: "", priorite: "Moyenne", description: "" }
  );
  const [erreurs, setErreurs] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function valider() {
    const err = {};
    if (form.titre.trim().length < 5) {
      err.titre = "Le titre est obligatoire (5 caractères minimum).";
    }
    if (form.auteur.trim() === "") {
      err.auteur = "L'auteur est obligatoire.";
    }
    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = valider();
    if (Object.keys(err).length > 0) {
      setErreurs(err);
      return;
    }
    setErreurs({});
    onValider(form);
    if (!initial) {
      setForm({ titre: "", auteur: "", priorite: "Moyenne", description: "" });
    }
  }

  return (
    <form className="formulaire" onSubmit={handleSubmit}>
      <label>
        Titre
        <input name="titre" value={form.titre} onChange={handleChange} />
      </label>
      {erreurs.titre && <span className="erreur">{erreurs.titre}</span>}

      <label>
        Auteur
        <input name="auteur" value={form.auteur} onChange={handleChange} />
      </label>
      {erreurs.auteur && <span className="erreur">{erreurs.auteur}</span>}

      <label>
        Priorité
        <select name="priorite" value={form.priorite} onChange={handleChange}>
          {PRIORITES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
        />
      </label>

      <button type="submit">{texteBouton || "Ajouter le ticket"}</button>
    </form>
  );
}

export default TicketForm;
