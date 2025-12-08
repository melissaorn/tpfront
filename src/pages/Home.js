import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const Home = () => {
  // On récupère les infos du user depuis Redux
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="text-center mt-4">
      <h1>Bienvenue dans notre boutique de bouquets</h1>
      <p>Découvrez nos bouquets uniques et parfumés.</p>

      {isAuthenticated ? (
        <h4 className="text-success mt-3">
          Bonjour <strong>{user.username}</strong> 🌸
        </h4>
      ) : (
        <h5 className="text-secondary mt-3">
          Connectez-vous pour profiter de toutes les fonctionnalités.
        </h5>
      )}
    </div>
  );
};

export default Home;
