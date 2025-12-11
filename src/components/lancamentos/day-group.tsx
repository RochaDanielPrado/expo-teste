import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TimeEntryItem } from '@/components/lancamentos/time-entry-item';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DiaLancamentos } from '@/types/lancamentos';

interface DayGroupProps {
  dia: DiaLancamentos;
  onEntryPress?: (lancamentoId: string) => void;
}

export function DayGroup({ dia, onEntryPress }: DayGroupProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const getStatusBadge = () => {
    switch (dia.status) {
      case 'completo':
        return <Badge variant="success">Completo</Badge>;
      case 'pendente':
        return <Badge variant="warning">Pendente</Badge>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.headerText, { color: colors.text }]}>
          {dia.diaSemana ? `${dia.diaSemana}, ${dia.dataFormatada}` : dia.dataFormatada}
        </Text>
        {getStatusBadge()}
      </View>
      <Card style={styles.card}>
        {dia.lancamentos.map((lancamento, index) => (
          <View key={lancamento.id}>
            <TimeEntryItem
              lancamento={lancamento}
              onPress={() => onEntryPress?.(lancamento.id)}
            />
            {index < dia.lancamentos.length - 1 && (
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
            )}
          </View>
        ))}
      </Card>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    marginLeft: 64, // Align with content after icon
  },
  spacer: {
    height: 24,
  },
});

