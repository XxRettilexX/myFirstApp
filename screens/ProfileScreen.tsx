// screens/ProfileScreen.tsx

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CommonActions, CompositeScreenProps } from '@react-navigation/native'; // Importa CommonActions
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TabsParamList } from '../navigation/MainTabs';
import { RootStackParamList } from '../navigation/RootStack';

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabsParamList, 'Profile'>,
    NativeStackScreenProps<RootStackParamList>
>;

export default function ProfileScreen({ navigation }: Props) {
    const handleLogout = () => {
        // Usiamo CommonActions.reset per resettare lo stack di navigazione principale
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profilo Utente</Text>
            <Pressable onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    button: { backgroundColor: '#d9534f', padding: 14, borderRadius: 8 },
    buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});