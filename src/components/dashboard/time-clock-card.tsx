import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface TimeClockCardProps {
  currentTime: string;
  currentDate: string;
  isOnline: boolean;
  lastRecord?: string;
  onRegisterPress: () => void;
}

export function TimeClockCard({
  currentTime,
  currentDate,
  isOnline,
  lastRecord,
  onRegisterPress,
}: TimeClockCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundCard || '#192633',
          borderColor: colors.border,
        },
      ]}>
      {/* Background Decoration */}
      <View style={[styles.decoration, { backgroundColor: `${colors.primary}1A` }]} />

      <View style={styles.content}>
        {/* Online Badge */}
        {isOnline && (
          <View style={[styles.onlineBadge, { backgroundColor: '#10b9811A', borderColor: '#10b98133' }]}>
            <View style={[styles.onlineDot, { backgroundColor: '#10b981' }]} />
            <Text style={[styles.onlineText, { color: '#10b981' }]}>Online</Text>
          </View>
        )}

        {/* Time Display */}
        <Text style={[styles.time, { color: colors.text }]}>{currentTime}</Text>

        {/* Date */}
        <Text style={[styles.date, { color: colors.placeholder }]}>{currentDate}</Text>

        {/* Register Button */}
        <View style={styles.buttonContainer}>
          <Button icon="fingerprint" iconPosition="left" onPress={onRegisterPress} fullWidth>
            Registrar Ponto
          </Button>
        </View>

        {/* Last Record */}
        {lastRecord && (
          <Text style={[styles.lastRecord, { color: colors.placeholder }]}>
            Último registro: <Text style={{ color: colors.text }}>{lastRecord}</Text>
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#137fec',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  decoration: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 128,
    height: 128,
    borderRadius: 64,
    opacity: 0.3,
  },
  content: {
    padding: 24,
    alignItems: 'center',
    gap: 4,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  onlineText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  time: {
    fontSize: 56,
    fontWeight: '700',
    letterSpacing: -2,
    fontFamily: 'monospace',
  },
  date: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 24,
  },
  lastRecord: {
    fontSize: 12,
    marginTop: 12,
    textAlign: 'center',
  },
});

