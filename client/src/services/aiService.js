import axios from "axios";
const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL + '/api' });
API.interceptors.request.use(req => {
  const token = localStorage.getItem("userToken") || localStorage.getItem("providerToken");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const askAIAPI = (message, ownerId, ownerRole) => API.post("/ai/ask", { message, ownerId, ownerRole });

