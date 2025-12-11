import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Componente para alternar entre temas light, dark e system
 */
export function ThemeToggle() {
  const { theme, themeMode, setThemeMode } = useTheme();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const options: Array<{ mode: 'light' | 'dark' | 'system'; label: string; icon: keyof typeof MaterialIcons.glyphMap }> = [
    { mode: 'light', label: 'Claro', icon: 'wb-sunny' },
    { mode: 'dark', label: 'Escuro', icon: 'nights-stay' },
    { mode: 'system', label: 'Sistema', icon: 'brightness-6' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
      <Text style={[styles.label, { color: colors.text }]}>Tema</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const isActive = themeMode === option.mode;
          return (
            <TouchableOpacity
              key={option.mode}
              style={[
                styles.option,
                isActive && { backgroundColor: colors.primary + '20', borderColor: colors.primary },
                { borderColor: colors.border },
              ]}
              onPress={() => setThemeMode(option.mode)}
              activeOpacity={0.7}>
              <MaterialIcons
                name={option.icon}
                size={20}
                color={isActive ? colors.primary : colors.placeholder}
              />
              <Text
                style={[
                  styles.optionLabel,
                  { color: isActive ? colors.primary : colors.placeholder },
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
});

