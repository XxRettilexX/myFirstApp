// components/themed-text.tsx

import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { useSettings } from '../context/SettingsContext'; // 👈 Importa useSettings

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  // 👈 CORREZIONE: accesso corretto a FONT_SIZE_MAP
  const { FONT_SIZE_MAP, fontSize } = useSettings();
  const baseSize = FONT_SIZE_MAP[fontSize] || 16; // Dimensione base dinamica

  // Ridefinisco gli stili con la dimensione base dinamica
  const dynamicStyles = StyleSheet.create({
    default: {
      fontSize: baseSize,
      lineHeight: baseSize * 1.5,
    },
    defaultSemiBold: {
      fontSize: baseSize,
      lineHeight: baseSize * 1.5,
      fontWeight: '600',
    },
    title: {
      fontSize: baseSize * 2, // Esempio: 2x la dimensione base
      fontWeight: 'bold',
      lineHeight: baseSize * 2,
    },
    subtitle: {
      fontSize: baseSize * 1.25, // Esempio: 1.25x la dimensione base
      fontWeight: 'bold',
    },
    link: {
      lineHeight: baseSize * 1.5,
      fontSize: baseSize,
      color: '#0a7ea4',
    },
  });

  return (
    <Text
      style={[
        { color },
        type === 'default' ? dynamicStyles.default : undefined,
        type === 'title' ? dynamicStyles.title : undefined,
        type === 'defaultSemiBold' ? dynamicStyles.defaultSemiBold : undefined,
        type === 'subtitle' ? dynamicStyles.subtitle : undefined,
        type === 'link' ? dynamicStyles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}