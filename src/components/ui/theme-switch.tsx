import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useThemeSafe } from '@/hooks/use-theme-safe';

/**
 * Toggle simples para alternar entre tema claro e escuro
 */
export function ThemeSwitch() {
  const { theme, themeMode, toggleTheme } = useThemeSafe();
  // Usar theme diretamente do contexto em vez de useColorScheme para garantir reatividade
  const colors = Colors[theme];
  const isDark = theme === 'dark';

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.primary : colors.border,
        },
      ]}
      onPress={handleToggle}
      activeOpacity={0.7}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isDark ? colors.backgroundCard : '#fff',
            transform: [{ translateX: isDark ? 20 : 0 }],
          },
        ]}>
        <MaterialIcons
          name={isDark ? 'nights-stay' : 'wb-sunny'}
          size={18}
          color={isDark ? colors.primary : colors.placeholder}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

