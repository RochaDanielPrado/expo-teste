import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter, usePathname } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface BottomNavigationItem {
  key: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
}

interface BottomNavigationProps {
  items: BottomNavigationItem[];
}

export function BottomNavigation({ items }: BottomNavigationProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (!pathname) return false;
    
    // Verifica se a rota atual corresponde ao item
    if (route === '/(tabs)' || route === '/') {
      return pathname === '/' || pathname.startsWith('/(tabs)');
    }
    
    // Para outras rotas, verifica se começa com a rota
    return pathname.startsWith(route);
  };

  const handlePress = (route: string) => {
    if (route !== pathname) {
      router.push(route as any);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colorScheme === 'dark' ? colors.background : colors.backgroundCard,
          borderTopColor: colors.border,
        },
      ]}>
      {items.map((item) => {
        const active = isActive(item.route);
        return (
          <TouchableOpacity
            key={item.key}
            style={styles.item}
            onPress={() => handlePress(item.route)}
            activeOpacity={0.7}>
            <MaterialIcons
              name={item.icon}
              size={28}
              color={active ? colors.primary : colors.placeholder}
            />
            <Text
              style={[
                styles.label,
                {
                  color: active ? colors.primary : colors.placeholder,
                  fontWeight: active ? '600' : '500',
                },
              ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: 448, // max-w-md equivalent
    alignSelf: 'center',
    width: '100%',
    zIndex: 1000,
    elevation: 24, // Android shadow/elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
  },
});

