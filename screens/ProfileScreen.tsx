// screens/ProfileScreen.tsx

import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../constants/theme';
import { Order } from '../context/OrderContext';
import { DrawerParamList } from '../navigation/MainDrawer';
import { RootStackParamList } from '../navigation/RootStack';

// ... (Componente HistoryOrderCard invariato)
const HistoryOrderCard = ({ order }: { order: Order }) => (
    <View style={styles.historyCard}>
        <View style={styles.historyHeader}>
            <Text style={styles.historyId}>Ordine #{order.id.slice(-5)}</Text>
            <Text style={styles.historyDate}>{order.date.toLocaleDateString('it-IT')}</Text>
        </View>
        <Text style={styles.historyTotal}>Totale: €{order.total.toFixed(2)}</Text>
    </View>
);

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
    // ... (la logica del componente rimane la stessa)
}

type ProfileScreenProps = CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, 'Profile'>,
    NativeStackScreenProps<RootStackParamList>
>;

// 👇 STYLESHEET COMPLETO E CORRETTO
const styles = StyleSheet.create({
    settingsButton: {
        ...GlobalStyles.button,
        backgroundColor: '#687076',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    sectionContainer: {
        width: '100%',
        marginBottom: 24,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#2A2A2A',
        marginBottom: 12,
    },
    pointsText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF6347',
    },
    historyCard: {
        width: '100%',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    historyId: {
        fontWeight: 'bold',
        color: '#333',
    },
    historyDate: {
        color: '#666',
    },
    historyTotal: {
        marginTop: 8,
        fontSize: 16,
        color: '#333',
    },
});