import React, { useEffect, useState } from "react";

export default function Bouquets() {
  const [bouquets, setBouquets] = useState([]);

  // Charger les bouquets
  useEffect(() => {
    fetch("http://localhost:3001/bouquets")
      .then((res) => res.json())
      .then((data) => setBouquets(data))
      .catch((err) => console.error(err));
  }, []);

  // LIKE
  const likeBouquet = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/bouquets/${id}/like`, {
        method: "POST",
        credentials: "include",
      });

      const updatedBouquet = await res.json();

      // Mettre à jour localement
      setBouquets((prev) =>
        prev.map((b) => (b.id === id ? updatedBouquet : b))
      );
    } catch (e) {
      console.error("Erreur like :", e);
    }
  };

  return (
    <div>
      <h1>Liste des Bouquets</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {bouquets.map((b) => (
          <div
            key={b.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
              borderRadius: "10px",
            }}
          >
            {/* ✔ NE TOUCHE PAS À L’URL, ELLE MARCHAIT AVANT */}
            <img
              src={`http://localhost:3001${b.image}`}
              alt={b.nom}
              style={{ width: "100%", borderRadius: "10px" }}
            />

            <h3>{b.nom}</h3>
            <p>{b.descr}</p>

            <button
              onClick={() => likeBouquet(b.id)}
              style={{
                background: "white",
                border: "1px solid red",
                borderRadius: "8px",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              ❤️ {b.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
