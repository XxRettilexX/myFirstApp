
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useReducer } from 'react';

// Tipi per l'utente e lo stato [cite: 28, 29]
type User = { id: string; email: string };

interface AuthState {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
    bootstrapped: boolean; // Flag per indicare se lo stato è stato caricato [cite: 97, 229]
}

// Azioni del reducer [cite: 30, 31, 32, 33]
type Action =
    | { type: 'LOGIN'; payload: { user: User; token: string } }
    | { type: 'LOGOUT' }
    | { type: 'BOOTSTRAP_DONE'; payload: { user: User | null; token: string | null } };

// Stato iniziale [cite: 34]
const initial: AuthState = { user: null, token: null, isLoggedIn: false, bootstrapped: false };

// Reducer [cite: 36, 37, 38, 39, 40, 41]
function reducer(state: AuthState, action: Action): AuthState {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload.user, token: action.payload.token, isLoggedIn: true };
        case 'LOGOUT':
            return { ...state, user: null, token: null, isLoggedIn: false };
        case 'BOOTSTRAP_DONE':
            return {
                user: action.payload.user,
                token: action.payload.token,
                isLoggedIn: !!action.payload.token,
                bootstrapped: true
            };
        default:
            return state;
    }
}

// Creazione dei contesti [cite: 44, 45]
const AuthStateCtx = createContext<AuthState | undefined>(undefined);
const AuthDispatchCtx = createContext<React.Dispatch<Action> | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initial);

    // Bootstrap: carica sessione da storage una volta (Rehydration Pattern) [cite: 49, 50]
    useEffect(() => {
        const loadAuthData = async () => {
            const [u, t] = await Promise.all([
                AsyncStorage.getItem('auth:user'), // [cite: 53]
                AsyncStorage.getItem('auth:token'), // [cite: 54]
            ]);
            const user = u ? JSON.parse(u) as User : null; // [cite: 56]
            const token = t ?? null; // [cite: 57]
            dispatch({ type: 'BOOTSTRAP_DONE', payload: { user, token } }); // [cite: 58]
        };
        loadAuthData();
    }, []);

    // Memo evita re-render inutili dei consumer [cite: 62]
    const memoState = useMemo(() => state, [state]);

    return (
        <AuthDispatchCtx.Provider value={dispatch}>
            <AuthStateCtx.Provider value={memoState}>
                {children}
            </AuthStateCtx.Provider>
        </AuthDispatchCtx.Provider>
    );
};

export const useAuth = () => {
    const s = useContext(AuthStateCtx);
    const d = useContext(AuthDispatchCtx);
    if (s === undefined || d === undefined) {
        throw new Error('useAuth deve essere usato all\'interno di un AuthProvider'); // [cite: 73]
    }

    // Funzione di login aggiornata con persistenza [cite: 75, 79, 83]
    const login = async (email: string, pwd: string) => {
        // simulazione login
        const fakeUser: User = { id: 'u1', email };
        const fakeToken = 'jwt-123';

        await Promise.all([
            AsyncStorage.setItem('auth:user', JSON.stringify(fakeUser)), // [cite: 80]
            AsyncStorage.setItem('auth:token', fakeToken), // [cite: 81]
        ]);
        d({ type: 'LOGIN', payload: { user: fakeUser, token: fakeToken } });
    };

    // Funzione di logout aggiornata con persistenza [cite: 85, 87]
    const logout = async () => {
        await Promise.all([
            AsyncStorage.removeItem('auth:user'), // [cite: 86]
            AsyncStorage.removeItem('auth:token') // [cite: 86]
        ]);
        d({ type: 'LOGOUT' });
    };

    return { ...s, login, logout }; // [cite: 89]
};

export type { Action, AuthState, User };
