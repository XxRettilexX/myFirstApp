// screens/OrdersScreen.tsx

import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { Order, useOrders } from '../context/OrderContext';
import { useProfile } from '../context/ProfileContext';

// Componente per la card di un singolo ordine
const OrderCard = ({ order }: { order: Order }) => {
    const { removeOrder } = useOrders();
    const { addPaidOrder } = useProfile();
    const { isLoggedIn } = useAuth();

    const handlePayment = () => {
        addPaidOrder(order);
        removeOrder(order.id);

        const pointsEarned = Math.floor(order.total);
        const confirmationMessage = isLoggedIn
            ? `Grazie! Hai guadagnato ${pointsEarned} punti fedeltà.`
            : `Grazie per il tuo ordine! Accedi per accumulare punti in futuro.`;

        Alert.alert("Pagamento Effettuato", confirmationMessage);
    };

    return (
        <View style={styles.orderContainer}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Ordine #{order.id.slice(-5)}</Text>
                <Text style={styles.orderDate}>{order.date.toLocaleDateString('it-IT')}</Text>
            </View>

            {order.items.map(item => (
                <View key={item.id} style={styles.itemContainer}>
                    <Text style={styles.itemName}>{item.name} (x{item.quantity})</Text>
                    <Text style={styles.itemPrice}>€{(item.price * item.quantity).toFixed(2)}</Text>
                </View>
            ))}

            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Totale: €{order.total.toFixed(2)}</Text>
                <Pressable style={styles.payButton} onPress={handlePayment}>
                    <Text style={GlobalStyles.buttonText}>Paga Ora</Text>
                </Pressable>
            </View>
        </View>
    );
};

// Schermata principale
export default function OrdersScreen() {
    const { orders } = useOrders();

    // Hook per eseguire un'azione quando la schermata entra in focus
    useFocusEffect(
        useCallback(() => {
            // In un'app reale, qui faresti una chiamata API per ricaricare gli ordini
            console.log("Schermata Ordini in focus: ricarico i dati...");
            // Ad esempio: fetchOrders();
        }, [])
    );

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>Ordini da Pagare</Text>

            {orders.length === 0 ? (
                <Text style={GlobalStyles.text}>Non hai ordini in sospeso al momento.</Text>
            ) : (
                <FlatList
                    data={orders}
                    renderItem={({ item }) => <OrderCard order={item} />}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                    contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
                />
            )}
        </View>
    );
}

// Stili
const styles = StyleSheet.create({
    list: {
        width: '100%',
    },
    orderContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 8,
        marginBottom: 8,
    },
    orderId: { fontWeight: 'bold', fontSize: 16, color: '#2A2A2A' },
    orderDate: { color: '#666', fontSize: 14 },
    itemContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
    itemName: { fontSize: 16, color: '#444' },
    itemPrice: { fontSize: 16, color: '#444', fontWeight: '500' },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    totalText: { fontSize: 18, fontWeight: 'bold', color: '#2A2A2A' },
    payButton: { ...GlobalStyles.button, paddingVertical: 8, paddingHorizontal: 24 },
});