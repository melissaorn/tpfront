import { useEffect, useState } from "react";
import { myFetch } from "../comm/myFetch";

const MonCompte = () => {
  const [user, setUser] = useState(null);

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

  const containerStyle = {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyle = {
    backgroundColor: "#f9f9f9",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  };

  const titleStyle = {
    textAlign: "center",
    color: "#007BFF",
    marginBottom: "40px",
    fontSize: "32px",  // titre plus grand
  };

  const infoStyle = {
    fontSize: "20px",  // texte plus grand
    marginBottom: "15px",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Mon Compte</h2>
      
      {user ? (
        <div style={cardStyle}>
          <p style={infoStyle}><strong>Login :</strong> {user.username || user.email}</p>
          <p style={infoStyle}><strong>Nom complet :</strong> {user.fullName || user.username}</p>
          <p style={infoStyle}><strong>Email :</strong> {user.email}</p>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#666", fontSize: "18px" }}>
          Chargement des informations...
        </p>
      )}
    </div>
  );
};

export default MonCompte;
