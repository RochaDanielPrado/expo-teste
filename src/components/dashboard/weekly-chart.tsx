import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { WeeklySummary } from '@/types/dashboard';

interface WeeklyChartProps {
  data: WeeklySummary[];
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
}

export function WeeklyChart({ data, trend }: WeeklyChartProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const maxHeight = Math.max(...data.map((d) => d.horas || 0));

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
        <Text style={[styles.title, { color: colors.text }]}>Resumo Semanal</Text>
        {trend && (
          <View style={[styles.trendBadge, { backgroundColor: '#10b9811A' }]}>
            <Text style={[styles.trendText, { color: '#10b981' }]}>↑ {trend.value}</Text>
          </View>
        )}
      </View>

      <View style={styles.chart}>
        {data.map((item, index) => {
          const height = maxHeight > 0 ? (item.horas / maxHeight) * 100 : 0;
          const isActive = item.isToday || item.isActive;

          return (
            <TouchableOpacity key={index} style={styles.barContainer} activeOpacity={0.7}>
              <View style={[styles.barWrapper, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${height}%`,
                      backgroundColor: isActive ? colors.primary : `${colors.primary}66`,
                      shadowColor: isActive ? colors.primary : 'transparent',
                      shadowOffset: isActive ? { width: 0, height: 0 } : undefined,
                      shadowOpacity: isActive ? 0.5 : undefined,
                      shadowRadius: isActive ? 10 : undefined,
                    },
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.dayLabel,
                  {
                    color: isActive ? colors.primary : colors.placeholder,
                    fontWeight: isActive ? '700' : '500',
                  },
                ]}>
                {item.dia}
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
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trendText: {
    fontSize: 14,
    fontWeight: '500',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 160,
    gap: 8,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  barWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
  },
  dayLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

