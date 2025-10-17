// context/OrderContext.tsx

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from './CartContext';

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    date: Date;
}

interface OrderContextType {
    orders: Order[];
    addOrder: (items: CartItem[], total: number) => void;
    removeOrder: (orderId: string) => void; // 👈 AGGIUNGI LA NUOVA FUNZIONE
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([]);

    const addOrder = (items: CartItem[], total: number) => {
        const newOrder: Order = {
            id: `order-${Date.now()}`,
            items,
            total,
            date: new Date(),
        };
        setOrders(prevOrders => [newOrder, ...prevOrders]);
    };

    // 👇 IMPLEMENTA LA FUNZIONE PER RIMUOVERE UN ORDINE
    const removeOrder = (orderId: string) => {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, removeOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrders deve essere usato all\'interno di un OrderProvider');
    }
    return context;
};