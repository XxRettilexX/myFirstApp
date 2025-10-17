import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../constants/theme';
import { useAuth } from '../context/AuthContext'; // 👈 Importa l'hook di autenticazione
import { RootStackParamList } from '../navigation/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // 👈 Ottieni la funzione di login

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Errore', 'Inserisci email e password.');
            return;
        }
        // 1. Esegui il login (aggiorna lo stato globale)
        login();
        // 2. Torna alla schermata precedente (il Profilo)
        navigation.goBack();
    };

    return (
        <View style={GlobalStyles.container}>
            <Text style={styles.title}>Bentornato!</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Pressable onPress={handleLogin} style={GlobalStyles.button}>
                <Text style={GlobalStyles.buttonText}>Accedi</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    title: { ...GlobalStyles.title, fontSize: 32 },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        fontSize: 16,
    },
});