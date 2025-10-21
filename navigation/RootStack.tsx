// navigation/RootStack.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constants/theme';
import { useAuth } from '../context/AuthContext'; // Importa useAuth
import AddressModal from '../screens/AddressModal';
import LoginScreen from '../screens/LoginScreen';
import PizzaDetailsScreen from '../screens/PizzaDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MainDrawerNavigator from './MainDrawer';

export type RootStackParamList = {
    MainDrawer: undefined;
    Login: undefined;
    PizzaDetails: { id: string; name: string };
    AddressModal: undefined;
    Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Componente per lo Splash Screen (caricamento)
const SplashScreen = () => (
    <View style={[GlobalStyles.container, styles.splashContainer]}>
        <ActivityIndicator size="large" color={GlobalStyles.button.backgroundColor} />
    </View>
);

export default function RootStack() {
    const { bootstrapped } = useAuth(); // Ottieni lo stato di bootstrap [cite: 96]

    // Mostra uno splash/loader finché lo stato di autenticazione non è caricato (Slide 97)
    if (!bootstrapped) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator initialRouteName="MainDrawer">
            {/* Schermata principale che contiene il Drawer */}
            <Stack.Screen
                name="MainDrawer"
                component={MainDrawerNavigator}
                options={{ headerShown: false }}
            />

            {/* Schermate a schermo intero */}
            <Stack.Screen name="PizzaDetails" component={PizzaDetailsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Impostazioni' }} />

            {/* Gruppo di schermate modali */}
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Accedi o Registrati' }} />
                <Stack.Screen name="AddressModal" component={AddressModal} options={{ title: 'Nuovo Indirizzo' }} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})