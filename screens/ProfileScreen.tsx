// screens/ProfileScreen.tsx

import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { Order } from '../context/OrderContext';
import { useProfile } from '../context/ProfileContext';
import { ProfileScreenProps } from '../navigation/MainDrawer'; // 👈 Importa le props corrette

// ... (Componente HistoryOrderCard invariato) ...
const HistoryOrderCard = ({ order }: { order: Order }) => (
    <View style={styles.historyCard}>
        <View style={styles.historyHeader}>
            <Text style={styles.historyId}>Ordine #{order.id.slice(-5)}</Text>
            <Text style={styles.historyDate}>{order.date.toLocaleDateString('it-IT')}</Text>
        </View>
        <Text style={styles.historyTotal}>Totale: €{order.total.toFixed(2)}</Text>
    </View>
);

// Usa le nuove props del Drawer
export default function ProfileScreen({ navigation }: ProfileScreenProps) {
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

            <Pressable style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
                <Ionicons name="settings-outline" size={20} color="#fff" />
                <Text style={GlobalStyles.buttonText}>Impostazioni</Text>
            </Pressable>

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

// ... (type Props e gli altri stili rimangono uguali)
const styles = StyleSheet.create({
    settingsButton: {
        ...GlobalStyles.button,
        backgroundColor: '#687076',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    // ...
});