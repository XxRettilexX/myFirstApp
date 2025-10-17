// screens/CartScreen.tsx

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../constants/theme';
import { CartItem, useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext'; // 👈 Importa l'hook degli ordini

export default function CartScreen() {
    const { items, clearCart } = useCart();
    const { addOrder } = useOrders();
    const navigation = useNavigation();

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePlaceOrder = () => {
        // 1. Aggiungi l'ordine al contesto degli ordini
        addOrder(items, total);
        // 2. Svuota il carrello
        clearCart();
        // 3. Mostra un messaggio di conferma
        Alert.alert(
            "Ordine Confermato!",
            "Il tuo ordine è stato ricevuto e lo stiamo preparando.",
            [{ text: "OK", onPress: () => navigation.navigate('Orders' as never) }] // Naviga alla schermata Ordini
        );
    };

    const renderItem = ({ item }: { item: CartItem }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name} (x{item.quantity})</Text>
            <Text style={styles.itemPrice}>€ {(item.price * item.quantity).toFixed(2)}</Text>
        </View>
    );

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>Il Mio Carrello</Text>
            {items.length === 0 ? (
                <Text style={GlobalStyles.text}>Il tuo carrello è vuoto.</Text>
            ) : (
                <>
                    <FlatList
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        style={styles.list}
                    />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Totale:</Text>
                        <Text style={styles.totalPrice}>€ {total.toFixed(2)}</Text>
                    </View>
                    {/* 👇 AGGIUNGI IL PULSANTE PER EFFETTUARE L'ORDINE */}
                    <Pressable style={GlobalStyles.button} onPress={handlePlaceOrder}>
                        <Text style={GlobalStyles.buttonText}>Ordina Ora</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
}

// ... (gli stili rimangono gli stessi)
const styles = StyleSheet.create({
    list: { width: '100%' },
    itemContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    itemName: { fontSize: 18, color: '#2A2A2A' },
    itemPrice: { fontSize: 18, fontWeight: 'bold', color: '#2A2A2A' },
    totalContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20, paddingTop: 10, borderTopWidth: 2, borderTopColor: '#333' },
    totalText: { fontSize: 22, fontWeight: 'bold', color: '#2A2A2A' },
    totalPrice: { fontSize: 22, fontWeight: 'bold', color: '#FF6347' },
});