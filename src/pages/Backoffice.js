import React, { useState, useEffect } from "react";

export default function Backoffice() {
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
    const res = await fetch("http://localhost:3001/backoffice/bouquet/finish", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    alert("Bouquet créé !");
    setDraft(null);
    setNom("");
    setDescr("");
    setImage("");
    setNbFleurs(1);
  };

  const inputStyle = {
    padding: "8px",
    margin: "5px 0 15px 0",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "10px 5px 20px 0",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    transition: "background-color 0.3s",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Card centrée */}
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
         Ajouter un bouquet
        </h1>

        <h3>Nom</h3>
        <input style={inputStyle} value={nom} onChange={(e) => setNom(e.target.value)} />

        <h3>Description</h3>
        <input style={inputStyle} value={descr} onChange={(e) => setDescr(e.target.value)} />

        <h3>Image (/img/...)</h3>
        <input style={inputStyle} value={image} onChange={(e) => setImage(e.target.value)} />

        <h3>Nombre total de fleurs</h3>
        <input
          style={inputStyle}
          type="number"
          value={nbFleurs}
          onChange={(e) => setNbFleurs(e.target.value)}
        />

        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          onClick={startDraft}
        >
          📌 Démarrer Brouillon
        </button>

        {draft && (
          <>
            <hr />
            <h2>Ajouter les fleurs</h2>

            <input
              style={inputStyle}
              placeholder="Nom de la fleur"
              value={flowerName}
              onChange={(e) => setFlowerName(e.target.value)}
            />

            <button
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
              onClick={addFlower}
            >
              Ajouter
            </button>

            <h3>Fleurs ajoutées :</h3>
            <ul>
              {draft.fleurs.map((f, i) => (
                <li key={i}>{f.nom}</li>
              ))}
            </ul>

            <button
              style={{ ...buttonStyle, backgroundColor: "#008CBA" }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#007bb5")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#008CBA")}
              onClick={finishBouquet}
            >
              ✅ Finaliser le bouquet
            </button>
          </>
        )}
      </div>
    </div>
  );
}
