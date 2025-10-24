import React from "react";
import Bouquet from "../components/Bouquet";

const Bouquets = ({ bouquets }) => {
  return (
    <div className="container">
      <h2 className="mb-4 text-center">Nos Bouquets</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {bouquets.map((bq) => (
          <Bouquet key={bq.id} bouquet={bq} />
        ))}
      </div>
    </div>
  );
};

export default Bouquets;
