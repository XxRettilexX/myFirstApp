import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../navigation/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Errore', 'Inserisci email e password.');
            return;
        }
        // Esegui il reset dello stack come da slide
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Accedi</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Pressable onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Accedi</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: 'white' },
    title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 16 },
    button: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8 },
    buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});