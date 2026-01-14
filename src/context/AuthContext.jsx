import { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: null,
        id: null,
        user: null,
        role: null,
    });

    const [verifyPasswordInfo, setVerifyPasswordInfo] = useState({
        email: null,
        otp: null
    });

    // Load token from localStorage if exists
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const decoded = jwtDecode(storedToken);
            setAuth({
                token: storedToken,
                id: decoded.id,
                user: { id: decoded.id, email: decoded.email },
                role: decoded.role,
            });
        }
    }, []);

    // Store OTP token for VerifyPassword step
    const handlePasswordVerificationToken = (token) => {
        const decoded = jwtDecode(token);
        localStorage.setItem("tokenotp", token);
        setVerifyPasswordInfo({
            email: decoded.email,
            otp: decoded.otp
        });
    };

    // Login and store JWT token
    const login = (token) => {
        const decoded = jwtDecode(token);
        localStorage.setItem("token", token);
        setAuth({
            token,
            id: decoded.id,
            user: { id: decoded.id, email: decoded.email },
            role: decoded.role,
        });
        // Clear OTP info after login
        setVerifyPasswordInfo({ email: null, otp: null });
    };

    // Logout user
    const logout = (navigate) => {
        localStorage.clear();
        setAuth({ token: null, id: null, user: null, role: null });
        setVerifyPasswordInfo({ email: null, otp: null });
        navigate("/", { replace: true });
    };

    return (
        <AuthContext.Provider value={{
            auth,
            verifyPasswordInfo,
            handlePasswordVerificationToken,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
