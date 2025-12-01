import { useEffect, useState } from "react";
import { myFetch } from "../comm/myFetch";

const MonCompte = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // The loadUsers function doesn't need 'id' as an argument
    const loadUsers = async () => {
      try {
        const data = await myFetch(`/auth/me`, { method: "GET", credentials: "include" });
        console.log("users: ", data);
        setUsers(data.user);
      } catch (err) {
        console.error("Erreur chargement users :", err);
      }
    };
    
    // Call the function to load users
    loadUsers();
    
    // Empty dependency array ensures it runs only once on mount
  }, []);

  return (
    <div className="container">
      <h2 className="text-center text-primary mb-4">Utilisateurs</h2>
      <div>
          <div key={users.email || users.id}>
            <p>Login : {users.email}</p>
            <h5>Nom complet : {users.username}</h5>
          </div>
      </div>
    </div>
  );
};

export default MonCompte;