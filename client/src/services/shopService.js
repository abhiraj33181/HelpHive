import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + '/api'
});

// Add token
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("providerToken");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export const addShopAPI = (data) => API.post("/shop/add", data);
export const updateShopAPI = (id, data) => API.put(`/shop/update/${id}`, data);
export const getMyShopsAPI = () => API.get("/shop/my-shops");
export const getNearbyShopsAPI = (lat, lng) => API.get(`/shop/nearby?lat=${lat}&lng=${lng}`);
