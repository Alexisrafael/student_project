import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // Ajusta según tu backend
  withCredentials: true,            // 🔒 para enviar cookies httpOnly
});

export default api;
