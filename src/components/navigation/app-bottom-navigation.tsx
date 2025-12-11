import { useRouter } from 'expo-router';
import React from 'react';

import { BottomNavigationWithFab } from './bottom-navigation-with-fab';

/**
 * Navegação inferior padrão do aplicativo
 * Usa o mesmo layout em todas as telas principais
 */
export function AppBottomNavigation() {
  const router = useRouter();

  const handleRegisterPress = () => {
    router.push('/lancamentos/novo');
  };

  return (
    <BottomNavigationWithFab
      items={[
        { key: 'home', label: 'Início', icon: 'home', route: '/(tabs)' },
        { key: 'historico', label: 'Histórico', icon: 'history', route: '/lancamentos' },
        { key: 'pedidos', label: 'Pedidos', icon: 'description', route: '/pedidos' },
        { key: 'perfil', label: 'Perfil', icon: 'person', route: '/perfil' },
      ]}
      fabItem={{
        key: 'ponto',
        label: 'Ponto',
        icon: 'fingerprint',
        onPress: handleRegisterPress,
      }}
    />
  );
}

