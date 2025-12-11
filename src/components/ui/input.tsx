import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface InputProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  showPasswordToggle?: boolean;
  error?: string;
}

export function Input({
  label,
  icon,
  showPasswordToggle = false,
  error,
  style,
  secureTextEntry,
  ...props
}: InputProps) {
  const colorScheme = useColorScheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = secureTextEntry && showPasswordToggle;

  const colors = Colors[colorScheme];

  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: colorScheme === 'dark' ? '#92adc9' : '#64748b',
            },
          ]}>
          {label}
        </Text>
      )}
      <View style={styles.inputContainer}>
        {icon && (
          <View style={styles.iconLeft}>
            <MaterialIcons name={icon} size={20} color={colors.placeholder} />
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colorScheme === 'dark' ? '#192633' : colors.backgroundCard,
              borderColor: error ? '#ef4444' : 'transparent',
              borderWidth: error ? 1 : 0,
              color: colors.text,
              paddingLeft: icon ? 44 : 16,
              paddingRight: isPassword ? 44 : 16,
              shadowColor: colorScheme === 'dark' ? 'transparent' : '#000',
              shadowOffset: colorScheme === 'dark' ? { width: 0, height: 0 } : { width: 0, height: 1 },
              shadowOpacity: colorScheme === 'dark' ? 0 : 0.05,
              shadowRadius: colorScheme === 'dark' ? 0 : 2,
              elevation: colorScheme === 'dark' ? 0 : 1,
            },
            style,
          ]}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.iconRight}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}>
            <MaterialIcons
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={20}
              color={colors.placeholder}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[styles.errorText, { color: '#ef4444' }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
    color: '#64748b', // slate-500 for light, will be overridden by theme
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 56,
    borderRadius: 12,
    fontSize: 16,
  },
  iconLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingLeft: 16,
    zIndex: 1,
  },
  iconRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingRight: 16,
    zIndex: 1,
  },
  errorText: {
    fontSize: 12,
    marginLeft: 4,
  },
});

