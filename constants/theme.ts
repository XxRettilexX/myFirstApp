// constants/theme.ts

import { Platform, StyleSheet } from 'react-native';

// Nuova Palette "Bella Pizza"
const tintColorLight = '#FF6347'; // Rosso Pomodoro
const tintColorDark = '#FF6347';

export const Colors = {
  light: {
    text: '#2A2A2A', // Grigio Scuro
    background: '#F5F5DC', // Beige
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#E5E5E5', // Bianco Sporco
    background: '#2A3439', // Ardesia
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

// Stili Globali Rutilizzabili
export const GlobalStyles = StyleSheet.create({
  // Contenitore base per le schermate
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    padding: 24,
    gap: 20,
  },
  // Stile per i titoli principali delle schermate
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  // Stile per il testo generico
  text: {
    fontSize: 18,
    color: Colors.light.text,
    textAlign: 'center',
  },
  // Stile per i pulsanti primari
  button: {
    backgroundColor: Colors.light.tint, // Usa il colore primario del tema
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: '60%',
  },
  // Stile per il testo dei pulsanti
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Stile specifico per il pulsante di Logout (opzionale)
  logoutButton: {
    backgroundColor: '#d9534f', // Un rosso più scuro per 'pericolo'
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: '60%',
  }
});

// (Il codice dei Fonts rimane invariato)
export const Fonts = Platform.select({
  ios: { sans: 'system-ui', serif: 'ui-serif', rounded: 'ui-rounded', mono: 'ui-monospace' },
  default: { sans: 'normal', serif: 'serif', rounded: 'normal', mono: 'monospace' },
  web: { sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", serif: "Georgia, 'Times New Roman', serif", rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif", mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" },
});