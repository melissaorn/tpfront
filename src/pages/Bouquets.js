import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBouquets, likeBouquet, fetchLikers, openLikersModal, closeLikersModal } from "../store/bouquetSlice";
import { Link } from "react-router-dom";

export default function Bouquets() {
  const dispatch = useDispatch();
  const { list: bouquets, loading, likersMap, modal } = useSelector((state) => state.bouquets);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    dispatch(fetchBouquets());
  }, [dispatch]);

  if (loading) return <h2>Chargement...</h2>;

  const handleOpenLikers = (b) => {
    dispatch(fetchLikers(b.id));
    dispatch(openLikersModal(b.id));
  };

  const handleCloseModal = () => dispatch(closeLikersModal());

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Liste des Bouquets</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {bouquets.map((b) => (
          <div key={b.id} style={{ border: "1px solid #ccc", padding: "10px", width: "220px", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <img src={`http://localhost:3001${b.image}`} alt={b.nom} style={{ width: "100%", borderRadius: "10px" }} />
              <h3 style={{ marginTop: "10px", textAlign: "center" }}>{b.nom}</h3>
              <p style={{ textAlign: "center" }}>{b.descr}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px" }}>
              <button
                onClick={() => {
                  if (!isAuthenticated) { alert("Vous devez être connecté pour liker."); return; }
                  dispatch(likeBouquet(b.id));
                }}
                style={{
                  background: "white",
                  border: "1px solid red",
                  borderRadius: "8px",
                  padding: "5px 10px",
                  cursor: isAuthenticated ? "pointer" : "not-allowed",
                  opacity: isAuthenticated ? 1 : 0.5,
                  marginBottom: "5px"
                }}
                disabled={!isAuthenticated}
              >
                ❤️ {b.likesCount}
              </button>

              <Link
                onClick={() => handleOpenLikers(b)}
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "#007bff",
                  fontWeight: "bold",
                  marginTop: "5px",
                  textAlign: "center"
                }}
              >
                Users Liké
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modal.open && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "white",
            padding: "20px 30px",
            borderRadius: "12px",
            minWidth: "320px",
            maxHeight: "70%",
            overflowY: "auto",
            textAlign: "center",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
          }}>
            <h2 style={{ marginBottom: "15px" }}>Utilisateurs ayant liké</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {likersMap[modal.id]?.length > 0
                ? likersMap[modal.id].map(u => <li key={u.id} style={{ margin: "5px 0", fontWeight: "500" }}>{u.username}</li>)
                : <li>Aucun utilisateur</li>
              }
            </ul>
            <button
              onClick={handleCloseModal}
              style={{
                marginTop: "15px",
                padding: "8px 15px",
                border: "none",
                borderRadius: "8px",
                background: "#007bff",
                color: "white",
                cursor: "pointer"
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
