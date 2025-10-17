// navigation/MainDrawer.tsx

import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable } from 'react-native';

import { useAuth } from '../context/AuthContext';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RootStackParamList } from './RootStack';


export type TabParamList = {
    Home: undefined;
    Orders: undefined;
    Cart: undefined;
};


export type DrawerParamList = {
    Pizzeria: undefined; // Questa rotta conterrà il Tab Navigator
    Profile: undefined;
};

// Tipi compositi per le props delle schermate
export type HomeScreenProps = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'Home'>,
    DrawerScreenProps<DrawerParamList> & NativeStackScreenProps<RootStackParamList>
>;

export type ProfileScreenProps = CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, 'Profile'>,
    NativeStackScreenProps<RootStackParamList>
>;


// --- COMPONENTE TAB NAVIGATOR ---
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
    const { isLoggedIn } = useAuth();
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerTitleAlign: 'center',
                headerRight: () => {
                    if (route.name === 'Cart') return null;
                    return (
                        <Pressable onPress={() => navigation.navigate('Cart' as never)} style={{ marginRight: 15 }}>
                            <Ionicons name="cart" size={24} color="#FF6347" />
                        </Pressable>
                    );
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any = 'home';
                    if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
                    if (route.name === 'Orders') iconName = focused ? 'receipt' : 'receipt-outline';
                    if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Menu' }} />
            <Tab.Screen
                name="Orders"
                component={OrdersScreen}
                options={{ title: 'Ordini' }}
                listeners={{
                    tabPress: (e) => {
                        if (!isLoggedIn) {
                            e.preventDefault();
                            navigation.navigate('Login' as never);
                        }
                    },
                }}
            />
            <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'Carrello' }} />
        </Tab.Navigator>
    );
}


// --- COMPONENTE DRAWER NAVIGATOR (PRINCIPALE) ---
const Drawer = createDrawerNavigator<DrawerParamList>();

export default function MainDrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Pizzeria"
                component={TabNavigator}
                options={{ title: 'Bella Pizza', headerShown: false }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Il Mio Profilo' }}
            />
        </Drawer.Navigator>
    );
}