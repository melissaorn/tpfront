import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { myFetch } from "../comm/myFetch";

const ModifierBouquet = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    descr: "",
    image: "",
  });

  useEffect(() => {
    const loadBouquet = async () => {
      const data = await myFetch(`/bouquets/${id}`);
      setForm({
        nom: data.nom,
        descr: data.descr,
        image: data.image,
      });
    };
    loadBouquet();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    await myFetch(`/bouquets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // 🔥 OBLIGATOIRE
      },
      body: JSON.stringify(form),
    });

    alert("Bouquet modifié");
    navigate("/mon-compte");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-3">Modifier le bouquet</h3>

      <form onSubmit={submit} className="card p-4 shadow">
        <input
          className="form-control mb-2"
          name="nom"
          value={form.nom}
          onChange={handleChange}
          placeholder="Nom"
          required
        />

        <input
          className="form-control mb-2"
          name="descr"
          value={form.descr}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <input
          className="form-control mb-3"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="/img/..."
          required
        />

        <button className="btn btn-primary w-100">Enregistrer</button>
      </form>
    </div>
  );
};

export default ModifierBouquet;
