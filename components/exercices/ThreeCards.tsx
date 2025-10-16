import { ThemedView } from '@/components/themed-view';
import { StyleSheet, View } from 'react-native';

export function ThreeCards() {
    return (
        <ThemedView style={styles.threeCardsContainer}>
            <View style={[styles.card, { backgroundColor: '#93c5fd' }]} />
            <View style={[styles.card, { backgroundColor: '#60a5fa' }]} />
            <View style={[styles.card, { backgroundColor: '#3b82f6' }]} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    threeCardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        borderRadius: 8,
    },
    card: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
});