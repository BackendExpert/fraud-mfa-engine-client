import axios from "axios";
import { getDeviceId } from "../utils/deviceId";

const API = axios.create({
    baseURL: import.meta.env.VITE_APP_API,
    withCredentials: true
});

API.interceptors.request.use(
    (config) => {
        config.headers["x-device-id"] = getDeviceId();
        return config;
    },
    (error) => Promise.reject(error)
);

export default API;
