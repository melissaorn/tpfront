import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/auth/register", form);

      alert("✅ Compte créé avec succès !");
      navigate("/login"); // 🔁 redirection normale
    } catch (err) {
      console.error("Erreur register :", err);
      alert("❌ Erreur lors de la création du compte");
    }
  };

  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "320px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: "#e3f3ff",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
      }}
    >
      <input
        name="username"
        placeholder="Login"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="password"
        type="password"
        placeholder="Mot de passe"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="fullName"
        placeholder="Nom complet"
        onChange={handleChange}
        style={inputStyle}
      />

      <button style={btnStyle}>Créer compte</button>
    </form>
  );
}

/* ================= STYLES ================= */

const inputStyle = {
  marginBottom: "12px",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #7ec8e3",
};

const btnStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#7ec8e3",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
};
