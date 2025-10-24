import React from "react";

const Bouquet = ({ bouquet }) => {
  return (
    <div className="card m-3 shadow-sm" style={{ width: "18rem" }}>
      <img
        src={bouquet.image}
        className="card-img-top"
        alt={bouquet.nom}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{bouquet.nom}</h5>
        <p className="card-text">{bouquet.descr}</p>
        <p className="text-primary fw-bold">{bouquet.prix} DA</p>
        <button className="btn btn-outline-success">Ajouter au panier</button>
      </div>
    </div>
  );
};

export default Bouquet;
