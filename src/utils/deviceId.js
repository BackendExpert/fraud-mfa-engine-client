import { v4 as uuidv4 } from "uuid";

const DEVICE_KEY = "deviceId";

export const getDeviceId = () => {
    // testing
    if (import.meta.env.DEV && import.meta.env.VITE_TEST_DEVICE_ID) {
        return import.meta.env.VITE_TEST_DEVICE_ID;
    }

    let deviceId = localStorage.getItem(DEVICE_KEY);

    if (!deviceId) {
        deviceId = uuidv4();
        localStorage.setItem(DEVICE_KEY, deviceId);
    }

    return deviceId;
};
