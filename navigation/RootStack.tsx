// navigation/RootStack.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddressModal from '../screens/AddressModal';
import LoginScreen from '../screens/LoginScreen';
import PizzaDetailsScreen from '../screens/PizzaDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen'; // 👈 Importa la nuova schermata
import MainDrawerNavigator from './MainDrawer'; // Rinominiamo per chiarezza

export type RootStackParamList = {
    MainDrawer: undefined; // Conterrà Drawer e Tabs
    Login: undefined;
    PizzaDetails: { id: string; name: string };
    AddressModal: undefined;
    Settings: undefined; // 👈 Aggiungi la rotta per le impostazioni
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
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