import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <ThemedView style={[styles.wrapper, { backgroundColor: colors.background }]}>
          {/* Decoration Gradients */}
          <View style={[styles.gradientTop, { backgroundColor: `${colors.primary}33` }]} />
          <View style={[styles.gradientBottom, { backgroundColor: `${colors.primary}1A` }]} />

          <View style={styles.content}>
            {/* Logo / Icon */}
            <View style={[styles.logoContainer, { backgroundColor: `${colors.primary}1A` }]}>
              <MaterialIcons name="schedule" size={32} color={colors.primary} />
            </View>

            {/* Header Section */}
            <View style={styles.header}>
              <ThemedText type="title" style={styles.title}>
                Bem-vindo
              </ThemedText>
              <ThemedText style={[styles.subtitle, { color: colors.placeholder }]}>
                Insira suas credenciais para acessar o ponto.
              </ThemedText>
            </View>

            {/* Form Section */}
            <View style={styles.form}>
              {/* Email Field */}
              <Input
                label="E-mail corporativo"
                icon="mail"
                placeholder="nome@empresa.com.br"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              {/* Password Field */}
              <View style={styles.passwordContainer}>
                <Input
                  label="Senha"
                  icon="lock"
                  placeholder="Digite sua senha"
                  secureTextEntry
                  showPasswordToggle
                />
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                    Esqueceu a senha?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Main Action Button */}
              <Button icon="arrow-forward" iconPosition="right" variant="primary">
                Entrar
              </Button>

              {/* Biometric Login */}
              <TouchableOpacity style={styles.biometricButton}>
                <MaterialIcons name="fingerprint" size={28} color={colors.placeholder} />
                <Text style={[styles.biometricText, { color: colors.placeholder }]}>
                  Entrar com Biometria
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              <Text style={[styles.dividerText, { color: colors.placeholder }]}>OU</Text>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            </View>

            {/* Create Account */}
            <View style={styles.createAccount}>
              <Text style={[styles.createAccountText, { color: colors.placeholder }]}>
                Novo colaborador?
              </Text>
              <TouchableOpacity>
                <Text style={[styles.createAccountLink, { color: colors.primary }]}>
                  Criar conta
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Safe Area Spacer */}
          <View style={styles.bottomSpacer} />
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    minHeight: '100%',
  },
  gradientTop: {
    position: 'absolute',
    top: -160,
    right: -160,
    width: 320,
    height: 320,
    borderRadius: 160,
    opacity: 0.3,
    zIndex: 0,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: -160,
    left: -160,
    width: 320,
    height: 320,
    borderRadius: 160,
    opacity: 0.2,
    zIndex: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    zIndex: 10,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 280,
  },
  form: {
    width: '100%',
    gap: 20,
  },
  passwordContainer: {
    gap: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -12,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: 'center',
  },
  biometricText: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 32,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  createAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  createAccountText: {
    fontSize: 16,
  },
  createAccountLink: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 24,
  },
});

