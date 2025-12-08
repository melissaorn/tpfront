import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";

const Bouquet = ({ bouquet, onLike }) => {
  // Récupération de l'état d'authentification depuis Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div
      className="card m-3 shadow-sm"
      style={{ width: "18rem", borderRadius: "15px", overflow: "hidden" }}
    >
      <img
        src={bouquet.image}
        className="card-img-top"
        alt={bouquet.nom}
        style={{ height: "200px", objectFit: "cover" }}
      />

      <div className="card-body text-center">
        <h5 className="card-title text-danger">{bouquet.nom}</h5>
        <p className="card-text">{bouquet.descr}</p>
        <p className="text-primary fw-bold">{bouquet.prix} DA</p>

        <FaHeart
          onClick={() => {
            if (isAuthenticated) {
              onLike(bouquet.id);
            } else {
              alert("Vous devez être connecté pour liker.");
            }
          }}
          style={{
            cursor: "pointer",
            color: isAuthenticated
              ? bouquet.liked
                ? "red"
                : "lightgray"
              : "gray", // désactivé si non connecté
            opacity: isAuthenticated ? 1 : 0.5,
            fontSize: "1.8rem",
            transition: "color 0.3s",
          }}
        />
      </div>

      <p className="mt-1">{bouquet.likes || 0} likes</p>
    </div>
  );
};

export default Bouquet;
