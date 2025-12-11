import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TimeInput } from '@/components/ui/time-input';
import { Toggle } from '@/components/ui/toggle';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedView } from '@/components/themed-view';
import { FormLancamento } from '@/types/lancamentos';

export function FormLancamentoScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();

  const [form, setForm] = useState<FormLancamento>({
    dataRegistro: '24/10/2023',
    primeiroTurno: {
      entrada: '08:00',
      saida: '12:00',
    },
    intervalo: {
      inicio: '12:00',
      fim: '13:00',
    },
    segundoTurno: {
      entrada: '',
      saida: '',
    },
    isDiaria: false,
    isFalta: false,
  });

  const handleSave = () => {
    // Lógica de salvamento será implementada depois
    console.log('Salvando lançamento:', form);
    router.back();
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Lançamento de Ponto
        </Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileContent}>
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor: colors.primary,
                  borderColor: colors.border,
                },
              ]}>
              <MaterialIcons name="person" size={32} color="#fff" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>João Silva</Text>
              <View style={styles.profilePeriod}>
                <MaterialIcons name="date-range" size={16} color={colors.primary} />
                <Text style={[styles.profilePeriodText, { color: colors.placeholder }]}>
                  Período: 01/10 - 31/10
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Date Field */}
        <View style={styles.section}>
          <Input
            label="Data do Registro"
            icon="event"
            value={form.dataRegistro}
            onChangeText={(text) => setForm({ ...form, dataRegistro: text })}
            placeholder="DD/MM/AAAA"
          />
        </View>

        {/* Time Inputs Section */}
        <View style={styles.timeSection}>
          {/* Primeiro Turno */}
          <View style={styles.turnGroup}>
            <View style={styles.turnHeader}>
              <MaterialIcons name="wb-sunny" size={16} color={colors.placeholder} />
              <Text style={[styles.turnTitle, { color: colors.placeholder }]}>
                PRIMEIRO TURNO
              </Text>
            </View>
            <View style={styles.timeRow}>
              <View style={styles.timeInput}>
                <TimeInput
                  label="Entrada"
                  value={form.primeiroTurno.entrada}
                  onValueChange={(value) =>
                    setForm({
                      ...form,
                      primeiroTurno: { ...form.primeiroTurno, entrada: value },
                    })
                  }
                />
              </View>
              <View style={styles.timeInput}>
                <TimeInput
                  label="Saída"
                  value={form.primeiroTurno.saida}
                  onValueChange={(value) =>
                    setForm({
                      ...form,
                      primeiroTurno: { ...form.primeiroTurno, saida: value },
                    })
                  }
                />
              </View>
            </View>
          </View>

          {/* Intervalo */}
          <View style={styles.turnGroup}>
            <View style={styles.turnHeader}>
              <MaterialIcons name="coffee" size={16} color={colors.placeholder} />
              <Text style={[styles.turnTitle, { color: colors.placeholder }]}>INTERVALO</Text>
            </View>
            <View style={styles.timeRow}>
              <View style={styles.timeInput}>
                <TimeInput
                  label="Início"
                  value={form.intervalo.inicio}
                  onValueChange={(value) =>
                    setForm({ ...form, intervalo: { ...form.intervalo, inicio: value } })
                  }
                />
              </View>
              <View style={styles.timeInput}>
                <TimeInput
                  label="Fim"
                  value={form.intervalo.fim}
                  onValueChange={(value) =>
                    setForm({ ...form, intervalo: { ...form.intervalo, fim: value } })
                  }
                />
              </View>
            </View>
          </View>

          {/* Segundo Turno */}
          <View style={styles.turnGroup}>
            <View style={styles.turnHeader}>
              <MaterialIcons name="bedtime" size={16} color={colors.placeholder} />
              <Text style={[styles.turnTitle, { color: colors.placeholder }]}>
                SEGUNDO TURNO
              </Text>
            </View>
            <View style={styles.timeRow}>
              <View style={styles.timeInput}>
                <TimeInput
                  label="Entrada 2"
                  value={form.segundoTurno.entrada}
                  onValueChange={(value) =>
                    setForm({
                      ...form,
                      segundoTurno: { ...form.segundoTurno, entrada: value },
                    })
                  }
                  placeholder="--:--"
                />
              </View>
              <View style={styles.timeInput}>
                <TimeInput
                  label="Saída 2"
                  value={form.segundoTurno.saida}
                  onValueChange={(value) =>
                    setForm({
                      ...form,
                      segundoTurno: { ...form.segundoTurno, saida: value },
                    })
                  }
                  placeholder="--:--"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Toggles Section */}
        <View style={styles.togglesSection}>
          <Toggle
            value={form.isDiaria}
            onValueChange={(value) => setForm({ ...form, isDiaria: value })}
            label="É Diária?"
            description="Pagamento por diária completa"
            variant="success"
            icon={<MaterialIcons name="monetization-on" size={20} color="#10b981" />}
          />
          <Toggle
            value={form.isFalta}
            onValueChange={(value) => setForm({ ...form, isFalta: value })}
            label="É Falta?"
            description="Marcar dia como ausência"
            variant="error"
            icon={<MaterialIcons name="warning" size={20} color="#ef4444" />}
          />
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: colorScheme === 'dark' ? `${colors.background}E6` : `${colors.background}E6`,
            borderTopColor: colors.border,
          },
        ]}>
        <Button icon="save" iconPosition="left" onPress={handleSave} fullWidth>
          Salvar Lançamento
        </Button>
      </View>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 16,
    gap: 24,
  },
  profileCard: {
    marginBottom: 0,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
  },
  profilePeriod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  profilePeriodText: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    gap: 8,
  },
  timeSection: {
    gap: 24,
  },
  turnGroup: {
    gap: 12,
  },
  turnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 4,
  },
  turnTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  timeRow: {
    flexDirection: 'row',
    gap: 16,
  },
  timeInput: {
    flex: 1,
  },
  togglesSection: {
    gap: 16,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
  },
});

