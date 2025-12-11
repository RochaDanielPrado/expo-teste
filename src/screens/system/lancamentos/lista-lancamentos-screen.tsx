import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { DayGroup } from '@/components/lancamentos/day-group';
import { AppBottomNavigation } from '@/components/navigation';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedView } from '@/components/themed-view';
import { DiaLancamentos, ResumoPeriodo } from '@/types/lancamentos';

// Mock data - será substituído por dados reais depois
const mockResumo: ResumoPeriodo = {
  horasTotais: '168h 20m',
  saldoBanco: '+02h 10m',
};

const mockDias: DiaLancamentos[] = [
  {
    data: '2023-10-23',
    dataFormatada: '23 Out',
    diaSemana: 'Hoje',
    status: 'completo',
    lancamentos: [
      {
        id: '1',
        tipo: 'entrada',
        tipoRegistro: 'regular',
        hora: '08:00',
        data: '2023-10-23',
      },
      {
        id: '2',
        tipo: 'almoco',
        tipoRegistro: 'intervalo',
        hora: '12:00',
        data: '2023-10-23',
      },
      {
        id: '3',
        tipo: 'retorno',
        tipoRegistro: 'intervalo',
        hora: '13:00',
        data: '2023-10-23',
      },
      {
        id: '4',
        tipo: 'saida',
        tipoRegistro: 'regular',
        hora: '17:00',
        data: '2023-10-23',
      },
    ],
  },
  {
    data: '2023-10-20',
    dataFormatada: '20 Out',
    diaSemana: 'Sexta',
    status: 'pendente',
    lancamentos: [
      {
        id: '5',
        tipo: 'entrada',
        tipoRegistro: 'regular',
        hora: '08:05',
        data: '2023-10-20',
      },
      {
        id: '6',
        tipo: 'almoco',
        tipoRegistro: 'intervalo',
        hora: '12:10',
        data: '2023-10-20',
      },
      {
        id: '7',
        tipo: 'faltante',
        tipoRegistro: 'regular',
        hora: '',
        data: '2023-10-20',
      },
    ],
  },
];

export function ListaLancamentosScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();

  const handleAddPress = () => {
    router.push('/lancamentos/novo');
  };

  const handleEntryPress = (lancamentoId: string) => {
    // Navegar para edição do lançamento
    router.push(`/lancamentos/${lancamentoId}`);
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colorScheme === 'dark' ? `${colors.background}E6` : `${colors.background}E6`,
            borderBottomColor: colors.border,
          },
        ]}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
          activeOpacity={0.7}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Lançamentos</Text>
        <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
          <Text style={[styles.helpText, { color: colors.primary }]}>Ajuda</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <Card style={styles.periodCard}>
          <View style={styles.periodContent}>
            <View style={styles.periodInfo}>
              <View style={styles.periodRow}>
                <Text style={[styles.periodTitle, { color: colors.text }]}>
                  Outubro 2023
                </Text>
                <MaterialIcons name="expand-more" size={16} color={colors.placeholder} />
              </View>
              <Text style={[styles.periodSubtitle, { color: colors.placeholder }]}>
                Período atual: 01/10 a 31/10
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.filterButton, { backgroundColor: `${colors.primary}1A` }]}
              activeOpacity={0.7}>
              <Text style={[styles.filterButtonText, { color: colors.primary }]}>
                Filtrar
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Stats Summary */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <MaterialIcons name="schedule" size={20} color={colors.primary} />
              <Text style={[styles.statLabel, { color: colors.placeholder }]}>
                HORAS TOTAIS
              </Text>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {mockResumo.horasTotais}
            </Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <MaterialIcons name="account-balance-wallet" size={20} color="#10b981" />
              <Text style={[styles.statLabel, { color: colors.placeholder }]}>
                SALDO BANCO
              </Text>
            </View>
            <Text style={[styles.statValue, { color: '#10b981' }]}>
              {mockResumo.saldoBanco}
            </Text>
          </Card>
        </View>

        {/* Timeline List */}
        <View style={styles.timelineContainer}>
          {mockDias.map((dia) => (
            <DayGroup key={dia.data} dia={dia} onEntryPress={handleEntryPress} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <AppBottomNavigation />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  helpText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120, // Espaço para FAB + Bottom Navigation
    gap: 24,
  },
  periodCard: {
    marginBottom: 0,
  },
  periodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  periodInfo: {
    flex: 1,
    gap: 4,
  },
  periodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  periodTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  periodSubtitle: {
    fontSize: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 84,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    gap: 8,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  timelineContainer: {
    gap: 0,
  },
});

