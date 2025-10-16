
import { Ionicons } from '@expo/vector-icons'; // Usiamo un set di icone standard
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type TabsParamList = {
    Home: undefined;
    Orders: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: 'home' | 'home-outline' | 'receipt' | 'receipt-outline' | 'person' | 'person-outline' = 'home';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Orders') {
                        iconName = focused ? 'receipt' : 'receipt-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Menu' }} />
            <Tab.Screen name="Orders" component={OrdersScreen} options={{ title: 'I Miei Ordini' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}