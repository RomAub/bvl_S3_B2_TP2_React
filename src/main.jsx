import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { TicketsProvider } from "./context/TicketsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TicketsProvider>
        <App />
      </TicketsProvider>
    </BrowserRouter>
  </StrictMode>
);
