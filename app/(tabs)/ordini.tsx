import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function OrdersScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">I Miei Ordini</ThemedText>
            <ThemedText>Qui vedrai la lista dei tuoi ordini.</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});