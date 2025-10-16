// app/(tabs)/pizzadetails.tsx

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function PizzaDetailsScreen() {
    const { id, name } = useLocalSearchParams<{ id: string, name: string }>();

    return (
        <ThemedView style={styles.container}>
            {/* Usiamo Stack.Screen per personalizzare l'header di questa pagina */}
            <Stack.Screen options={{ title: name || 'Dettagli' }} />
            <ThemedText type="title">Dettagli Pizza</ThemedText>
            <ThemedText style={styles.text}>
                Hai selezionato la pizza {name} (ID: {id})
            </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        marginTop: 16,
        fontSize: 18,
    },
});