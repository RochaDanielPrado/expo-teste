import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { ExternalLink } from '@/components/external-link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabTwoScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Explore
        </ThemedText>
      </ThemedView>
      <ThemedText>Navegue pelas diferentes funcionalidades do aplicativo.</ThemedText>

      {/* Seletor de Tema */}
      <ThemeToggle />

      {/* Cards de Navegação */}
      <ThemedView style={styles.cardsContainer}>
        <Card style={styles.navCard}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Autenticação
          </ThemedText>
          <ThemedText style={styles.cardDescription}>
            Tela de login com design moderno e suporte a tema claro/escuro.
          </ThemedText>
          <Button
            icon="person"
            iconPosition="right"
            onPress={() => router.push('/auth')}
            style={styles.cardButton}
            variant="primary">
            Ir para Login
          </Button>
        </Card>

        <Card style={styles.navCard}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Lançamentos
          </ThemedText>
          <ThemedText style={styles.cardDescription}>
            Visualize e gerencie seus lançamentos de ponto com histórico completo.
          </ThemedText>
          <Button
            icon="schedule"
            iconPosition="right"
            onPress={() => router.push('/lancamentos')}
            style={styles.cardButton}
            variant="primary">
            Ver Lançamentos
          </Button>
        </Card>

        <Card style={styles.navCard}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Novo Lançamento
          </ThemedText>
          <ThemedText style={styles.cardDescription}>
            Crie um novo registro de ponto com todos os turnos e intervalos.
          </ThemedText>
          <Button
            icon="add"
            iconPosition="right"
            onPress={() => router.push('/lancamentos/novo')}
            style={styles.cardButton}
            variant="secondary">
            Criar Lançamento
          </Button>
        </Card>
      </ThemedView>

      <Collapsible title="Sobre o Projeto">
        <ThemedText>
          Este aplicativo foi desenvolvido com Expo Router, React Native e TypeScript.
        </ThemedText>
        <ThemedText>
          Estrutura de pastas organizada com componentes, screens, types, hooks e utils.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Saiba mais sobre Expo Router</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Suporte Multiplataforma">
        <ThemedText>
          Este projeto funciona em Android, iOS e Web. Para abrir a versão web, pressione{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> no terminal.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Tema Claro/Escuro">
        <ThemedText>
          O aplicativo suporta tema claro e escuro automaticamente. Use o hook{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> para adaptar as cores.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Saiba mais</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  cardsContainer: {
    gap: 16,
    marginVertical: 8,
  },
  navCard: {
    gap: 12,
  },
  cardTitle: {
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  cardButton: {
    marginTop: 4,
  },
});

