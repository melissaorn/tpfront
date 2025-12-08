import React, { useEffect, useState } from "react";
import { myFetch } from "../comm/myFetch";

export default function Bouquets({ user }) {
  const [bouquets, setBouquets] = useState([]);
  const [selectedLikers, setSelectedLikers] = useState(null); // bouquet sélectionné pour voir les likers

  useEffect(() => {
    const fetchBouquets = async () => {
      try {
        const data = await myFetch("/bouquets", {
          method: "GET",
          credentials: "include",
        });
        setBouquets(data);
      } catch (err) {
        console.error("Erreur lors du chargement des bouquets:", err);
      }
    };
    fetchBouquets();
  }, []);

  const likeBouquet = async (id) => {
    if (!user) return;
    try {
      const updatedBouquet = await myFetch(`/bouquets/${id}/like`, {
        method: "POST",
        credentials: "include",
      });
      setBouquets((prev) =>
        prev.map((b) => (b.id === id ? updatedBouquet : b))
      );
    } catch (err) {
      console.error("Erreur lors du like:", err);
    }
  };

  const showLikers = (bouquet) => {
    setSelectedLikers(bouquet.likers); // ouvrir le modal avec la liste des likers
  };

  const closeLikers = () => setSelectedLikers(null);

  return (
    <div>
      <h1>Liste des Bouquets</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {bouquets.map((b) => {
          const liked = user ? b.liked : false;
          return (
            <div
              key={b.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "200px",
                borderRadius: "10px",
              }}
            >
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
                  color: liked ? "red" : "gray",
                  border: `1px solid ${liked ? "red" : "gray"}`,
                  borderRadius: "8px",
                  padding: "5px",
                  cursor: user ? "pointer" : "not-allowed",
                  fontWeight: "bold",
                }}
                disabled={!user}
              >
                ❤️ {b.likes || 0}
              </button>
              {b.likes > 0 && (
                <p
                  style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}
                  onClick={() => showLikers(b)}
                >
                  Voir {b.likes} like{b.likes > 1 ? "s" : ""}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal pour afficher les likers */}
      {selectedLikers && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeLikers}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              minWidth: "300px",
              maxHeight: "400px",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Utilisateurs ayant liké :</h3>
            <ul>
              {selectedLikers.map((u) => (
                <li key={u.id}>{u.username}</li>
              ))}
            </ul>
            <button onClick={closeLikers}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}
