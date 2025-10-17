// navigation/RootStack.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddressModal from '../screens/AddressModal'; // 👈 IMPORTA LA MODALE
import LoginScreen from '../screens/LoginScreen';
import PizzaDetailsScreen from '../screens/PizzaDetailsScreen';
import MainTabs from './MainTabs';

export type RootStackParamList = {
    MainTabs: undefined;
    Login: undefined;
    PizzaDetails: { id: string; name: string };
    AddressModal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
    return (
        <Stack.Navigator initialRouteName="MainTabs">
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="PizzaDetails" component={PizzaDetailsScreen} />


            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Accedi o Registrati' }} />
                <Stack.Screen name="AddressModal" component={AddressModal} options={{ title: 'Nuovo Indirizzo' }} />
            </Stack.Group>
        </Stack.Navigator>
    );
}