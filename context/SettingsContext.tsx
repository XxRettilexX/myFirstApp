import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from '../hooks/use-color-scheme';

type ThemePreference = 'light' | 'dark' | 'system';
type FontSize = 'small' | 'medium' | 'large';

const FONT_SIZE_MAP: Record<FontSize, number> = {
    small: 16,
    medium: 18,
    large: 20,
};

interface SettingsState {
    theme: ThemePreference;
    fontSize: FontSize;
}

interface SettingsContextType extends SettingsState {
    toggleTheme: (preference: ThemePreference) => Promise<void>;
    setFontSize: (size: FontSize) => void;
    currentTheme: 'light' | 'dark';
    bootstrapped: boolean;
    FONT_SIZE_MAP: Record<FontSize, number>; // 👈 CORREZIONE: Aggiunto all'interfaccia
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const STORAGE_KEY_THEME = 'settings:theme';
const STORAGE_KEY_FONT = 'settings:fontSize';

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const systemColorScheme = useColorScheme() ?? 'light';

    const [settings, setSettings] = useState<SettingsState>({
        theme: 'system',
        fontSize: 'medium',
    });
    const [bootstrapped, setBootstrapped] = useState(false);

    // 1. Funzione per caricare le impostazioni da AsyncStorage
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const [storedTheme, storedFont] = await Promise.all([
                    AsyncStorage.getItem(STORAGE_KEY_THEME),
                    AsyncStorage.getItem(STORAGE_KEY_FONT),
                ]);

                setSettings({
                    theme: (storedTheme as ThemePreference) || 'system',
                    fontSize: (storedFont as FontSize) || 'medium',
                });
            } catch (e) {
                console.error("Failed to load settings:", e);
            } finally {
                setBootstrapped(true);
            }
        };
        loadSettings();
    }, []);

    // 2. Funzione per cambiare il tema
    const toggleTheme = async (preference: ThemePreference) => {
        await AsyncStorage.setItem(STORAGE_KEY_THEME, preference);
        setSettings(prev => ({ ...prev, theme: preference }));
    };

    // 3. Funzione per cambiare la dimensione del testo
    const setFontSize = async (size: FontSize) => {
        await AsyncStorage.setItem(STORAGE_KEY_FONT, size);
        setSettings(prev => ({ ...prev, fontSize: size }));
    };

    // 4. Determina il tema effettivo (per l'UI)
    const currentTheme: 'light' | 'dark' = useMemo(() => {
        if (settings.theme === 'system') return systemColorScheme;
        return settings.theme;
    }, [settings.theme, systemColorScheme]);

    const contextValue = useMemo(() => ({
        ...settings,
        toggleTheme,
        setFontSize,
        currentTheme,
        bootstrapped,
        FONT_SIZE_MAP, // Passato nel context value
    }), [settings, currentTheme, bootstrapped]);

    return (
        <SettingsContext.Provider value={contextValue}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings deve essere usato all\'interno di un SettingsProvider');
    }
    return context;
};