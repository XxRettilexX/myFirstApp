// screens/OrdersScreen.tsx

import React, { useMemo } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { Order, useOrders } from '../context/OrderContext';
import { useProfile } from '../context/ProfileContext';

// ====================================================================
// Componente Card per un singolo ordine da pagare (Solo visualizzazione)
// ====================================================================
const OrderCard = ({ order }: { order: Order }) => {

    return (
        <View style={styles.orderContainer}>
            {/* Intestazione con ID e Data */}
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Ordine #{order.id.slice(-5)}</Text>
                <Text style={styles.orderDate}>{order.date.toLocaleDateString('it-IT')}</Text>
            </View>

            {/* Lista degli articoli nell'ordine */}
            {order.items.map(item => (
                <View key={item.id} style={styles.itemContainer}>
                    <Text style={styles.itemName}>{item.name} (x{item.quantity})</Text>
                    <Text style={styles.itemPrice}>€{(item.price * item.quantity).toFixed(2)}</Text>
                </View>
            ))}

            {/* Riepilogo finale con totale */}
            <View style={[styles.totalContainer, { borderTopWidth: 0, marginTop: 4, paddingTop: 4 }]}>
                <Text style={styles.totalText}>Totale Ordine: </Text>
                <Text style={styles.totalPrice}>€{order.total.toFixed(2)}</Text>
            </View>
        </View>
    );
};

// ====================================================================
// Schermata principale con funzione PAGA TUTTO (All You Can Eat)
// ====================================================================
export default function OrdersScreen() {
    const { orders, removeOrder } = useOrders();
    const { addPaidOrder } = useProfile();
    const { isLoggedIn } = useAuth();

    // Calcola il totale complessivo di tutti gli ordini in sospeso
    const grandTotal = useMemo(() => {
        return orders.reduce((sum, order) => sum + order.total, 0);
    }, [orders]);

    const handlePayAll = () => {
        if (orders.length === 0) return;

        const ordersCount = orders.length;
        const totalAmount = grandTotal;
        let totalPointsEarned = 0;

        // Elabora tutti gli ordini e rimuovili
        // Creiamo una copia per iterare mentre mutiamo l'array originale (tramite removeOrder)
        const ordersToProcess = [...orders];

        ordersToProcess.forEach(order => {
            if (isLoggedIn) {
                // Sposta l'ordine nello storico del profilo e calcola i punti
                addPaidOrder(order);
                totalPointsEarned += Math.floor(order.total);
            }
            // Rimuovi l'ordine dalla lista
            removeOrder(order.id);
        });

        // Messaggio di conferma generale
        const confirmationMessage = isLoggedIn
            ? `Grazie per aver pagato ${ordersCount} ordini! Totale: €${totalAmount.toFixed(2)}. Hai guadagnato ${totalPointsEarned} punti fedeltà.`
            : `Grazie per aver pagato ${ordersCount} ordini! Totale: €${totalAmount.toFixed(2)}. Accedi per accumulare punti.`;

        Alert.alert("Pagamento Complessivo Effettuato!", confirmationMessage);
    };


    return (
        <View style={[GlobalStyles.container, { justifyContent: 'flex-start', paddingHorizontal: 0 }]}>
            <Text style={GlobalStyles.title}>Ordini da Pagare</Text>

            {orders.length === 0 ? (
                <Text style={GlobalStyles.text}>Non hai ordini in sospeso al momento.</Text>
            ) : (
                <>
                    <FlatList
                        data={orders}
                        renderItem={({ item }) => <OrderCard order={item} />}
                        keyExtractor={(item) => item.id}
                        style={styles.list}
                        contentContainerStyle={GlobalStyles.listContainer}
                    />

                    {/* Contenitore per il pulsante Paga Tutto */}
                    <View style={styles.payAllContainer}>
                        <Text style={styles.payAllText}>Totale Complessivo:</Text>
                        <Text style={styles.payAllPrice}>€ {grandTotal.toFixed(2)}</Text>
                        <Pressable
                            style={styles.payAllButton}
                            onPress={handlePayAll}
                            disabled={grandTotal === 0}
                        >
                            <Text style={GlobalStyles.buttonText}>Paga Tutto ({orders.length} ordini)</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </View>
    );
}

// ====================================================================
// Stili della schermata
// ====================================================================
const styles = StyleSheet.create({
    list: {
        width: '100%',
        flexGrow: 1,
    },
    orderContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#eee',
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
    orderId: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#2A2A2A',
    },
    orderDate: {
        color: '#666',
        fontSize: 14,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    itemName: {
        fontSize: 16,
        color: '#444',
    },
    itemPrice: {
        fontSize: 16,
        color: '#444',
        fontWeight: '500',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2A2A2A',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6347',
    },
    // Nuovi stili per il pulsante Paga Tutto
    payAllContainer: {
        width: '100%',
        padding: 24,
        backgroundColor: 'white',
        alignItems: 'center',
        borderTopWidth: 2,
        borderTopColor: '#FF6347',
    },
    payAllText: {
        fontSize: 18,
        color: '#2A2A2A',
        marginBottom: 4,
    },
    payAllPrice: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF6347',
        marginBottom: 16,
    },
    payAllButton: {
        ...GlobalStyles.button,
        minWidth: '90%',
    }
});