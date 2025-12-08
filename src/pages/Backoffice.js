import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Backoffice() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const [nom, setNom] = useState("");
  const [descr, setDescr] = useState("");
  const [image, setImage] = useState("");
  const [nbFleurs, setNbFleurs] = useState(1);
  const [flowerName, setFlowerName] = useState("");
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    const fetchDraft = async () => {
      const res = await fetch("http://localhost:3001/backoffice/bouquet/draft", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.draft) {
        setDraft(data.draft);
        setNom(data.draft.nom);
        setDescr(data.draft.descr);
        setImage(data.draft.image);
        setNbFleurs(data.draft.nbFleurs);
      }
    };
    fetchDraft();
  }, []);

  const startDraft = async () => {
    const res = await fetch("http://localhost:3001/backoffice/bouquet/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ nom, descr, image, nbFleurs }),
    });
    const data = await res.json();
    setDraft(data.draft);
  };

  const addFlower = async () => {
    if (!flowerName.trim()) return;
    const res = await fetch("http://localhost:3001/backoffice/bouquet/add-flower", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ nom: flowerName }),
    });
    const data = await res.json();
    setDraft(data.draft);
    setFlowerName("");
  };

  const finishBouquet = async () => {
     await fetch("http://localhost:3001/backoffice/bouquet/finish", {
      method: "POST",
      credentials: "include",
    });

    alert("Bouquet créé !");
    setDraft(null);
    setNom("");
    setDescr("");
    setImage("");
    setNbFleurs(1);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#007bff", marginBottom: "30px" }}>Backoffice - Ajouter un bouquet</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px", background: "#f5f5f5", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <div>
          <label style={{ fontWeight: "600" }}>Nom</label>
          <input value={nom} onChange={(e) => setNom(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "6px", border: "1px solid #ccc" }} />
        </div>

        <div>
          <label style={{ fontWeight: "600" }}>Description</label>
          <input value={descr} onChange={(e) => setDescr(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "6px", border: "1px solid #ccc" }} />
        </div>

        <div>
          <label style={{ fontWeight: "600" }}>Image (/img/...)</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "6px", border: "1px solid #ccc" }} />
        </div>

        <div>
          <label style={{ fontWeight: "600" }}>Nombre total de fleurs</label>
          <input
            type="number"
            value={nbFleurs}
            onChange={(e) => setNbFleurs(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>

        <button
          onClick={startDraft}
          style={{
            marginTop: "10px",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#28a745",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}
        >
          📌 Démarrer Brouillon
        </button>
      </div>

      {draft && (
        <div style={{ marginTop: "30px", background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: "#007bff", marginBottom: "15px" }}>Ajouter les fleurs</h2>
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <input
              placeholder="Nom de la fleur"
              value={flowerName}
              onChange={(e) => setFlowerName(e.target.value)}
              style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            <button
              onClick={addFlower}
              style={{ padding: "8px 15px", borderRadius: "6px", border: "none", backgroundColor: "#17a2b8", color: "white", cursor: "pointer" }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#138496"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#17a2b8"}
            >
              Ajouter
            </button>
          </div>

          <h3 style={{ marginBottom: "10px" }}>Fleurs ajoutées :</h3>
          <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
            {draft.fleurs.map((f, i) => (
              <li key={i} style={{ marginBottom: "5px", fontWeight: "500" }}>{f.nom}</li>
            ))}
          </ul>

          <button
            onClick={finishBouquet}
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#ffc107",
              color: "#212529",
              fontWeight: "600",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#e0a800"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#ffc107"}
          >
            ✅ Finaliser le bouquet
          </button>
        </div>
      )}
    </div>
  );
}
