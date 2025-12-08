import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Backoffice from "./pages/Backoffice";
import Bouquets from "./pages/Bouquets";
import Fleurs from "./pages/Fleurs";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"; 
import MonCompte from "./pages/MonCompte";

function App() {
  const [user, setUser] = useState(null);

  // 🔥 Charger l'utilisateur au démarrage
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} />  {/* PAS besoin de setUser ici */}

      <Routes>
        <Route path="/home" element={<Home />} />
       <Route path="/bouquets" element={<Bouquets user={user} />} />

        <Route path="/fleurs" element={<Fleurs />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/moncompte" element={<MonCompte user={user} />} />

        {/* Login & Register */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* Page par défaut = login */}
        <Route path="/" element={<Login setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
