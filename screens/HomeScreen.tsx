// screens/HomeScreen.tsx

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
// Importa i tipi necessari
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabsParamList } from '../navigation/MainTabs';
import { RootStackParamList } from '../navigation/RootStack';

// Crea un tipo composito che descrive la navigazione annidata
type Props = CompositeScreenProps<
    BottomTabScreenProps<TabsParamList, 'Home'>,
    NativeStackScreenProps<RootStackParamList>
>;

// Ora il componente riceve le props corrette
export default function HomeScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu Pizze</Text>
            <Pressable
                style={styles.pizzaButton}
                onPress={() =>
                    // La navigazione funziona come prima
                    navigation.navigate('PizzaDetails', { id: 'marg-001', name: 'Margherita' })
                }
            >
                <Text style={styles.pizzaText}>Vai ai dettagli della Margherita</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
    title: { fontSize: 24, fontWeight: 'bold' },
    pizzaButton: { backgroundColor: '#0a7ea4', padding: 14, borderRadius: 8 },
    pizzaText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});