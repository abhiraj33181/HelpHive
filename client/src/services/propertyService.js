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

// API Functions
export const addPropertyAPI = (data) => API.post("/property/add", data);
export const updatePropertyAPI = (id, data) => API.put(`/property/update/${id}`, data);
export const getMyPropertiesAPI = () => API.get("/property/my-properties");

// Public (User Side)
export const getNearbyPropertiesAPI = (lat, lng, type) =>
    API.get(`/property/nearby?lat=${lat}&lng=${lng}&propertyType=${type || ""}`);
