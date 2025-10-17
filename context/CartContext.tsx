// context/CartContext.tsx

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { Pizza } from '../data/pizzas';

export interface CartItem extends Pizza {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (pizza: Pizza) => void;
    clearCart: () => void; // 👈 AGGIUNGI LA NUOVA FUNZIONE
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (pizza: Pizza) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === pizza.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...pizza, quantity: 1 }];
        });
        Alert.alert("Aggiunta!", `${pizza.name} è stata aggiunta al carrello.`);
    };

    // 👇 IMPLEMENTA LA FUNZIONE PER SVUOTARE IL CARRELLO
    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider value={{ items, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart deve essere usato all\'interno di un CartProvider');
    }
    return context;
};