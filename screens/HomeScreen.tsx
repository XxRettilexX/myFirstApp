// screens/HomeScreen.tsx

import React from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import { GlobalStyles } from '../constants/theme';
import { PIZZAS } from '../data/pizzas';
import { HomeDrawerScreenProps } from '../navigation/MainTabs'; // 👈 IMPORTA LE PROPS CORRETTE

// Usa le nuove props del Drawer
export default function HomeScreen({ navigation }: HomeDrawerScreenProps) {
    return (
        <ScrollView contentContainerStyle={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>Il Nostro Menù</Text>

            {PIZZAS.map((pizza) => (
                <Pressable
                    key={pizza.id}
                    style={GlobalStyles.button}
                    onPress={() =>
                        // La navigazione a 'PizzaDetails' funziona perché è nello stack genitore
                        navigation.navigate('PizzaDetails', { id: pizza.id, name: pizza.name })
                    }
                >
                    <Text style={GlobalStyles.buttonText}>{pizza.name}</Text>
                </Pressable>
            ))}
        </ScrollView>
    );
}