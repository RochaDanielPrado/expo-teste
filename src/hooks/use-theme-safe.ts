import { useContext } from 'react';
import { ThemeContext } from '@/contexts/theme-context';

/**
 * Hook seguro para usar o tema, com fallback se o ThemeProvider não estiver disponível
 * Não pode usar try/catch com hooks, então verificamos o context diretamente
 */
export function useThemeSafe() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    // Retornar valores padrão silenciosamente se ThemeProvider não estiver disponível
    // Isso pode acontecer durante a renderização inicial
    return {
      theme: 'light' as const,
      themeMode: 'system' as const,
      setThemeMode: () => {
        // Silencioso - não logar warning
      },
      toggleTheme: () => {
        // Silencioso - não logar warning
      },
    };
  }
  
  return context;
}

