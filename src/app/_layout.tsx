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
  const { theme } = useTheme();

  return (
    <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="lancamentos" />
        <Stack.Screen name="perfil" />
      </Stack>
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

