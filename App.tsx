// App.tsx

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { ProfileProvider } from './context/ProfileContext';
import { SettingsProvider } from './context/SettingsContext'; // 👈 Importa
import RootStack from './navigation/RootStack';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <SettingsProvider> {/* 👈 Nuovo SettingsProvider */}
                    <CartProvider>
                        <OrderProvider>
                            <ProfileProvider>
                                <NavigationContainer>
                                    <RootStack />
                                </NavigationContainer>
                                <StatusBar style="auto" />
                            </ProfileProvider>
                        </OrderProvider>
                    </CartProvider>
                </SettingsProvider>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}