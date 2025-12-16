import axios from "axios";
import { baseUrl, useAxios } from "../config/config";

// myFetch NE CONNAÎT PAS Redux
export const myFetch = async (url, options = {}, token = null) => {
  const fullUrl = baseUrl + url;

  // ✅ HEADERS OBLIGATOIRES
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  if (useAxios) {
    const res = await axios({
      url: fullUrl,
      method: options.method || "GET",
      headers,
      data: options.body ? JSON.parse(options.body) : undefined,
    });
    return res.data;
  } else {
    const res = await fetch(fullUrl, {
      method: options.method || "GET",
      headers,
      body: options.body,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  }
};
