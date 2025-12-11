import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = 'info' }: BadgeProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: colorScheme === 'dark' ? '#065f46' : '#d1fae5',
          color: colorScheme === 'dark' ? '#6ee7b7' : '#047857',
        };
      case 'warning':
        return {
          backgroundColor: colorScheme === 'dark' ? '#78350f' : '#fef3c7',
          color: colorScheme === 'dark' ? '#fbbf24' : '#92400e',
        };
      case 'error':
        return {
          backgroundColor: colorScheme === 'dark' ? '#7f1d1d' : '#fee2e2',
          color: colorScheme === 'dark' ? '#fca5a5' : '#991b1b',
        };
      default:
        return {
          backgroundColor: colorScheme === 'dark' ? '#1e3a8a' : '#dbeafe',
          color: colorScheme === 'dark' ? '#93c5fd' : '#1e40af',
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <View style={[styles.badge, { backgroundColor: variantStyles.backgroundColor }]}>
      <Text style={[styles.text, { color: variantStyles.color }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});

