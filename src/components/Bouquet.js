import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

const Bouquet = ({ bouquet, onLike }) => {
  const [liked, setLiked] = useState(bouquet.liked || false);

  // Mettre à jour l’état local si le parent change
  useEffect(() => {
    setLiked(bouquet.liked || false);
  }, [bouquet.liked]);

  const toggleLike = () => {
    setLiked(!liked);
    if (onLike) onLike(bouquet.id);
  };

  return (
    <div
      className="card m-3 shadow-sm"
      style={{
        width: "18rem",
        borderRadius: "15px",
        overflow: "hidden",
      }}
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

        {/* Icône de like */}
        <FaHeart
          onClick={toggleLike}
          style={{
            cursor: "pointer",
            color: liked ? "red" : "lightgray",
            fontSize: "1.8rem",
            transition: "color 0.3s",
          }}
        />
      </div>
    </div>
  );
};

export default Bouquet;
