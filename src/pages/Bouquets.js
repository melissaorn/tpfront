import React, { useState, useEffect } from "react";
import Bouquet from "../components/Bouquet";

const Bouquets = ({ bouquets }) => {
  const [list, setList] = useState([]);

  // Charger les bouquets depuis localStorage ou depuis les props
  useEffect(() => {
    const saved = localStorage.getItem("bouquets");
    if (saved) {
      setList(JSON.parse(saved));
    } else if (bouquets && bouquets.length > 0) {
      setList(bouquets);
      localStorage.setItem("bouquets", JSON.stringify(bouquets));
    }
  }, [bouquets]);

  // Fonction appelée lors d’un clic sur un cœur
  const handleLike = async (id) => {
    const updatedList = list.map((bq) =>
      bq.id === id ? { ...bq, liked: !bq.liked } : bq
    );

    setList(updatedList);
    localStorage.setItem("bouquets", JSON.stringify(updatedList));

    // 🔹 Envoyer l’info au backend
    try {
      await fetch(`http://localhost:5000/like?id=${id}`);
      console.log(`✅ Like envoyé pour le bouquet ${id}`);
    } catch (err) {
      console.error(" Erreur lors de l’envoi du like :", err);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4 text-center text-danger"> Nos Bouquets</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {list.map((bq) => (
          <Bouquet key={bq.id} bouquet={bq} onLike={handleLike} />
        ))}
      </div>
    </div>
  );
};

export default Bouquets;
