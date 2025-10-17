// screens/ProfileScreen.tsx

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'; // 👈 IMPORTA ALERT
import { GlobalStyles } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { Order } from '../context/OrderContext'; // 👈 CORREGGI L'IMPORT DI ORDER
import { useProfile } from '../context/ProfileContext';
import { TabsParamList } from '../navigation/MainTabs';
import { RootStackParamList } from '../navigation/RootStack';

// ... (il resto del file rimane identico a prima)
// Componente HistoryOrderCard
const HistoryOrderCard = ({ order }: { order: Order }) => (
    <View style={styles.historyCard}>
        <View style={styles.historyHeader}>
            <Text style={styles.historyId}>Ordine #{order.id.slice(-5)}</Text>
            <Text style={styles.historyDate}>{order.date.toLocaleDateString('it-IT')}</Text>
        </View>
        <Text style={styles.historyTotal}>Totale: €{order.total.toFixed(2)}</Text>
    </View>
);

export default function ProfileScreen({ navigation }: Props) {
    const { isLoggedIn, logout } = useAuth();
    const { profile, clearProfile } = useProfile();

    const handleLogout = () => {
        logout();
        clearProfile();
    };

    if (!isLoggedIn) {
        return (
            <View style={GlobalStyles.container}>
                <Text style={GlobalStyles.title}>Area Personale</Text>
                <Text style={GlobalStyles.text}>
                    Accedi per salvare i tuoi ordini e accumulare punti fedeltà!
                </Text>
                <Pressable style={GlobalStyles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={GlobalStyles.buttonText}>Accedi o Registrati</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>Il Tuo Profilo</Text>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Punti Fedeltà</Text>
                <Text style={styles.pointsText}>{profile.points} Punti 🌟</Text>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Premi</Text>
                <Pressable style={GlobalStyles.button} onPress={() => Alert.alert("Prossimamente!", "La sezione premi sarà presto disponibile.")}>
                    <Text style={GlobalStyles.buttonText}>Riscatta Premi</Text>
                </Pressable>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Storico Ordini</Text>
                {profile.orderHistory.length === 0 ? (
                    <Text style={GlobalStyles.text}>Nessun ordine completato.</Text>
                ) : (
                    profile.orderHistory.map(order => <HistoryOrderCard key={order.id} order={order} />)
                )}
            </View>

            <Pressable onPress={handleLogout} style={[GlobalStyles.logoutButton, { marginTop: 20 }]}>
                <Text style={GlobalStyles.buttonText}>Logout</Text>
            </Pressable>
        </ScrollView>
    );
}

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabsParamList, 'Profile'>,
    NativeStackScreenProps<RootStackParamList>
>;

const styles = StyleSheet.create({
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