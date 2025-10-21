import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Errore', 'Inserisci email e password.');
            return;
        }

        await login(email, password);

        // *** PARTE CRITICA: RESET DELLO STACK DI NAVIGAZIONE (Slide 248) ***
        // Sostituisce lo stack con MainDrawer per impedire di tornare a Login
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'MainDrawer' }], // 'MainDrawer' è la rotta principale in RootStack
            })
        );
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