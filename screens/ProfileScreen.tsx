// screens/ProfileScreen.tsx

import { DrawerScreenProps } from '@react-navigation/drawer';
import { CommonActions, CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { Order } from '../context/OrderContext';
import { useProfile } from '../context/ProfileContext';
import { DrawerParamList } from '../navigation/MainDrawer';
import { RootStackParamList } from '../navigation/RootStack';

// Tipi per le props della schermata
type ProfileScreenProps = CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, 'Profile'>,
    NativeStackScreenProps<RootStackParamList>
>;

// Componente Card Ordine per la cronologia (invariato)
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
    const { isLoggedIn, logout, user } = useAuth(); // Ottieni stato e logout
    const { profile, clearProfile } = useProfile();
    const rootNavigation = useNavigation();

    // 1. Funzione per navigare alla schermata di login/impostazioni
    const handleLoginPress = () => {
        // Naviga al Login modale definito in RootStack
        rootNavigation.navigate('Login' as never);
    };

    const handleSettingsPress = () => {
        // Naviga a Settings, definito in RootStack
        rootNavigation.navigate('Settings' as never);
    };

    // 2. Funzione di Logout (Slide 249-251)
    const handleLogout = useCallback(() => {
        Alert.alert(
            "Logout",
            "Sei sicuro di voler effettuare il logout?",
            [
                { text: "Annulla", style: "cancel" },
                {
                    text: "Logout",
                    onPress: async () => {
                        // Rimuovi dati di autenticazione e pulisci il profilo (Slide 250)
                        await logout();
                        clearProfile();

                        // Resetta lo stack di navigazione al Login (Slide 251)
                        rootNavigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            })
                        );
                    }
                }
            ]
        );
    }, [logout, clearProfile, rootNavigation]);


    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>Il Mio Profilo</Text>

            {isLoggedIn ? (
                // LOGGATO
                <View style={styles.sectionContainer}>
                    <Text style={GlobalStyles.text}>Benvenuto, {user?.email ?? 'Utente'}</Text>

                    <Pressable style={styles.settingsButton} onPress={handleSettingsPress}>
                        <Text style={GlobalStyles.buttonText}>Impostazioni</Text>
                    </Pressable>

                    <Text style={styles.sectionTitle}>Punti Fedeltà</Text>
                    <Text style={styles.pointsText}>{profile.points} punti</Text>

                    <Pressable style={GlobalStyles.logoutButton} onPress={handleLogout}>
                        <Text style={GlobalStyles.buttonText}>Logout</Text>
                    </Pressable>

                    <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Cronologia Ordini</Text>
                    {profile.orderHistory.length > 0 ? (
                        <FlatList
                            data={profile.orderHistory}
                            renderItem={({ item }) => <HistoryOrderCard order={item} />}
                            keyExtractor={(item) => item.id}
                            style={{ width: '100%', maxHeight: 200, paddingVertical: 10 }}
                            contentContainerStyle={{ gap: 8 }}
                        />
                    ) : (
                        <Text style={GlobalStyles.text}>Nessun ordine completato.</Text>
                    )}
                </View>
            ) : (
                // NON LOGGATO
                <View style={styles.sectionContainer}>
                    <Text style={GlobalStyles.text}>Accedi per vedere il tuo profilo e la cronologia ordini.</Text>
                    <Pressable style={GlobalStyles.button} onPress={handleLoginPress}>
                        <Text style={GlobalStyles.buttonText}>Accedi / Registrati</Text>
                    </Pressable>
                </View>
            )}

            <Pressable style={GlobalStyles.button} onPress={() => rootNavigation.navigate('AddressModal' as never)}>
                <Text style={GlobalStyles.buttonText}>Aggiungi Indirizzo (Modal)</Text>
            </Pressable>
        </View>
    );
}


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