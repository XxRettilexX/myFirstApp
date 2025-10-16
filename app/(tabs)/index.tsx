import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const AllInOneScreen = () => {
  // Stati per tutti gli esercizi
  const [searchText, setSearchText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Logica di validazione per l'esercizio del Login
  const isFormValid = email.includes('@') && password.length >= 6;

  const handleLogin = () => {
    if (isFormValid) {
      Alert.alert('Successo', `Login effettuato con: ${email}`);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <Text style={styles.mainTitle}>Esercizi del Giorno 2</Text>

        {/* --- Esercizio 1: Tre Card --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>1. Tre Card in Riga</Text>
          <View style={styles.threeCardsContainer}>
            <View style={[styles.card, { backgroundColor: '#93c5fd' }]} />
            <View style={[styles.card, { backgroundColor: '#60a5fa' }]} />
            <View style={[styles.card, { backgroundColor: '#3b82f6' }]} />
          </View>
        </View>

        {/* --- Esercizio 2: Barra di Ricerca --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>2. Input 'Cerca' con Icona</Text>
          <View style={styles.searchContainer}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149852.png' }}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Cerca..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* --- Esercizio 3: Pulsante Pressable --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>3. Pressable che cambia colore</Text>
          <Pressable
            onPress={() => alert('Pulsante Pressable premuto!')}
            style={({ pressed }) => [
              styles.pressableButton,
              pressed && styles.pressableButtonPressed,
            ]}
          >
            <Text style={styles.pressableButtonText}>Pulsante Personalizzato</Text>
          </Pressable>
        </View>

        {/* --- Esercizio 4: Schermata di Login --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>4. Schermata di Login</Text>
          <View style={styles.loginForm}>
            <TextInput
              style={styles.loginInput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.loginInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Pressable
              onPress={handleLogin}
              disabled={!isFormValid}
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.loginButtonPressed,
                !isFormValid && styles.loginButtonDisabled,
              ]}
            >
              <Text style={styles.pressableButtonText}>Accedi</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Stili unificati per tutti gli esercizi
const styles = StyleSheet.create({
  mainContainer: {
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#334155',
  },
  // Stili Esercizio 1
  threeCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  // Stili Esercizio 2
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  // Stili Esercizio 3
  pressableButton: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#2563eb',
    alignItems: 'center',
  },
  pressableButtonPressed: {
    backgroundColor: '#1e40af',
  },
  pressableButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  // Stili Esercizio 4
  loginForm: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  loginInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  loginButton: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#2563eb',
    alignItems: 'center',
  },
  loginButtonPressed: {
    backgroundColor: '#1e40af',
  },
  loginButtonDisabled: {
    backgroundColor: '#a5b4fc',
  },
});

export default AllInOneScreen;