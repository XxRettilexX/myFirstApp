// navigation/RootStack.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
// ...altri import...
import LoginScreen from '../screens/LoginScreen';
import PizzaDetailsScreen from '../screens/PizzaDetailsScreen';
import MainTabs from './MainTabs';


export type RootStackParamList = {
    Login: undefined;
    MainTabs: undefined;
    PizzaDetails: { id: string; name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
    return (
        // 👇 Imposta la rotta iniziale sulle schede principali
        <Stack.Navigator initialRouteName="MainTabs">
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
            {/* La schermata di Login ora è presentata come modale per un effetto migliore */}
            <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal', title: 'Accedi o Registrati' }} />
            <Stack.Screen name="PizzaDetails" component={PizzaDetailsScreen} />
        </Stack.Navigator>
    );
}