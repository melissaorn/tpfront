import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Backoffice from "./pages/Backoffice";
import Bouquets from "./pages/Bouquets";
import Fleurs from "./pages/Fleurs";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"; 
import MonCompte from "./pages/MonCompte";
import { fetchMe } from "./store/userSlice";
import { useDispatch } from "react-redux";
function App() {
  // 🔥 Charger l'utilisateur au démarrage
  const dispatch = useDispatch();

  // 🔥 Charger l'utilisateur au démarrage
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);


  return (
    <BrowserRouter>
      <Navbar />  {/* PAS besoin de setUser ici */}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/bouquets" element={<Bouquets />} />
        <Route path="/fleurs" element={<Fleurs />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/moncompte" element={<MonCompte />} />

        {/* Login & Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Page par défaut = login */}
        <Route path="/home" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
