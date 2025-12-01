import { FaHeart } from "react-icons/fa";

const Bouquet = ({ bouquet, onLike }) => (
  <div className="card m-3 shadow-sm" style={{ width: "18rem", borderRadius: "15px", overflow: "hidden" }}>
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
        onClick={() => onLike(bouquet.id)}
        {...console.log("Bouquet likes:", bouquet.id)}
        
        style={{ cursor: "pointer", color: bouquet.liked ? "red" : "lightgray", fontSize: "1.8rem", transition: "color 0.3s" }}
      />
      <p className="mt-1">{bouquet.likes || 0} likes</p>
    </div>
  </div>
);

export default Bouquet;
