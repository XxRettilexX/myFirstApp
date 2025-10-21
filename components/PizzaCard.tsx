import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { Pizza } from '../data/pizzas';
import { RootStackParamList } from '../navigation/RootStack'; // 👈 Importa i tipi di navigazione

// Definisco un tipo specifico per la navigazione necessaria in questo componente
type PizzaDetailsNavProp = NativeStackNavigationProp<RootStackParamList, 'PizzaDetails'>;

interface PizzaCardProps {
    pizza: Pizza;
}

export function PizzaCard({ pizza }: PizzaCardProps) {
    // Tipizzo useNavigation in modo che conosca le rotte del RootStack
    const navigation = useNavigation<PizzaDetailsNavProp>();
    const { addToCart } = useCart();

    const handleDetailsPress = () => {
        // Ora TypeScript sa che 'PizzaDetails' è una rotta che accetta { id: string, name: string }
        navigation.navigate('PizzaDetails', { id: pizza.id, name: pizza.name });
    };

    const handleAddToCart = () => {
        // Aggiunge la pizza al carrello
        addToCart(pizza);
    };

    return (
        <Pressable style={styles.cardContainer} onPress={handleDetailsPress}>
            {/* Immagine */}
            <Image
                source={{ uri: `https://picsum.photos/seed/${pizza.id}/200` }}
                style={styles.image}
            />
            <View style={styles.contentContainer}>
                {/* Dettagli */}
                <View style={styles.details}>
                    <Text style={styles.title}>{pizza.name}</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        {pizza.description}
                    </Text>
                </View>

                {/* Prezzo e Pulsante Carrello */}
                <View style={styles.footer}>
                    <Text style={styles.price}>€ {pizza.price.toFixed(2)}</Text>
                    <Pressable style={styles.addButton} onPress={handleAddToCart}>
                        <Ionicons name="add" size={24} color="white" />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        // Ombre (miglioramento grafico)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 120,
        height: 120,
        backgroundColor: '#eee',
    },
    contentContainer: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    details: {
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2A2A2A',
    },
    description: {
        fontSize: 14,
        color: '#687076',
        marginTop: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF6347',
    },
    addButton: {
        backgroundColor: '#FF6347',
        borderRadius: 8,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
    },
});