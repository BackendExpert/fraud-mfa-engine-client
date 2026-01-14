import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, roles }) => {
    const { auth } = useAuth();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Simulate waiting for token in localStorage
        const token = localStorage.getItem("token");
        if (token) {
            setIsChecking(false);
        } else {
            setIsChecking(false);
        }
    }, []);

    if (isChecking) {
        // You can return a loader here or null to prevent flicker
        return null;
    }

    if (!auth.token) {
        return <Navigate to="/" />;
    }

    if (roles && !roles.includes(auth.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;