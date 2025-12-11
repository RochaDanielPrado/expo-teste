import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface StatsCardProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string | React.ReactNode;
  subtitle?: string;
  progress?: number; // 0-100
  trend?: 'up' | 'down';
  trendValue?: string;
  valueColor?: string;
}

export function StatsCard({
  icon,
  label,
  value,
  subtitle,
  progress,
  trend,
  trendValue,
  valueColor,
}: StatsCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundCard || '#233648',
          borderColor: colors.border,
        },
      ]}>
      <View style={styles.header}>
        <MaterialIcons name={icon} size={20} color={colors.placeholder} />
        <Text style={[styles.label, { color: colors.placeholder }]}>{label}</Text>
      </View>

      <View style={styles.content}>
        {typeof value === 'string' ? (
          <View style={styles.valueRow}>
            <Text style={[styles.value, { color: valueColor || colors.text }]}>{value}</Text>
            {trend && trendValue && (
              <View style={[styles.trend, { backgroundColor: trend === 'up' ? '#10b9811A' : '#ef44441A' }]}>
                <MaterialIcons
                  name={trend === 'up' ? 'trending-up' : 'trending-down'}
                  size={14}
                  color={trend === 'up' ? '#10b981' : '#ef4444'}
                />
                <Text style={{ color: trend === 'up' ? '#10b981' : '#ef4444', fontSize: 12, marginLeft: 2 }}>
                  {trendValue}
                </Text>
              </View>
            )}
          </View>
        ) : (
          value
        )}

        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.placeholder }]}>{subtitle}</Text>
        )}

        {progress !== undefined && (
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: colors.primary }]} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  content: {
    gap: 8,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
  },
  trend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  subtitle: {
    fontSize: 12,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});

