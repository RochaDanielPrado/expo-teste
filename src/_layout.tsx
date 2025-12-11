import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../styles/globals.css';

import { ThemeProvider, useTheme } from '@/contexts/theme-context';

// Suprimir warning sobre SafeAreaView deprecated
// O warning vem de dependências que ainda usam SafeAreaView do react-native
// Já estamos usando SafeAreaProvider do react-native-safe-area-context corretamente
LogBox.ignoreLogs([
  /SafeAreaView has been deprecated/,
  /Please use 'react-native-safe-area-context'/,
]);

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  console.log('🟢 RootLayoutNav: Renderizando...');
  const { theme } = useTheme();
  console.log('🟢 RootLayoutNav: theme obtido:', theme);

  return (
    <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="lancamentos" options={{ headerShown: false }} />
        <Stack.Screen name="perfil" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  console.log('🟢 RootLayout: Renderizando...');
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
