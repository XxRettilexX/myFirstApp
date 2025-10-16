import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ScrollView, StyleSheet, View } from 'react-native';

// Importa i nuovi componenti degli esercizi
import { CustomButton } from '../../components/exercices/CustomButton';
import { LoginScreen } from '../../components/exercices/LoginScreen';
import { SearchBar } from '../../components/exercices/SearchBar';
import { ThreeCards } from '../../components/exercices/ThreeCards';

export default function HomeScreen() {
    return (
        <ScrollView style={styles.container}>
            <ThemedView style={styles.mainContent}>
                <ThemedText type="title" style={styles.mainTitle}>
                    Esercizi in Componenti
                </ThemedText>

                {/* Esercizio 1 */}
                <View style={styles.exerciseContainer}>
                    <ThemedText type="subtitle">1. Tre Card</ThemedText>
                    <ThreeCards />
                </View>

                {/* Esercizio 2 */}
                <View style={styles.exerciseContainer}>
                    <ThemedText type="subtitle">2. Barra di Ricerca</ThemedText>
                    <SearchBar />
                </View>

                {/* Esercizio 3 */}
                <View style={styles.exerciseContainer}>
                    <ThemedText type="subtitle">3. Pulsante Pressable</ThemedText>
                    <CustomButton />
                </View>

                {/* Esercizio 4 */}
                <View style={styles.exerciseContainer}>
                    <ThemedText type="subtitle">4. Form di Login</ThemedText>
                    <LoginScreen />
                </View>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContent: {
        padding: 24,
        gap: 24, // Aggiunge spazio tra le sezioni degli esercizi
    },
    mainTitle: {
        textAlign: 'center',
        marginBottom: 16,
    },
    exerciseContainer: {
        gap: 12, // Aggiunge spazio tra il titolo dell'esercizio e il componente
    },
});