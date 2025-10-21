// components/ui/collapsible.tsx
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native'; // Importato View

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  // Usiamo View invece di ThemedView per il componente principale per non impattare lo sfondo della ScrollView
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={{
            transform: [{ rotate: isOpen ? '90deg' : '0deg' }],
            // Aggiusto la transizione per farla apparire sul testo
            marginRight: 6,
          }}
        />

        <ThemedText type="subtitle" style={styles.titleText}>{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    marginBottom: 20, // Spazio tra le sezioni
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'transparent', // Lascia lo sfondo trasparente
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    // Il contenuto interno (ad esempio, SettingScreen) gestirà il suo styling di sfondo
    marginTop: 6,
    paddingHorizontal: 10,
  },
});