import { useEffect, useState } from "react";
import { myFetch } from "../comm/myFetch";

const MonCompte = () => {
  const [user, setUser] = useState(null); // ⚡ Renommé en 'user' car c'est un seul utilisateur

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await myFetch(`/auth/me`, { method: "GET", credentials: "include" });
        setUser(data.user);
      } catch (err) {
        console.error("Erreur chargement user :", err);
      }
    };

    loadUser();
  }, []);

  if (!user) return <h2 className="text-center mt-5">Chargement...</h2>;

  return (
    <div className="container" style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}>
      <div style={{
        maxWidth: "400px",
        width: "100%",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
        textAlign: "center"
      }}>
        <h2 className="text-primary mb-4">Mon Compte</h2>
        
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontWeight: "500", fontSize: "16px", color: "#555" }}>Login :</p>
          <p style={{ fontSize: "18px", fontWeight: "600", color: "#333" }}>{user.email}</p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontWeight: "500", fontSize: "16px", color: "#555" }}>Nom complet :</p>
          <p style={{ fontSize: "18px", fontWeight: "600", color: "#333" }}>{user.username}</p>
        </div>

        <button style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          fontWeight: "500",
          cursor: "pointer",
          transition: "0.3s"
        }}
        onMouseEnter={e => e.target.style.backgroundColor = "#0056b3"}
        onMouseLeave={e => e.target.style.backgroundColor = "#007bff"}
        >
          Modifier le compte
        </button>
      </div>
    </div>
  );
};

export default MonCompte;
