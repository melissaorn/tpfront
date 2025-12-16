import { useEffect, useState } from "react";
import { myFetch } from "../comm/myFetch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MonCompte = () => {
  const navigate = useNavigate();

  // 🔐 token depuis Redux
  const token = useSelector((state) => state.user.token);

  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("profil");
  const [mesBouquets, setMesBouquets] = useState([]);

  // ===============================
  // CHARGER UTILISATEUR CONNECTÉ
  // ===============================
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await myFetch("/auth/me", {}, token);
        setUser(data.user);
      } catch (err) {
        navigate("/login");
      }
    };

    if (token) loadUser();
  }, [token, navigate]);

  // ===============================
  // CHARGER MES BOUQUETS
  // ===============================
  const loadMesBouquets = async () => {
    const data = await myFetch("/bouquets/mine", {}, token);
    setMesBouquets(data);
  };

  // ===============================
  // SUPPRIMER BOUQUET
  // ===============================
  const deleteBouquet = async (id) => {
    if (!window.confirm("Supprimer ce bouquet ?")) return;

    await myFetch(`/bouquets/${id}`, { method: "DELETE" }, token);
    loadMesBouquets();
  };

  if (!user) {
    return <h3 className="text-center mt-5">Chargement...</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Mon Compte</h1>

      {/* ONGLET */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <button
          className={`btn ${
            tab === "profil" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setTab("profil")}
        >
          Profil
        </button>

        <button
          className={`btn ${
            tab === "bouquets" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => {
            setTab("bouquets");
            loadMesBouquets();
          }}
        >
          Mes bouquets
        </button>
      </div>

      {/* PROFIL */}
      {tab === "profil" && (
        <div className="card p-4 mx-auto shadow" style={{ maxWidth: "400px" }}>
          <p>
            <strong>Login :</strong> {user.username}
          </p>
          <p>
            <strong>Email :</strong> {user.email}
          </p>
          <p>
            <strong>Nom complet :</strong> {user.fullName}
          </p>
        </div>
      )}

      {/* MES BOUQUETS */}
      {tab === "bouquets" && (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {mesBouquets.map((b) => (
            <div
              key={b.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "220px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <img
                  src={`http://localhost:3001${b.image}`}
                  alt={b.nom}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
                <h3 style={{ marginTop: "10px", textAlign: "center" }}>
                  {b.nom}
                </h3>
                <p style={{ textAlign: "center" }}>{b.descr}</p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginTop: "10px",
                }}
              >
                <button
                  className="btn btn-warning"
                  onClick={() => navigate(`/modifier-bouquet/${b.id}`)}
                >
                  ✏️ Modifier
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteBouquet(b.id)}
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MonCompte;
