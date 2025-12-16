import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(login(form)).unwrap();
      alert("Connecté !");
      navigate("/"); // retour à l'accueil
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
        backgroundColor: "#e3f3ff",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
      }}
    >
      <input
        name="username"
        placeholder="Login"
        value={form.username}
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
        value={form.password}
        onChange={handleChange}
        style={{
          marginBottom: "15px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #7ec8e3",
        }}
      />

      <button
        disabled={loading}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#7ec8e3",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Connexion..." : "Connexion"}
      </button>
    </form>
  );
}
