# Configuração do Fast Refresh no Expo

## O que é Fast Refresh?

Fast Refresh é uma funcionalidade do React Native que permite visualizar instantaneamente as alterações feitas nos componentes React durante o desenvolvimento, sem perder o estado do componente.

## Status Atual

✅ **Fast Refresh está configurado e funcionando!**

- `react-refresh@0.14.2` está instalado (requerido: >= 0.14.0)
- Fast Refresh vem **ativado por padrão** no Expo
- Não há configurações adicionais necessárias no `metro.config.js` ou `babel.config.js`

## Como Verificar se Fast Refresh Está Ativo

### 1. Menu de Desenvolvedor

**Para abrir o menu de desenvolvedor:**

- **iOS Simulator:** `Cmd + D` ou `Ctrl + Cmd + Z`
- **Android Emulator:** `Cmd + M` (Mac) ou `Ctrl + M` (Windows/Linux)
- **Dispositivo iOS:** Agite o dispositivo ou toque com 3 dedos
- **Dispositivo Android:** Agite o dispositivo ou execute `adb shell input keyevent 82`

**No menu, verifique:**
- Se aparecer "**Disable Fast Refresh**" → Fast Refresh está **ATIVO** ✅
- Se aparecer "**Enable Fast Refresh**" → Fast Refresh está **DESATIVO** ❌

### 2. Teste Prático

1. Abra qualquer arquivo de componente (ex: `src/app/(tabs)/index.tsx`)
2. Faça uma alteração simples (ex: mude um texto)
3. Salve o arquivo (`Cmd + S` ou `Ctrl + S`)
4. A alteração deve aparecer **instantaneamente** no app, sem recarregar

## Problemas Comuns e Soluções

### ❌ Fast Refresh não está funcionando?

#### 1. Verificar Remote Debugging
- **Problema:** Remote Debugging pode desabilitar o Fast Refresh
- **Solução:** 
  - Abra o menu de desenvolvedor
  - Se "Stop Remote Debugging" estiver disponível, selecione-o
  - Ou desative o Remote Debugging no menu

#### 2. Verificar modo Tunnel
- **Problema:** Usar `--tunnel` pode causar problemas com Fast Refresh
- **Solução:** 
  - Use `npx expo start` sem `--tunnel`
  - Ou use `npx expo start --lan` para rede local

#### 3. Limpar Cache
```bash
# Limpar cache do Metro
npx expo start --clear

# Ou limpar tudo
rm -rf node_modules
npm install
npx expo start --clear
```

#### 4. Verificar Erros de Sintaxe
- Fast Refresh **pausa** quando há erros de sintaxe
- Corrija os erros e o Fast Refresh continuará automaticamente
- A tela de erro desaparece quando o erro é corrigido

#### 5. Verificar Componentes com Erro
- Componentes com erro são **ignorados** pelo Fast Refresh
- Corrija os erros e o Fast Refresh voltará a funcionar

## Configurações Avançadas

### Desabilitar Fast Refresh (não recomendado)

Se precisar desabilitar temporariamente:

1. Abra o menu de desenvolvedor
2. Selecione "Disable Fast Refresh"

### Configuração Manual (não necessário)

O Fast Refresh funciona automaticamente com:
- ✅ `babel-preset-expo` (já configurado)
- ✅ `react-refresh` >= 0.14.0 (já instalado)
- ✅ Metro bundler padrão do Expo

**Não é necessário** adicionar configurações extras no `babel.config.js` ou `metro.config.js`.

## Dicas

1. **Mantenha o Remote Debugging desativado** durante o desenvolvimento para melhor performance do Fast Refresh
2. **Use `--clear`** se as mudanças não aparecerem: `npx expo start --clear`
3. **Erros de sintaxe** pausam o Fast Refresh, mas ele retoma automaticamente quando corrigidos
4. **Estado do componente** é preservado durante o Fast Refresh (exceto em alguns casos específicos)

## Referências

- [Expo Fast Refresh Documentation](https://docs.expo.dev/guides/fast-refresh/)
- [React Native Fast Refresh](https://reactnative.dev/docs/fast-refresh)
- [Stack Overflow - Expo Fast Refresh](https://stackoverflow.com/questions/62732197/why-is-expo-not-refreshing-when-i-save-changes)

