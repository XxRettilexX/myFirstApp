// context/AuthContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        // In un'app reale, qui gestiresti le credenziali
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
        // Qui potresti anche svuotare i dati del profilo se necessario
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve essere usato all\'interno di un AuthProvider');
    }
    return context;
};