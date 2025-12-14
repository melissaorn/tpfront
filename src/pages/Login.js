import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

export default function Login() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/auth/login", form, {
        withCredentials: true,
      });

      dispatch(setUser(res.data.user));
      alert("Connecté !");
    } catch (err) {
      alert("Login ou mot de passe incorrect");
      console.error("Erreur login :", err);
    }
  };

  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: "#e3f3ff", // bleu ciel très clair
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
      }}
    >
      <input
        name="username"
        placeholder="Login"
        onChange={handleChange}
        style={{
          marginBottom: "15px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #7ec8e3",
        }}
      />

      <input
        name="password"
        type="password"
        placeholder="Mot de passe"
        onChange={handleChange}
        style={{
          marginBottom: "15px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #7ec8e3",
        }}
      />

      <button
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#7ec8e3", // bleu ciel
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Connexion
      </button>
    </form>
  );
}
