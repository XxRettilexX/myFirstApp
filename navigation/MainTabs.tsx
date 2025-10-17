// navigation/MainTabs.tsx

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from '../screens/CartScreen'; // 👈 Importa la nuova schermata
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type TabsParamList = {
    Home: undefined;
    Orders: undefined;
    Cart: undefined; // 👈 Aggiungi il tipo per la nuova rotta
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any = 'home';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Orders') {
                        iconName = focused ? 'receipt' : 'receipt-outline';
                    } else if (route.name === 'Cart') { // 👈 Aggiungi l'icona per il carrello
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Menu' }} />
            <Tab.Screen name="Orders" component={OrdersScreen} options={{ title: 'Ordini' }} />
            {/* 👇 Aggiungi la nuova scheda del carrello */}
            <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'Carrello' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}