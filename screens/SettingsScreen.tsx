// screens/SettingsScreen.tsx

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import RadioButton from '../components/RadioButton'; // Componente RadioButton (da creare)
import { Collapsible } from '../components/ui/collapsible';
import { Colors, GlobalStyles } from '../constants/theme';
import { useSettings } from '../context/SettingsContext'; // 👈 Importa useSettings

// --- Componente per la selezione del Tema ---
const ThemeSelector = () => {
    const { theme, toggleTheme, currentTheme } = useSettings();
    const isDark = currentTheme === 'dark';

    return (
        <>
            <Text style={styles.sectionText}>Tema App</Text>
            <View style={styles.radioGroup}>
                <Pressable onPress={() => toggleTheme('system')} style={styles.radioItem}>
                    <RadioButton selected={theme === 'system'} />
                    <Text style={styles.radioText}>Sistema</Text>
                </Pressable>
                <Pressable onPress={() => toggleTheme('light')} style={styles.radioItem}>
                    <RadioButton selected={theme === 'light'} />
                    <Text style={styles.radioText}>Chiaro</Text>
                </Pressable>
                <Pressable onPress={() => toggleTheme('dark')} style={styles.radioItem}>
                    <RadioButton selected={theme === 'dark'} />
                    <Text style={styles.radioText}>Scuro</Text>
                </Pressable>
            </View>
        </>
    );
};

// --- Componente per la selezione della Dimensione del Testo ---
const FontSizeSelector = () => {
    const { fontSize, setFontSize } = useSettings();

    return (
        <>
            <Text style={styles.sectionText}>Dimensione del Testo</Text>
            <View style={styles.radioGroup}>
                <Pressable onPress={() => setFontSize('small')} style={styles.radioItem}>
                    <RadioButton selected={fontSize === 'small'} />
                    <Text style={styles.radioText}>Piccolo</Text>
                </Pressable>
                <Pressable onPress={() => setFontSize('medium')} style={styles.radioItem}>
                    <RadioButton selected={fontSize === 'medium'} />
                    <Text style={styles.radioText}>Medio</Text>
                </Pressable>
                <Pressable onPress={() => setFontSize('large')} style={styles.radioItem}>
                    <RadioButton selected={fontSize === 'large'} />
                    <Text style={styles.radioText}>Grande</Text>
                </Pressable>
            </View>
        </>
    );
};


export default function SettingsScreen() {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={GlobalStyles.scrollContainer}>
            <Text style={GlobalStyles.title}>Impostazioni App</Text>

            {/* Sezione Aspetto */}
            <Collapsible title="Aspetto e Accessibilità">
                <View style={styles.collapsibleContent}>
                    <ThemeSelector />
                    <View style={styles.separator} />
                    <FontSizeSelector />
                </View>
            </Collapsible>

            {/* Sezione Preferenze Utente */}
            <Collapsible title="Account e Servizi">
                <View style={styles.collapsibleContent}>
                    <View style={styles.settingItem}>
                        <Text style={styles.settingText}>Notifiche Push</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: Colors.light.tint }}
                            value={true}
                        />
                    </View>
                    <Pressable style={styles.buttonLink} onPress={() => navigation.navigate('AddressModal' as never)}>
                        <Text style={styles.linkText}>Modifica Indirizzo di Consegna</Text>
                        <MaterialIcons name="chevron-right" size={24} color="#687076" />
                    </Pressable>
                </View>
            </Collapsible>

            {/* Sezione Legale */}
            <Collapsible title="Informazioni e Legali">
                <View style={styles.collapsibleContent}>
                    <Pressable style={styles.buttonLink}>
                        <Text style={styles.linkText}>Termini di Servizio</Text>
                        <MaterialIcons name="chevron-right" size={24} color="#687076" />
                    </Pressable>
                    <Pressable style={styles.buttonLink}>
                        <Text style={styles.linkText}>Politica sulla Privacy</Text>
                        <MaterialIcons name="chevron-right" size={24} color="#687076" />
                    </Pressable>
                </View>
            </Collapsible>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    collapsibleContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    settingText: {
        fontSize: 16,
        color: '#2A2A2A',
        fontWeight: '500',
    },
    buttonLink: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    linkText: {
        fontSize: 16,
        color: '#2A2A2A',
    },
    radioGroup: {
        marginTop: 5,
        marginBottom: 10,
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    radioText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#444',
    },
    sectionText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FF6347',
        marginTop: 10,
        marginBottom: 5,
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 10,
    }
});