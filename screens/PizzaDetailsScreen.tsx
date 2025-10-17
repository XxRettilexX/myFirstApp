// screens/PizzaDetailsScreen.tsx

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../constants/theme';
import { useCart } from '../context/CartContext';
import { PIZZAS } from '../data/pizzas';
import { RootStackParamList } from '../navigation/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'PizzaDetails'>;

export default function PizzaDetailsScreen({ route, navigation }: Props) {
    const { id } = route.params;
    const { addToCart } = useCart();

    // selectedPizza può essere di tipo Pizza o undefined
    const selectedPizza = PIZZAS.find(pizza => pizza.id === id);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: selectedPizza ? selectedPizza.name : 'Dettagli',
            headerStyle: { backgroundColor: '#F5F5DC' },
            headerTintColor: '#2A2A2A',
        });
    }, [navigation, selectedPizza]);

    // Questo blocco gestisce il caso in cui la pizza non esiste.
    // Dopo questo punto, TypeScript sa che selectedPizza non può essere undefined.
    if (!selectedPizza) {
        return (
            <View style={GlobalStyles.container}>
                <Text style={GlobalStyles.title}>Pizza non trovata!</Text>
            </View>
        );
    }

    // Da qui in poi, `selectedPizza` è sicuramente di tipo `Pizza`.
    const handleAddToCart = () => {
        // La chiamata ora è sicura perché siamo dentro il contesto in cui la pizza esiste.
        addToCart(selectedPizza);
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: `https://picsum.photos/seed/${selectedPizza.id}/400` }}
                style={styles.pizzaImage}
            />

            <Text style={styles.pizzaName}>{selectedPizza.name}</Text>

            <Text style={styles.pizzaDescription}>{selectedPizza.description}</Text>

            <Text style={styles.pizzaPrice}>€ {selectedPizza.price.toFixed(2)}</Text>

            <Pressable onPress={handleAddToCart} style={styles.cartButton}>
                <Text style={GlobalStyles.buttonText}>Aggiungi al Carrello 🛒</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
        justifyContent: 'flex-start',
    },
    pizzaImage: {
        width: 250,
        height: 250,
        borderRadius: 125,
        marginBottom: 24,
        borderWidth: 4,
        borderColor: 'white',
    },
    pizzaName: {
        ...GlobalStyles.title,
        fontSize: 32,
        marginBottom: 8,
    },
    pizzaDescription: {
        ...GlobalStyles.text,
        fontSize: 16,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    pizzaPrice: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF6347',
        marginBottom: 30,
    },
    cartButton: {
        ...GlobalStyles.button,
        flexDirection: 'row',
        gap: 10,
    }
});