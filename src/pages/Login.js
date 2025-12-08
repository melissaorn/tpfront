import { useState } from "react";
import axios from "axios";

export default function Login({ setUser }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/auth/login",
        form,
        { withCredentials: true }
      );

      setUser(res.data.user);
      alert("Connecté !");
    } catch (err) {
      alert("Erreur de connexion !");
      console.error(err);
    }
  };

  const inputStyle = {
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    maxWidth: "300px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    display: "block",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <form
        onSubmit={submit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Connexion</h2>
        <input
          style={inputStyle}
          name="username"
          placeholder="Login"
          value={form.username}
          onChange={handleChange}
        />
        <input
          style={inputStyle}
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
        />
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          Connexion
        </button>
      </form>
    </div>
  );
}
