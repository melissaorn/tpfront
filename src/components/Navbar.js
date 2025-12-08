import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menu = [
    { url: "/home", label: "Home" },
    { url: "/bouquets", label: "Bouquets" },
    { url: "/fleurs", label: "Fleurs" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#000" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">flower</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {menu.map(item => (
              <li key={item.url} className="nav-item">
                <Link className="nav-link" to={item.url}>{item.label}</Link>
              </li>
            ))}

            {/* SI CONNECTÉ */}
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/moncompte">Mon Compte</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/backoffice">Backoffice</Link>
                </li>

                <li className="nav-item">
                  <button className="btn btn-light ms-2" onClick={logout}>Déconnexion</button>
                </li>
              </>
            )}

            {/* SI NON CONNECTÉ */}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Se connecter</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Créer un compte</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
