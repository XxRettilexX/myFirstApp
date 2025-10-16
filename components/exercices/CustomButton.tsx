import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { Alert, Pressable, StyleSheet } from 'react-native';

export function CustomButton() {
    return (
        <Pressable
            onPress={() => Alert.alert('Pulsante premuto!')}
            style={({ pressed }) => [
                styles.buttonBase,
                pressed ? styles.buttonPressed : null,
            ]}
        >
            <ThemedText style={styles.text}>Pulsante Personalizzato</ThemedText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonBase: {
        padding: 14,
        borderRadius: 10,
        backgroundColor: '#2563eb',
        alignItems: 'center',
    },
    buttonPressed: {
        backgroundColor: '#1e40af',
    },
    text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});