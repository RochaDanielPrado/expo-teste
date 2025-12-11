import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Lancamento } from '@/types/lancamentos';

interface TimeEntryItemProps {
  lancamento: Lancamento;
  onPress?: () => void;
}

export function TimeEntryItem({ lancamento, onPress }: TimeEntryItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const getIconConfig = () => {
    switch (lancamento.tipo) {
      case 'entrada':
        return { name: 'login' as const, color: colors.primary };
      case 'saida':
        return { name: 'logout' as const, color: colors.placeholder };
      case 'almoco':
        return { name: 'restaurant' as const, color: '#f97316' };
      case 'retorno':
        return { name: 'restaurant' as const, color: '#f97316', rotate: true };
      case 'faltante':
        return { name: 'warning' as const, color: '#ef4444' };
      default:
        return { name: 'schedule' as const, color: colors.primary };
    }
  };

  const iconConfig = getIconConfig();
  const isFaltante = lancamento.tipo === 'faltante';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isFaltante
            ? colorScheme === 'dark'
              ? '#7f1d1d'
              : '#fee2e2'
            : 'transparent',
        },
        onPress && styles.pressable,
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                colorScheme === 'dark'
                  ? `${iconConfig.color}20`
                  : `${iconConfig.color}10`,
            },
          ]}>
          <MaterialIcons
            name={iconConfig.name}
            size={20}
            color={isFaltante ? '#ef4444' : iconConfig.color}
            style={iconConfig.rotate ? { transform: [{ rotate: '180deg' }] } : undefined}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              {
                color: isFaltante
                  ? colorScheme === 'dark'
                    ? '#fca5a5'
                    : '#991b1b'
                  : colors.text,
                fontWeight: isFaltante ? '700' : '500',
              },
            ]}>
            {lancamento.tipo === 'entrada'
              ? 'Entrada'
              : lancamento.tipo === 'saida'
                ? 'Saída'
                : lancamento.tipo === 'almoco'
                  ? 'Almoço'
                  : lancamento.tipo === 'retorno'
                    ? 'Retorno'
                    : 'Ponto Faltante'}
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: isFaltante
                  ? colorScheme === 'dark'
                    ? '#fca5a5'
                    : '#dc2626'
                  : colors.placeholder,
              },
            ]}>
            {isFaltante ? 'Toque para corrigir' : lancamento.tipoRegistro === 'regular' ? 'Regular' : 'Intervalo'}
          </Text>
        </View>
        <Text
          style={[
            styles.time,
            {
              color: isFaltante
                ? colorScheme === 'dark'
                  ? '#fca5a5'
                  : '#991b1b'
                : colors.text,
            },
          ]}>
          {lancamento.hora || '--:--'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  pressable: {
    // Hover effect handled by activeOpacity
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
});

