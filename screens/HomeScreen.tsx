// screens/HomeScreen.tsx

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import { GlobalStyles } from '../constants/theme';
import { PIZZAS } from '../data/pizzas'; // 👈 IMPORTA I DATI
import { TabsParamList } from '../navigation/MainTabs';
import { RootStackParamList } from '../navigation/RootStack';

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabsParamList, 'Home'>,
    NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
    return (
        <ScrollView contentContainerStyle={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>Il Nostro Menù</Text>

            {/* Crea un pulsante per ogni pizza nella nostra lista */}
            {PIZZAS.map((pizza) => (
                <Pressable
                    key={pizza.id}
                    style={GlobalStyles.button}
                    onPress={() =>
                        // Ora i dati passati sono dinamici!
                        navigation.navigate('PizzaDetails', { id: pizza.id, name: pizza.name })
                    }
                >
                    <Text style={GlobalStyles.buttonText}>{pizza.name}</Text>
                </Pressable>
            ))}
        </ScrollView>
    );
}