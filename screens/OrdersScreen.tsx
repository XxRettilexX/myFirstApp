// screens/OrdersScreen.tsx

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function OrdersScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>I Miei Ordini</Text>
            <Text>Qui vedrai la lista dei tuoi ordini.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    }
});