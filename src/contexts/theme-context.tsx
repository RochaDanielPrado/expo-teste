import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: 'light' | 'dark';
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme_mode';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useSystemColorScheme();
  // Inicializar com o tema do sistema imediatamente
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  // Inicializar tema baseado no sistema (ou 'light' como fallback)
  const getInitialTheme = (): 'light' | 'dark' => {
    const initialSystemTheme = systemTheme ?? 'light';
    return initialSystemTheme === 'dark' ? 'dark' : 'light';
  };
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  // Carregar preferência salva na primeira renderização
  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY)
      .then((savedMode) => {
        if (savedMode && (savedMode === 'light' || savedMode === 'dark' || savedMode === 'system')) {
          setThemeModeState(savedMode as ThemeMode);
        }
      })
      .catch(() => {
        // Ignorar erros de leitura - manter padrão 'system'
      });
  }, []);

  // Aplicar tema baseado no modo (sempre reage a mudanças)
  useEffect(() => {
    if (themeMode === 'system') {
      const currentSystemTheme = systemTheme ?? 'light';
      const newTheme = currentSystemTheme === 'dark' ? 'dark' : 'light';
      setTheme(newTheme);
    } else {
      setTheme(themeMode);
    }
  }, [themeMode, systemTheme]);

  const setThemeMode = React.useCallback(async (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    // Usar função de atualização para garantir que pegamos o valor mais recente
    setThemeModeState((currentMode) => {
      if (currentMode === 'system') {
        // Se estiver em modo system, alterna para o oposto do tema atual do sistema
        const currentSystemTheme = systemTheme ?? 'light';
        const newTheme = currentSystemTheme === 'dark' ? 'light' : 'dark';
        // Salvar no AsyncStorage
        AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme).catch((error) => {
          console.error('Erro ao salvar tema:', error);
        });
        return newTheme;
      } else {
        // Alterna entre light e dark
        const newTheme = currentMode === 'dark' ? 'light' : 'dark';
        // Salvar no AsyncStorage
        AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme).catch((error) => {
          console.error('Erro ao salvar tema:', error);
        });
        return newTheme;
      }
    });
  }, [systemTheme]);

  // Usar useMemo para garantir que o contexto seja atualizado quando theme ou themeMode mudarem
  // setThemeMode e toggleTheme são estáveis (useCallback), então não precisam estar nas dependências
  const contextValue = React.useMemo(
    () => ({ theme, themeMode, setThemeMode, toggleTheme }),
    [theme, themeMode, setThemeMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

