// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import RootStack from './navigation/RootStack';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <RootStack />
            </NavigationContainer>
            <StatusBar style="auto" />
        </GestureHandlerRootView>
    );
}