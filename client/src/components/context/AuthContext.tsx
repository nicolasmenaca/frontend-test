import {createContext, type ReactNode, useContext, useState,} from "react";
import type {UserProfileDTO} from "../../dtos/UserProfileDTO.ts";

type User = {
    id: number;
    nombre: string;
    email: string;
};

type AuthContextType = {
    token: string | null;
    user: User | null;
    login: (token: string, user: UserProfileDTO) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const loginUser = (newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
    };

    const logoutUser = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login: loginUser, logout: logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
};
