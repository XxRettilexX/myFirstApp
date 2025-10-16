// app/login.tsx

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput } from 'react-native';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Colori dinamici per light/dark mode
    const textColor = useThemeColor({}, 'text');
    const placeholderColor = useThemeColor({}, 'icon');
    const borderColor = useThemeColor({ light: '#ccc', dark: '#555' }, 'icon');

    const handleLogin = () => {
        // Qui, in un'app reale, controlleresti email e password.
        // Per ora, simuliamo un login andato a buon fine.
        if (!email || !password) {
            Alert.alert('Errore', 'Per favore, inserisci email e password.');
            return;
        }

        // *** PARTE FONDAMENTALE DELL'ESERCIZIO ***
        // `router.replace` naviga alla schermata delle schede (tabs)
        // e sostituisce la schermata di login nello stack.
        // Questo impedisce all'utente di tornare indietro alla pagina di login.
        // È l'equivalente di `navigation.reset` visto nelle slide. 
        router.replace('/(tabs)');
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Accedi</ThemedText>

            <TextInput
                style={[styles.input, { color: textColor, borderColor }]}
                placeholder="Email"
                placeholderTextColor={placeholderColor}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={[styles.input, { color: textColor, borderColor }]}
                placeholder="Password"
                placeholderTextColor={placeholderColor}
                value={password}
                onChangeText={setPassword}
                secureTextEntry // Nasconde il testo della password
            />

            <Pressable onPress={handleLogin} style={styles.button}>
                <ThemedText style={styles.buttonText}>Accedi</ThemedText>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        marginTop: 16,
    },
    button: {
        marginTop: 24,
        backgroundColor: '#2563eb',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});