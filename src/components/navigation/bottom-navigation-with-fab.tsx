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

interface BottomNavigationWithFabProps {
  items: BottomNavigationItem[];
  fabItem?: {
    key: string;
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
  };
}

export function BottomNavigationWithFab({ items, fabItem }: BottomNavigationWithFabProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (!pathname) return false;

    if (route === '/(tabs)' || route === '/') {
      return pathname === '/' || pathname.startsWith('/(tabs)');
    }

    return pathname.startsWith(route);
  };

  const handlePress = (route: string) => {
    if (route !== pathname) {
      router.push(route as any);
    }
  };

  // Dividir items em dois grupos (antes e depois do FAB)
  // Assumindo 4 items totais: 2 à esquerda, FAB no centro, 2 à direita
  const leftItems = items.slice(0, 2);
  const rightItems = items.slice(2, 4);

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
      <View style={styles.navContent}>
        {/* Left Items */}
        {leftItems.map((item) => {
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

        {/* FAB Button */}
        {fabItem && (
          <View style={styles.fabContainer}>
            <TouchableOpacity
              style={[
                styles.fab,
                {
                  backgroundColor: colors.primary,
                  borderColor: colorScheme === 'dark' ? colors.background : colors.backgroundCard,
                },
              ]}
              onPress={fabItem.onPress}
              activeOpacity={0.8}>
              <MaterialIcons name={fabItem.icon} size={32} color="#fff" />
            </TouchableOpacity>
            <Text style={[styles.fabLabel, { color: colors.placeholder }]}>{fabItem.label}</Text>
          </View>
        )}

        {/* Right Items */}
        {rightItems.map((item) => {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 40, // Mais espaço para o FAB elevado
    maxWidth: 448,
    alignSelf: 'center',
    width: '100%',
    zIndex: 1000,
    elevation: 24, // Android shadow/elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
    position: 'relative',
    height: 64,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingTop: 8,
    maxWidth: 80,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
  },
  fabContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    width: 80,
    marginHorizontal: 4,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    shadowColor: '#137fec',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    marginTop: -24, // Eleva o botão acima da barra
  },
  fabLabel: {
    fontSize: 10,
    fontWeight: '700',
    position: 'absolute',
    bottom: -16,
    textAlign: 'center',
  },
});

