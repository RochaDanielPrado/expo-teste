import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ActivityItem } from '@/components/dashboard/activity-item';
import { StatsCard } from '@/components/dashboard/stats-card';
import { TimeClockCard } from '@/components/dashboard/time-clock-card';
import { WeeklyChart } from '@/components/dashboard/weekly-chart';
import { AppBottomNavigation } from '@/components/navigation';
import { ThemeSwitch } from '@/components/ui/theme-switch';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ActivityItem as ActivityItemType, WeeklySummary } from '@/types/dashboard';

// Mock data - será substituído por dados reais depois
const mockWeeklyData: WeeklySummary[] = [
  { dia: 'Seg', horas: 8, isActive: false },
  { dia: 'Ter', horas: 4.8, isActive: false },
  { dia: 'Qua', horas: 2.4, isToday: true, isActive: true },
  { dia: 'Qui', horas: 0.8, isActive: false },
  { dia: 'Sex', horas: 1.6, isActive: false },
  { dia: 'Sab', horas: 0, isActive: false },
  { dia: 'Dom', horas: 0, isActive: false },
];

const mockActivities: ActivityItemType[] = [
  {
    id: '1',
    tipo: 'entrada',
    titulo: 'Entrada',
    subtitulo: 'Intervalo',
    local: 'Escritório Central',
    hora: '08:00',
    status: 'no-horario',
  },
  {
    id: '2',
    tipo: 'almoco',
    titulo: 'Almoço',
    subtitulo: 'Intervalo',
    hora: '--:--',
    status: 'pendente',
  },
];

export function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState('09:41');
  const [currentDate, setCurrentDate] = useState('Quarta, 12 de Outubro');

  useEffect(() => {
    // Atualizar hora e data
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);

      const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ];
      const dayName = days[now.getDay()];
      const day = now.getDate();
      const month = months[now.getMonth()];
      setCurrentDate(`${dayName}, ${day} de ${month}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Atualizar a cada minuto

    return () => clearInterval(interval);
  }, []);

  const handleRegisterPress = () => {
    // Navegar para registro de ponto ou abrir modal
    router.push('/lancamentos/novo');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor: colors.primary,
                  borderColor: colors.border,
                },
              ]}>
              <MaterialIcons name="person" size={24} color="#fff" />
            </View>
            <View style={[styles.onlineIndicator, { backgroundColor: '#10b981' }]} />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.greeting, { color: colors.placeholder }]}>Bom dia,</Text>
            <Text style={[styles.userName, { color: colors.text }]}>João Silva</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <ThemeSwitch />
          <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
            <MaterialIcons name="notifications" size={24} color={colors.text} />
            <View style={[styles.notificationDot, { backgroundColor: '#ef4444' }]} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Time Clock Card */}
        <TimeClockCard
          currentTime={currentTime}
          currentDate={currentDate}
          isOnline={true}
          lastRecord="Entrada às 08:00"
          onRegisterPress={handleRegisterPress}
        />

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatsCard
            icon="schedule"
            label="Mês Atual"
            value={
              <View style={styles.hoursValue}>
                <Text style={[styles.hoursText, { color: colors.text }]}>120h</Text>
                <Text style={[styles.hoursTotal, { color: colors.placeholder }]}>/ 160h</Text>
              </View>
            }
            progress={75}
          />
          <StatsCard
            icon="account-balance-wallet"
            label="Saldo"
            value="+04:30"
            subtitle="Banco de horas"
            trend="up"
            trendValue="5%"
            valueColor="#10b981"
          />
        </View>

        {/* Weekly Chart */}
        <WeeklyChart data={mockWeeklyData} trend={{ value: '5%', direction: 'up' }} />

        {/* Today's Activities */}
        <View style={styles.activitiesSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Hoje</Text>
            <TouchableOpacity onPress={() => router.push('/lancamentos')} activeOpacity={0.7}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>Ver tudo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activitiesList}>
            {mockActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <AppBottomNavigation />
    </View>
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
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  headerText: {
    gap: 2,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
    borderRadius: 20,
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120, // Espaço para FAB + Bottom Navigation
    gap: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  hoursValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  hoursText: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
  },
  hoursTotal: {
    fontSize: 12,
    marginBottom: 2,
  },
  activitiesSection: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '500',
  },
  activitiesList: {
    gap: 12,
  },
});

