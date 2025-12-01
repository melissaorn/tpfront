import React, { useState, useEffect } from "react";

export default function Backoffice() {
  const [nom, setNom] = useState("");
  const [descr, setDescr] = useState("");
  const [image, setImage] = useState("");
  const [nbFleurs, setNbFleurs] = useState(1);
  const [flowerName, setFlowerName] = useState("");
  const [draft, setDraft] = useState(null);

  // ➤ Charger le brouillon existant au chargement
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

  // ➤ 1) Démarrer le brouillon
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

  // ➤ 2) Ajouter une fleur
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

  // ➤ 3) Finaliser
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

  return (
    <div style={{ padding: 20 }}>
      <h1>Backoffice - Ajouter un bouquet</h1>

      <h3>Nom</h3>
      <input value={nom} onChange={(e) => setNom(e.target.value)} />

      <h3>Description</h3>
      <input value={descr} onChange={(e) => setDescr(e.target.value)} />

      <h3>Image (/img/...)</h3>
      <input value={image} onChange={(e) => setImage(e.target.value)} />

      <h3>Nombre total de fleurs</h3>
      <input
        type="number"
        value={nbFleurs}
        onChange={(e) => setNbFleurs(e.target.value)}
      />

      <br /><br />
      <button onClick={startDraft}>📌 Démarrer Brouillon</button>

      {draft && (
        <>
          <hr />
          <h2>Ajouter les fleurs</h2>

          <input
            placeholder="Nom de la fleur"
            value={flowerName}
            onChange={(e) => setFlowerName(e.target.value)}
          />

          <button onClick={addFlower}>Ajouter</button>

          <h3>Fleurs ajoutées :</h3>
          <ul>
            {draft.fleurs.map((f, i) => (
              <li key={i}>{f.nom}</li>
            ))}
          </ul>

          <button onClick={finishBouquet}>✅ Finaliser le bouquet</button>
        </>
      )}
    </div>
  );
}
