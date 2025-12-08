import { myFetch } from "../comm/myFetch";
export const getUserInfo = async () => {
    try {
        return await myFetch("/auth/me", { method: "GET", credentials: "include" });
    } catch (err) {
        console.error("Erreur lors de la récupération des infos utilisateur :", err);
        return null;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await myFetch("/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
            credentials: "include",
        });
        return response;
    } catch (err) {
        console.error("Erreur lors de l'inscription de l'utilisateur :", err);
        return null;
    }
};
export const loginUser = async (credentials) => {
    try {
        const response = await myFetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            credentials: "include",
        });
        return response;
    } catch (err) {
        console.error("Erreur lors de la connexion de l'utilisateur :", err);
        return null;
    }
};
export const logoutUser = async () => {
    try {
        const response = await myFetch("/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        return response;
    } catch (err) {
        console.error("Erreur lors de la déconnexion de l'utilisateur :", err);
        return null;
    }
};
export const isAuthenticated = async () => {
    try {
        const response = await myFetch("/auth/isAuthenticated", {
            method: "GET",
            credentials: "include",
        });
        return response.isAuthenticated;
    } catch (err) {
        console.error("Erreur lors de la vérification de l'authentification :", err);
        return false;
    }
};

export const whoIsAuthenticated = async () => {
    try {
        const response = await myFetch("/auth/whoIsAuthenticated", {
            method: "GET",
            credentials: "include",
        });
        return response;
    }
    catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur authentifié :", err);
        return null;
    }
};