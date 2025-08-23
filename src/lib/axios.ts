import axios from "axios";
import { getCookie } from "cookies-next";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  timeout: 10000,
});
 
api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) { 
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
