import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Notification from "./components/Notification";
import Accueil from "./pages/Accueil";
import Tickets from "./pages/Tickets";
import NouveauTicket from "./pages/NouveauTicket";
import DetailTicket from "./pages/DetailTicket";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Notification />
      <main className="contenu">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/tickets/nouveau" element={<NouveauTicket />} />
          <Route path="/tickets/:id" element={<DetailTicket />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
