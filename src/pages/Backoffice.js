import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myFetch } from "../comm/myFetch";

export default function Backoffice() {
  const navigate = useNavigate();

  // 🔐 JWT depuis Redux
  const { token, isAuthenticated } = useSelector((state) => state.user);

  // ===============================
  // REDIRECTION SI NON AUTH
  // ===============================
  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/login");
    }
  }, [isAuthenticated, token, navigate]);

  // ===============================
  // ÉTATS
  // ===============================
  const [nom, setNom] = useState("");
  const [descr, setDescr] = useState("");
  const [image, setImage] = useState("");
  const [nbFleurs, setNbFleurs] = useState(1);
  const [flowerName, setFlowerName] = useState("");
  const [draft, setDraft] = useState(null);

  // ===============================
  // RÉCUPÉRER BROUILLON
  // ===============================
  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const data = await myFetch("/backoffice/bouquet/draft", {}, token);

        if (data.draft) {
          setDraft(data.draft);
          setNom(data.draft.nom);
          setDescr(data.draft.descr);
          setImage(data.draft.image);
          setNbFleurs(data.draft.nbFleurs);
        }
      } catch (err) {
        console.error("Erreur draft :", err);
      }
    };

    if (token) fetchDraft();
  }, [token]);

  // ===============================
  // DÉMARRER BROUILLON
  // ===============================
  const startDraft = async () => {
    const data = await myFetch(
      "/backoffice/bouquet/start",
      {
        method: "POST",
        body: JSON.stringify({ nom, descr, image, nbFleurs }),
      },
      token
    );
    setDraft(data.draft);
  };

  // ===============================
  // AJOUTER FLEUR
  // ===============================
  const addFlower = async () => {
    if (!flowerName.trim()) return;

    const data = await myFetch(
      "/backoffice/bouquet/add-flower",
      {
        method: "POST",
        body: JSON.stringify({ nom: flowerName }),
      },
      token
    );

    setDraft(data.draft);
    setFlowerName("");
  };

  // ===============================
  // FINALISER BOUQUET
  // ===============================
  const finishBouquet = async () => {
    await myFetch("/backoffice/bouquet/finish", { method: "POST" }, token);

    alert("Bouquet créé !");
    setDraft(null);
    setNom("");
    setDescr("");
    setImage("");
    setNbFleurs(1);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", color: "#007bff" }}>
        Backoffice – Ajouter un bouquet
      </h1>

      {/* FORMULAIRE */}
      <div
        style={{ background: "#f5f5f5", padding: "20px", borderRadius: "12px" }}
      >
        <input
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom"
        />
        <input
          value={descr}
          onChange={(e) => setDescr(e.target.value)}
          placeholder="Description"
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="/img/..."
        />
        <input
          type="number"
          value={nbFleurs}
          onChange={(e) => setNbFleurs(e.target.value)}
          placeholder="Nb fleurs"
        />

        <button onClick={startDraft}>📌 Démarrer brouillon</button>
      </div>

      {/* BROUILLON */}
      {draft && (
        <div style={{ marginTop: "30px" }}>
          <h3>Ajouter des fleurs</h3>

          <input
            value={flowerName}
            onChange={(e) => setFlowerName(e.target.value)}
            placeholder="Nom fleur"
          />
          <button onClick={addFlower}>Ajouter</button>

          <ul>
            {draft.fleurs.map((f, i) => (
              <li key={i}>{f.nom}</li>
            ))}
          </ul>

          <button onClick={finishBouquet}>✅ Finaliser bouquet</button>
        </div>
      )}
    </div>
  );
}
