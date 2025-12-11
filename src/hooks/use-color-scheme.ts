import { useThemeSafe } from '@/hooks/use-theme-safe';

/**
 * Hook para obter o esquema de cores atual
 * Agora usa o sistema de tema gerenciado pelo ThemeContext
 */
export function useColorScheme(): 'light' | 'dark' {
  const { theme } = useThemeSafe();
  return theme;
}
