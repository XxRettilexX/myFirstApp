// app/(tabs)/index.tsx

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Menu Pizze</ThemedText>

      <Link
        href={{
          pathname: "/pizzadetails",
          params: { id: 'marg-001', name: 'Margherita' }
        }}
        asChild
      >
        <Pressable style={styles.pizzaButton}>
          <ThemedText style={styles.pizzaText}>Vai ai dettagli della Margherita</ThemedText>
        </Pressable>
      </Link>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  pizzaButton: {
    backgroundColor: '#0a7ea4',
    padding: 14,
    borderRadius: 8,
  },
  pizzaText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});