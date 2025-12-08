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
      const res = await axios.post(
        "http://localhost:3001/auth/login",
        form,
        { withCredentials: true }
      );

      // Mise à jour du Redux store
      dispatch(setUser(res.data.user));

      alert("Connecté !");
    } catch (err) {
      alert("Login ou mot de passe incorrect");
      console.error("Erreur login :", err);
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        name="username"
        placeholder="Login"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Mot de passe"
        onChange={handleChange}
      />

      <button>Connexion</button>
    </form>
  );
}
