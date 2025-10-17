// App.tsx

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { AuthProvider } from './context/AuthContext'; // 👈 IMPORTA
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { ProfileProvider } from './context/ProfileContext';
import RootStack from './navigation/RootStack';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider> {/* 👈 AuthProvider all'esterno di tutto */}
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
            </AuthProvider>
        </GestureHandlerRootView>
    );
}