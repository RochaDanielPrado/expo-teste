import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ActivityItem as ActivityItemType } from '@/types/dashboard';

interface ActivityItemProps {
  activity: ActivityItemType;
  onPress?: () => void;
}

export function ActivityItem({ activity, onPress }: ActivityItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const getIconConfig = () => {
    switch (activity.tipo) {
      case 'entrada':
        return { name: 'login' as const, color: colors.primary };
      case 'saida':
        return { name: 'logout' as const, color: colors.placeholder };
      case 'almoco':
        return { name: 'restaurant' as const, color: '#f97316' };
      case 'retorno':
        return { name: 'restaurant' as const, color: '#f97316' };
      default:
        return { name: 'schedule' as const, color: colors.primary };
    }
  };

  const getStatusColor = () => {
    switch (activity.status) {
      case 'no-horario':
        return '#10b981';
      case 'atrasado':
        return '#ef4444';
      case 'pendente':
        return colors.placeholder;
      default:
        return colors.placeholder;
    }
  };

  const getStatusText = () => {
    switch (activity.status) {
      case 'no-horario':
        return 'No horário';
      case 'atrasado':
        return 'Atrasado';
      case 'pendente':
        return 'Pendente';
      default:
        return '';
    }
  };

  const iconConfig = getIconConfig();
  const statusColor = getStatusColor();
  const isPending = activity.status === 'pendente';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundCard || '#233648',
          borderColor: colors.border,
          opacity: isPending ? 0.6 : 1,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: colorScheme === 'dark' ? `${iconConfig.color}1A` : `${iconConfig.color}10`,
          },
        ]}>
        <MaterialIcons name={iconConfig.name} size={20} color={iconConfig.color} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{activity.titulo}</Text>
        <Text style={[styles.subtitle, { color: colors.placeholder }]}>
          {activity.local || activity.subtitulo}
        </Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={[styles.time, { color: colors.text }]}>{activity.hora}</Text>
        <Text style={[styles.status, { color: statusColor }]}>{getStatusText()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
  },
  timeContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  time: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  status: {
    fontSize: 10,
    fontWeight: '500',
  },
});

