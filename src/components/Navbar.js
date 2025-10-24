import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const menu = [
    { url: "/home", label: "Home" },
    { url: "/bouquets", label: "Bouquets" },
    { url: "/fleurs", label: "Fleurs" },
    { url: "/moncompte", label: "Mon Compte" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-danger bg-danger">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
           flower
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {menu.map((item) => (
              <li key={item.url} className="nav-item">
                <Link className="nav-link" to={item.url}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
