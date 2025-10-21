// screens/HomeScreen.tsx

import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { PizzaCard } from '../components/PizzaCard'; // 👈 Corretto: importato correttamente
import { GlobalStyles } from '../constants/theme';
import { PIZZAS } from '../data/pizzas';
import { HomeScreenProps } from '../navigation/MainDrawer';

export default function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <ScrollView contentContainerStyle={GlobalStyles.scrollContainer}>
            <Text style={GlobalStyles.title}>Il Nostro Menù</Text>
            <View style={GlobalStyles.listContainer}>
                {PIZZAS.map((pizza) => (
                    // Utilizzo corretto del componente
                    <PizzaCard key={pizza.id} pizza={pizza} />
                ))}
            </View>
        </ScrollView>
    );
}