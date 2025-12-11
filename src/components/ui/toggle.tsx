import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'error';
}

export function Toggle({
  value,
  onValueChange,
  label,
  description,
  icon,
  variant = 'default',
}: ToggleProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const getVariantColors = () => {
    switch (variant) {
      case 'success':
        return {
          iconBg: colorScheme === 'dark' ? '#065f46' : '#d1fae5',
          iconColor: colorScheme === 'dark' ? '#6ee7b7' : '#047857',
        };
      case 'error':
        return {
          iconBg: colorScheme === 'dark' ? '#7f1d1d' : '#fee2e2',
          iconColor: colorScheme === 'dark' ? '#fca5a5' : '#991b1b',
        };
      default:
        return {
          iconBg: colorScheme === 'dark' ? '#1e3a8a' : '#dbeafe',
          iconColor: colorScheme === 'dark' ? '#93c5fd' : '#1e40af',
        };
    }
  };

  const variantColors = getVariantColors();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundCard,
          borderColor: colors.inputBorder,
        },
      ]}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.7}>
      <View style={styles.content}>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: variantColors.iconBg }]}>
            {icon}
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
          {description && (
            <Text style={[styles.description, { color: colors.placeholder }]}>
              {description}
            </Text>
          )}
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor="#fff"
          ios_backgroundColor={colors.border}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
    marginTop: 2,
  },
});

