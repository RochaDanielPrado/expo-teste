import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppBottomNavigation } from '@/components/navigation';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedView } from '@/components/themed-view';

export function EditProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();

  const [formData, setFormData] = useState({
    nomeCompleto: 'João Silva',
    email: 'joao.silva@empresa.com',
    telefone: '(11) 99876-5432',
    cargo: 'Desenvolvedor Senior',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Lógica para salvar alterações
    console.log('Salvando alterações:', formData);
    router.back();
  };

  const handleChangePassword = () => {
    // Navegar para tela de alterar senha
    console.log('Alterar senha');
  };

  const handleChangePhoto = () => {
    // Lógica para alterar foto
    console.log('Alterar foto de perfil');
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor:
              colorScheme === 'dark' ? `${colors.background}E6` : `${colors.background}E6`,
            borderBottomColor: colors.border,
          },
        ]}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            // Se houver histórico de navegação, volta; senão, vai para o dashboard
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push('/(tabs)');
            }
          }}
          activeOpacity={0.7}>
          <MaterialIcons name="arrow-back-ios" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Editar Perfil</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Profile Photo Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.profilePhotoContainer}
            onPress={handleChangePhoto}
            activeOpacity={0.8}>
            <View
              style={[
                styles.profilePhoto,
                {
                  backgroundColor: '#ff9800',
                  borderColor: colorScheme === 'dark' ? '#192633' : colors.backgroundCard,
                },
              ]}>
              <MaterialIcons name="person" size={64} color="#fff" />
            </View>
            <View
              style={[
                styles.cameraButton,
                {
                  backgroundColor: colors.primary,
                  borderColor: colorScheme === 'dark' ? colors.background : colors.backgroundCard,
                },
              ]}>
              <MaterialIcons name="photo-camera" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChangePhoto} activeOpacity={0.7}>
            <Text style={[styles.changePhotoText, { color: colors.primary }]}>
              Alterar Foto de Perfil
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Nome Completo */}
          <Input
            label="Nome Completo"
            value={formData.nomeCompleto}
            onChangeText={(value) => handleChange('nomeCompleto', value)}
            placeholder="Digite seu nome completo"
            icon="person"
          />

          {/* E-mail Corporativo */}
          <Input
            label="E-mail Corporativo"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            placeholder="seu.email@empresa.com"
            icon="mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Telefone / Celular */}
          <Input
            label="Telefone / Celular"
            value={formData.telefone}
            onChangeText={(value) => handleChange('telefone', value)}
            placeholder="(00) 00000-0000"
            icon="phone"
            keyboardType="phone-pad"
          />

          {/* Cargo */}
          <Input
            label="Cargo"
            value={formData.cargo}
            onChangeText={(value) => handleChange('cargo', value)}
            placeholder="Seu cargo atual"
            icon="work"
          />

          {/* Change Password Button */}
          <TouchableOpacity
            style={[
              styles.changePasswordButton,
              {
                backgroundColor: colorScheme === 'dark' ? '#192633' : colors.backgroundCard,
                borderColor: colors.border,
              },
            ]}
            onPress={handleChangePassword}
            activeOpacity={0.7}>
            <View style={styles.changePasswordContent}>
              <View
                style={[
                  styles.changePasswordIcon,
                  {
                    backgroundColor:
                      colorScheme === 'dark' ? '#233648' : colors.inputBackground,
                  },
                ]}>
                <MaterialIcons
                  name="lock-reset"
                  size={20}
                  color={colorScheme === 'dark' ? colors.text : colors.placeholder}
                />
              </View>
              <Text style={[styles.changePasswordText, { color: colors.text }]}>
                Alterar Senha
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.placeholder} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sticky Footer Action */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
          },
        ]}>
        <Button
          icon="save"
          iconPosition="left"
          onPress={handleSave}
          variant="primary"
          style={styles.saveButton}
          fullWidth>
          Salvar Alterações
        </Button>
      </View>

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
    paddingBottom: 12,
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
    paddingRight: 40, // Compensar o botão de voltar
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 180, // Espaço para o footer fixo + bottom navigation
    alignItems: 'center',
  },
  profileSection: {
    width: '100%',
    maxWidth: 448,
    alignItems: 'center',
    marginBottom: 32,
    gap: 24,
  },
  profilePhotoContainer: {
    position: 'relative',
  },
  profilePhoto: {
    width: 128,
    height: 128,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  formSection: {
    width: '100%',
    maxWidth: 448,
    gap: 20,
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
  },
  changePasswordContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  changePasswordIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePasswordText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  saveButton: {
    maxWidth: 448,
    alignSelf: 'center',
    width: '100%',
  },
});

