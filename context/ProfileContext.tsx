// context/ProfileContext.tsx

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { Order } from './OrderContext';

// 👇 Esportiamo l'interfaccia
export interface UserProfile {
    points: number;
    orderHistory: Order[];
}

interface ProfileContextType {
    profile: UserProfile;
    addPaidOrder: (order: Order) => void;
    clearProfile: () => void; // 👈 Aggiungiamo la funzione al tipo
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [profile, setProfile] = useState<UserProfile>({
        points: 0,
        orderHistory: [],
    });
    const { isLoggedIn } = useAuth();

    const addPaidOrder = (order: Order) => {
        if (isLoggedIn) {
            const newPoints = Math.floor(order.total);
            setProfile(prevProfile => ({
                orderHistory: [order, ...prevProfile.orderHistory],
                points: prevProfile.points + newPoints,
            }));
        }
    };

    const clearProfile = () => {
        setProfile({ points: 0, orderHistory: [] });
    };

    return (
        <ProfileContext.Provider value={{ profile, addPaidOrder, clearProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile deve essere usato all\'interno di un ProfileProvider');
    }
    return context;
};