// screens/SettingsScreen.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { GlobalStyles } from '../constants/theme';

export default function SettingsScreen() {
    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>Impostazioni</Text>
            <Text style={GlobalStyles.text}>Questa è la pagina delle impostazioni.</Text>
        </View>
    );
}