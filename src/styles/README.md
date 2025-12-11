# Estilos

Esta pasta contém os arquivos de estilo globais do aplicativo.

## globals.css

Arquivo principal de estilos usando Tailwind CSS. Este arquivo é importado no `_layout.tsx` raiz e aplica os estilos globais em todo o aplicativo.

### Uso

Para usar classes do Tailwind CSS em componentes React Native, use a prop `className`:

```tsx
import { View, Text } from 'react-native';

export function MyComponent() {
  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      <Text className="text-2xl font-bold text-primary">
        Olá Mundo
      </Text>
    </View>
  );
}
```

### Cores Customizadas

As seguintes cores customizadas estão disponíveis:

- `primary`: #137fec
- `primary-dark`: #0f66bd
- `background-light`: #f6f7f8
- `background-dark`: #101922
- `surface-dark`: #1e2936
- `surface-highlight`: #2d3b4b

### Suporte a Dark Mode

O Tailwind CSS suporta dark mode através do prefixo `dark:`:

```tsx
<View className="bg-white dark:bg-surface-dark">
  <Text className="text-gray-900 dark:text-white">
    Texto adaptável
  </Text>
</View>
```

