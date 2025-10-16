import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput } from 'react-native';

export function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isFormValid = email.includes('@') && password.length >= 6;
    const textColor = useThemeColor({}, 'text');
    const placeholderColor = useThemeColor({}, 'icon');

    const handleLogin = () => {
        if (isFormValid) {
            Alert.alert('Successo', `Login effettuato con: ${email}`);
        }
    };

    return (
        <ThemedView style={styles.loginForm}>
            <TextInput
                style={[styles.loginInput, { color: textColor, borderColor: placeholderColor }]}
                placeholder="Email"
                placeholderTextColor={placeholderColor}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={[styles.loginInput, { color: textColor, borderColor: placeholderColor }]}
                placeholder="Password"
                placeholderTextColor={placeholderColor}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Pressable
                onPress={handleLogin}
                disabled={!isFormValid}
                style={({ pressed }) => [
                    styles.loginButton,
                    pressed && styles.loginButtonPressed,
                    !isFormValid && styles.loginButtonDisabled,
                ]}
            >
                <ThemedText style={styles.buttonText}>Accedi</ThemedText>
            </Pressable>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    loginForm: {
        padding: 16,
        borderRadius: 12,
    },
    loginInput: {
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 16,
    },
    loginButton: {
        padding: 14,
        borderRadius: 10,
        backgroundColor: '#2563eb',
        alignItems: 'center',
    },
    loginButtonPressed: {
        backgroundColor: '#1e40af',
    },
    loginButtonDisabled: {
        backgroundColor: '#a5b4fc',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});