// context/CartContext.tsx (Modificato)

import React, { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';
import { Alert } from 'react-native';
import { Pizza } from '../data/pizzas';

// Tipi come da slide (adattati alla Pizza esistente)
export interface CartItem extends Pizza {
    quantity: number;
}

// Stato come da slide: un record di Item con ID come chiave
interface CartState {
    items: Record<string, CartItem>;
}

// Azioni
type CartAction =
    | { type: 'ADD'; payload: Pizza }
    | { type: 'SET_QTY'; payload: { id: string; quantity: number } }
    | { type: 'REMOVE'; payload: { id: string } }
    | { type: 'CLEAR' };

// Stato iniziale
const initial: CartState = { items: {} };

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD': {
            const { id, name, price, description } = action.payload;
            const existingItem = state.items[id];
            const quantity = existingItem ? existingItem.quantity + 1 : 1;
            return {
                items: {
                    ...state.items,
                    [id]: { id, name, price, description, quantity },
                },
            };
        }
        case 'SET_QTY': {
            const existingItem = state.items[action.payload.id];
            if (!existingItem) return state;
            return {
                items: {
                    ...state.items,
                    [action.payload.id]: {
                        ...existingItem,
                        quantity: action.payload.quantity,
                    },
                },
            };
        }
        case 'REMOVE': {
            // Destructuring per rimuovere l'elemento per ID
            const { [action.payload.id]: _, ...rest } = state.items;
            return { items: rest };
        }
        case 'CLEAR':
            return { items: {} };
        default:
            return state;
    }
}

// Selector per calcolare il totale
export const selectTotal = (state: CartState) =>
    Object.values(state.items).reduce((sum, item) => sum + item.price * item.quantity, 0);

// Nuovo Selector per calcolare il numero totale di articoli
export const selectItemCount = (state: CartState) =>
    Object.values(state.items).reduce((sum, item) => sum + item.quantity, 0);


interface CartContextType {
    items: CartItem[];
    total: number;
    itemsCount: number; // 👈 Nuovo
    addToCart: (pizza: Pizza) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initial);

    // Valori derivati (selectors)
    const cartItems = useMemo(() => Object.values(state.items), [state.items]);
    const total = useMemo(() => selectTotal(state), [state]);
    const itemsCount = useMemo(() => selectItemCount(state), [state]); // 👈 Nuovo selettore

    const addToCart = (pizza: Pizza) => {
        dispatch({ type: 'ADD', payload: pizza });
        Alert.alert("Aggiunta!", `${pizza.name} è stata aggiunta al carrello.`);
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR' });
    };

    const contextValue = useMemo(() => ({
        items: cartItems,
        total,
        itemsCount, // 👈 Nuovo
        addToCart,
        clearCart,
    }), [cartItems, total, itemsCount, addToCart, clearCart]);


    return (
        <CartContext.Provider value={contextValue}>
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