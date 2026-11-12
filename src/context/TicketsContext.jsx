import { createContext, useContext, useState, useCallback } from "react";
import { useTickets } from "../hooks/useTickets";

const TicketsContext = createContext(null);

export function TicketsProvider({ children }) {
  const api = useTickets();
  const [message, setMessage] = useState("");

  const notifier = useCallback((texte) => {
    setMessage(texte);
    setTimeout(() => setMessage(""), 3000);
  }, []);

  return (
    <TicketsContext.Provider value={{ ...api, message, notifier }}>
      {children}
    </TicketsContext.Provider>
  );
}

export function useTicketsContext() {
  return useContext(TicketsContext);
}
