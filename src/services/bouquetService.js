import { myFetch } from "../comm/myFetch";

// token est PASSÉ EN PARAMÈTRE
export const getBouquets = async (token) => {
  return await myFetch("/bouquets", {}, token);
};

export const sendLike = async (id, token) => {
  return await myFetch(
    `/bouquets/${id}/like`,
    { method: "POST" },
    token
  );
};

export const getLikers = async (id, token) => {
  return await myFetch(`/bouquets/${id}/likers`, {}, token);
};
