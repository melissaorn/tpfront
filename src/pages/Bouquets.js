import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBouquets,
  likeBouquet,
  fetchLikers,
  openLikersModal,
  closeLikersModal,
} from "../store/bouquetSlice";

export default function Bouquets() {
  const dispatch = useDispatch();
  const { list: bouquets, loading, likersMap, modal } = useSelector(
    (state) => state.bouquets
  );
  const isAuthenticated = useSelector(
    (state) => state.user.isAuthenticated
  );

  useEffect(() => {
    dispatch(fetchBouquets());
  }, [dispatch]);

  if (loading) return <h2>Chargement...</h2>;

  const handleOpenLikers = (b) => {
    dispatch(fetchLikers(b.id));
    dispatch(openLikersModal(b.id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Bouquets</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {bouquets.map((b) => (
          <div key={b.id} style={cardStyle}>
            <div>
              <img
                src={`http://localhost:3001${b.image}`}
                alt={b.nom}
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <h3 style={{ textAlign: "center", marginTop: "10px" }}>{b.nom}</h3>
              <p style={{ textAlign: "center" }}>{b.descr}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <button
                onClick={() => isAuthenticated && dispatch(likeBouquet(b.id)).then(() => {
  dispatch(fetchBouquets());
})
}
                disabled={!isAuthenticated}
                style={{
                  ...likeBtn,
                  cursor: isAuthenticated ? "pointer" : "not-allowed",
                  opacity: isAuthenticated ? 1 : 0.5,
                }}
              >
                ❤️ {b.likesCount}
              </button>

              <button
                onClick={() => handleOpenLikers(b)}
                style={linkBtn}
              >
                Voir les utilisateurs
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modal.open && (
        <div style={overlay}>
          <div style={modalStyle}>
            <h2>Utilisateurs ayant liké</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>
              {likersMap[modal.id]?.length ? (
                likersMap[modal.id].map((u) => (
                  <li key={u.id}>{u.username}</li>
                ))
              ) : (
                <li>Aucun utilisateur</li>
              )}
            </ul>

            <button onClick={() => dispatch(closeLikersModal())} style={closeBtn}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== styles ===== */

const cardStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  width: "220px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const likeBtn = {
  background: "white",
  border: "1px solid red",
  borderRadius: "8px",
  padding: "5px 10px",
  marginBottom: "5px",
};

const linkBtn = {
  background: "none",
  border: "none",
  color: "#007bff",
  fontWeight: "bold",
  cursor: "pointer",
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "white",
  padding: "20px 30px",
  borderRadius: "12px",
  minWidth: "320px",
  textAlign: "center",
};

const closeBtn = {
  marginTop: "15px",
  padding: "8px 15px",
  borderRadius: "8px",
  border: "none",
  background: "#007bff",
  color: "white",
  cursor: "pointer",
};
