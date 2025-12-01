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
    await myFetch(`/bouquets/${id}/like`, {
      method: "POST",
      credentials: "include",
    });
    console.log(`Like envoyé pour le bouquet ${id}`);
  } catch (err) {
    console.error("Erreur lors de l’envoi du like :", err);
  }
};
