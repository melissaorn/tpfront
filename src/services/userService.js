import { myFetch } from "../comm/myFetch";

export const registerUser = async (data) =>
  myFetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const loginUser = async (data) =>
  myFetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const getUserInfo = async (token) =>
  myFetch("/auth/me", {}, token);
