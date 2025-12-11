import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface TimeInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  label?: string;
  value?: string; // formato HH:mm
  onValueChange?: (value: string) => void;
  placeholder?: string;
  editable?: boolean;
}

export function TimeInput({
  label,
  value,
  onValueChange,
  placeholder = '--:--',
  style,
  editable = true,
  ...props
}: TimeInputProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.placeholder }]}>{label}</Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.inputBorder,
              color: colors.text,
            },
            style,
          ]}
          value={value}
          onChangeText={(text) => onValueChange?.(text)}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          keyboardType="numeric"
          editable={editable}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});

