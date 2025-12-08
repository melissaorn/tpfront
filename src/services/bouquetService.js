import { myFetch } from "../comm/myFetch";

export const getBouquets = async () => {
  try {
    return await myFetch("/bouquets"); // ✔ route Sequelize
  } catch (err) {
    console.error("Erreur lors de la récupération des bouquets :", err);
    return [];
  }
};


export const sendLike = async (id) => {
  try {
    const res =await myFetch(`/bouquets/${id}/like`, {
      method: "POST",
      credentials: "include",
    });
    console.log(`Like envoyé pour le bouquet ${id}`);
     // --- Vérification OBLIGATOIRE ---
  
    // Retourner le bouquet mis à jour
    return res;
  } catch (err) {
    console.error("Erreur lors de l’envoi du like :", err);
    throw err;
  }
};
export const getLikers = async (id) => {
  try {
    const res=  await myFetch(`/bouquets/${id}/likers`, {
      method: "GET",
      credentials: "include",
    });
    return res;
  } catch (err) {
    console.error("Erreur lors de la récupération des likers :", err);
    throw err;
  }
};