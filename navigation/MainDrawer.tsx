// navigation/MainDrawer.tsx

import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer';

import { CompositeScreenProps, getFocusedRouteNameFromRoute, NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RootStackParamList } from './RootStack';


// --- DEFINIZIONI DI TIPO (Esportate per uso esterno) ---

export type TabParamList = {
    Home: undefined;
    Orders: undefined;
    Cart: undefined;
};

// Il Drawer 'Pizzeria' ora accetta parametri per la navigazione annidata
export type DrawerParamList = {
    Pizzeria: { screen: keyof TabParamList } | undefined;
    Profile: undefined;
};

// Tipi compositi per le props delle schermate (Usati da HomeScreen, ProfileScreen)
export type HomeScreenProps = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'Home'>,
    DrawerScreenProps<DrawerParamList> & NativeStackScreenProps<RootStackParamList>
>;

// CORREZIONE: Corretto 'CompositeScreenScreenProps' in 'CompositeScreenProps'
export type ProfileScreenProps = CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, 'Profile'>,
    NativeStackScreenProps<RootStackParamList>
>;

// Tipo specifico per la navigazione del Drawer
type DrawerNavProp = DrawerNavigationProp<DrawerParamList>;
// Tipo che copre sia Stack (Root) che Drawer (per i pulsanti che navigano esternamente)
type FullNavProp = NavigationProp<RootStackParamList & DrawerParamList & TabParamList>;


// --- COMPONENTE BADGE PER IL CARRELLO ---
const CartBadge = ({ color, size }: { color: string, size: number }) => {
    const { itemsCount } = useCart();
    const iconName: 'cart' | 'cart-outline' = itemsCount > 0 ? 'cart' : 'cart-outline';

    return (
        <View style={styles.cartIconContainer}>
            <Ionicons name={iconName} size={size} color={color} />
            {itemsCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{itemsCount > 99 ? '99+' : itemsCount}</Text>
                </View>
            )}
        </View>
    );
};


// --- Componente Drawer Button Dinamico (mostra Indietro, Menu o Titolo) ---
const DynamicDrawerButton = () => {
    const navigation = useNavigation<DrawerNavProp & FullNavProp>();
    const route = useRoute();

    // Tentativo di estrarre il nome della rotta focalizzata all'interno del Navigatore
    const focusedRouteName = getFocusedRouteNameFromRoute(route);

    let routeName = route.name;

    // Se siamo in un Tab Navigator annidato (come 'Pizzeria'), usiamo il nome del Tab attivo
    if (routeName === 'Pizzeria' && focusedRouteName) {
        // Se il Tab attivo è un nome valido, lo usiamo come nome di rotta
        if (typeof focusedRouteName === 'string') {
            routeName = focusedRouteName;
        }
    }

    const canGoBack = navigation.canGoBack();
    // Le rotte principali sono quelle di livello superiore che non dovrebbero mostrare 'Indietro'
    const isMainTab = ['Pizzeria', 'Home', 'Orders', 'Cart', 'Profile'].includes(routeName);

    // Se può tornare indietro E non è una delle rotte principali del Drawer/Tab
    if (canGoBack && !isMainTab) {
        // Logica Indietro per schermi esterni allo stack del Tab Navigator (es. PizzaDetails, Settings)
        return (
            <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="chevron-back" size={24} color="#FF6347" />
                <Text style={{ color: '#FF6347', fontSize: 16 }}>Indietro</Text>
            </Pressable>
        );
    }

    // Altrimenti, pulsante Drawer (Menu)
    // Usiamo il titolo della rotta corrente o una versione friendly
    let displayTitle = routeName;
    if (routeName === 'Pizzeria' || routeName === 'Home') displayTitle = 'Menu';
    if (routeName === 'Profile') displayTitle = 'Profilo';
    if (routeName === 'Orders') displayTitle = 'Ordini';
    if (routeName === 'Cart') displayTitle = 'Carrello';

    return (
        <Pressable onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="menu" size={24} color="#FF6347" />
            <Text style={{ color: '#FF6347', fontSize: 16, marginLeft: 8 }}>{displayTitle}</Text>
        </Pressable>
    );
};


// --- COMPONENTE TAB NAVIGATOR ---
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
    const { isLoggedIn } = useAuth();
    // Tipizzato con FullNavProp per navigare verso 'Login' nel RootStack
    const navigation = useNavigation<FullNavProp>();

    // Funzione di navigazione per il carrello
    const navigateToCart = () => {
        // Naviga alla rotta Drawer ('Pizzeria') e gli dice di mostrare la screen 'Cart' (il Tab)
        navigation.navigate('Pizzeria', { screen: 'Cart' });
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerTitleAlign: 'center',
                headerLeft: () => <DynamicDrawerButton />,
                headerRight: () => {
                    return (
                        <Pressable onPress={navigateToCart} style={{ marginRight: 15 }}>
                            <CartBadge color="#FF6347" size={24} />
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
                            navigation.navigate('Login');
                        }
                    },
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    title: 'Carrello',
                    headerRight: () => null,
                }}
            />
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
                options={{
                    title: 'Bella Pizza',
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen as unknown as React.ComponentType<any>}
                options={{
                    title: 'Il Mio Profilo',
                    headerLeft: () => <DynamicDrawerButton />
                }}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    cartIconContainer: {
        position: 'relative',
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        position: 'absolute',
        right: -8,
        top: -4,
        backgroundColor: '#d9534f',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        zIndex: 10,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
