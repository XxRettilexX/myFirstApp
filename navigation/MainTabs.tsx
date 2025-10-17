// navigation/MainTabs.tsx

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootStackParamList } from './RootStack';

// --- 1. TIPI PER IL DRAWER NAVIGATOR ---
export type DrawerParamList = {
    Menu: undefined;
    Impostazioni: undefined;
};

// Definiamo le props per le schermate del Drawer
export type HomeDrawerScreenProps = CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, 'Menu'>,
    NativeStackScreenProps<RootStackParamList>
>;


// --- 2. DRAWER NAVIGATOR (Menu Laterale) ---
const Drawer = createDrawerNavigator<DrawerParamList>();

function HomeDrawerNavigator() {
    return (
        <Drawer.Navigator screenOptions={{ headerTitle: "Bella Pizza" }}>
            {/* Il nome della rotta 'Menu' corrisponde a quello in DrawerParamList */}
            <Drawer.Screen name="Menu" component={HomeScreen} />
            <Drawer.Screen name="Impostazioni" component={SettingsScreen} />
        </Drawer.Navigator>
    );
}

// --- 3. TAB NAVIGATOR (Barra in Basso) ---
export type TabsParamList = {
    Home: undefined;
    Orders: undefined;
    Cart: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function MainTabs() {
    const { isLoggedIn } = useAuth();
    const rootNavigation = useNavigation();

    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                // Nasconde l'header del Tab per "Home" per mostrare quello del Drawer
                headerShown: route.name !== 'Home',
                headerTitleAlign: 'center',

                headerRight: () => {
                    if (route.name === 'Cart') return null;
                    return (
                        <Pressable
                            onPress={() => navigation.navigate('Cart')} // Usa la navigation del Tab
                            style={{ marginRight: 15 }}
                        >
                            <Ionicons name="cart" size={24} color="#FF6347" />
                        </Pressable>
                    );
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any = 'home';
                    if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
                    if (route.name === 'Orders') iconName = focused ? 'receipt' : 'receipt-outline';
                    if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
                    if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeDrawerNavigator}
                options={{ title: 'Menu' }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersScreen}
                options={{ title: 'Ordini' }}
                listeners={{
                    tabPress: (e) => {
                        if (!isLoggedIn) {
                            e.preventDefault();
                            rootNavigation.navigate('Login' as never);
                        }
                    },
                }}
            />
            <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'Carrello' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profilo' }} />
        </Tab.Navigator>
    );
}