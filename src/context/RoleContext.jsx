import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const { user } = useAuth();

    const role = user?.role || "guest";

    return (
        <RoleContext.Provider value={{ role }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => useContext(RoleContext);