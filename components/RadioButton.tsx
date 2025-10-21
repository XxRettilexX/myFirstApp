import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/theme';

interface RadioButtonProps {
    selected: boolean;
    onPress?: () => void;
}

export default function RadioButton({ selected, onPress }: RadioButtonProps) {
    const tintColor = Colors.light.tint;

    return (
        <Pressable style={styles.outerCircle} onPress={onPress}>
            {selected ? (
                <View style={[styles.innerCircle, { backgroundColor: tintColor }]} />
            ) : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    outerCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#666',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: Colors.light.tint,
    },
});