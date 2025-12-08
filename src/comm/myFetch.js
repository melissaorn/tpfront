import axios from "axios";
import { baseUrl, useAxios } from "../config/config";

export const myFetch = async (url, options = {}) => {
  const fullUrl = baseUrl + url;

  if (useAxios) {
    const method = options.method || "GET";
    const res = await axios({ url: fullUrl, method, ...options });
    return res.data;
  } else {
    const res = await fetch(fullUrl,  {
    ...options,
    credentials: "include",})
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  }
};
