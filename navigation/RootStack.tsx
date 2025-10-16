// navigation/RootStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import PizzaDetailsScreen from '../screens/PizzaDetailsScreen';
import MainTabs from './MainTabs';

// Definiamo i tipi per le rotte e i loro parametri [cite: 36]
export type RootStackParamList = {
    Login: undefined;
    MainTabs: undefined;
    PizzaDetails: { id: string; name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="PizzaDetails" component={PizzaDetailsScreen} />
        </Stack.Navigator>
    );
}