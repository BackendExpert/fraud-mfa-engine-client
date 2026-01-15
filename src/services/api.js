import axios from "axios";
import { getDeviceId } from "../utils/device";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

API.interceptors.request.use((config) => {
    const token =
        localStorage.getItem("token") ||
        localStorage.getItem("mfaToken") ||
        localStorage.getItem("otptoken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["x-device-id"] = getDeviceId();

    return config;
});

export default API;
