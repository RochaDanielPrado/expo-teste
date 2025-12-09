# Instruções de Deploy - Netlify

Este documento contém as instruções completas para fazer build, deploy e colocar o projeto em produção no Netlify.

## 📋 Pré-requisitos

- Node.js instalado (versão 18 ou superior)
- Conta no Netlify (já logado)
- Netlify CLI instalado globalmente: `npm install -g netlify-cli`
- Projeto configurado e funcionando localmente

## 🔧 Configuração Inicial

### 1. Instalar Dependências

```bash
npm install
```

### 2. Verificar Configuração do Netlify

O arquivo `netlify.toml` já está configurado com:
- **Build command**: `npm run build`
- **Publish directory**: `web-build`
- **Redirects**: Configurado para SPA (Single Page Application)

## 🏗️ Build Local (Teste)

Antes de fazer deploy, você pode testar o build localmente:

```bash
# Executar o build
npm run build

# O build será gerado na pasta web-build/
# Você pode testar localmente com um servidor estático
npx serve web-build
```

## 🚀 Deploy no Netlify

### Opção 1: Deploy Manual via CLI

1. **Fazer login no Netlify** (se ainda não estiver logado):
   ```bash
   netlify login
   ```

2. **Inicializar o projeto** (se ainda não foi feito):
   ```bash
   netlify init
   ```
   
   Durante a inicialização:
   - Escolha "Create & configure a new site"
   - Escolha um nome para o site ou deixe o padrão
   - Configure o build command: `npm run build`
   - Configure o publish directory: `web-build`

3. **Fazer deploy**:
   ```bash
   netlify deploy
   ```
   
   Para deploy de produção:
   ```bash
   netlify deploy --prod
   ```

### Opção 2: Deploy via Netlify Dashboard

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Clique em "Add new site" > "Import an existing project"
3. Conecte seu repositório Git (GitHub, GitLab, ou Bitbucket)
4. Configure as seguintes opções:
   - **Build command**: `npm run build`
   - **Publish directory**: `web-build`
   - **Node version**: `18` (ou superior)
5. Clique em "Deploy site"

### Opção 3: Deploy via Drag and Drop

1. Execute o build localmente:
   ```bash
   npm run build
   ```

2. Acesse [app.netlify.com](https://app.netlify.com)
3. Arraste a pasta `web-build` para a área de deploy do Netlify
4. O site será publicado automaticamente

## 🔄 Deploy Contínuo (CI/CD)

Para configurar deploy automático a cada push:

1. **Conecte o repositório Git ao Netlify**:
   - No dashboard do Netlify, vá em "Site settings" > "Build & deploy"
   - Em "Continuous Deployment", conecte seu repositório

2. **Configure as variáveis de ambiente** (se necessário):
   - No dashboard, vá em "Site settings" > "Environment variables"
   - Adicione variáveis necessárias (ex: `NODE_VERSION=18`)

3. **Configurações de Build**:
   - Build command: `npm run build`
   - Publish directory: `web-build`
   - Node version: `18`

4. **Branch de produção**:
   - Configure qual branch será usado para produção (geralmente `main` ou `master`)
   - Outras branches podem gerar preview deployments

## 🌐 Produção

### Verificar Deploy

Após o deploy, você receberá uma URL do tipo:
- Preview: `https://random-name-123.netlify.app`
- Produção: `https://seu-site.netlify.app`

### Configurar Domínio Customizado

1. No dashboard do Netlify, vá em "Site settings" > "Domain management"
2. Clique em "Add custom domain"
3. Siga as instruções para configurar o DNS

### Variáveis de Ambiente em Produção

Se precisar de variáveis de ambiente diferentes em produção:

1. No dashboard, vá em "Site settings" > "Environment variables"
2. Adicione variáveis específicas para "Production"
3. Faça um novo deploy para aplicar as mudanças

## 📝 Comandos Úteis

```bash
# Ver status do site
netlify status

# Ver logs do deploy
netlify logs

# Abrir o site no navegador
netlify open

# Ver informações do site
netlify sites:list

# Fazer deploy apenas de preview (não produção)
netlify deploy

# Fazer deploy de produção
netlify deploy --prod

# Ver histórico de deploys
netlify deploy:list
```

## 🐛 Troubleshooting

### Build falha

1. Verifique se todas as dependências estão instaladas:
   ```bash
   npm install
   ```

2. Teste o build localmente:
   ```bash
   npm run build
   ```

3. Verifique os logs no Netlify Dashboard

### Erro 404 em rotas

O arquivo `netlify.toml` já está configurado com redirects para SPA. Se ainda tiver problemas, verifique se o redirect está correto.

### Problemas com Node.js

Certifique-se de que a versão do Node.js no Netlify é compatível. O arquivo `netlify.toml` já especifica Node 18.

## 📚 Recursos Adicionais

- [Documentação do Netlify](https://docs.netpify.com)
- [Documentação do Expo Web](https://docs.expo.dev/workflow/web/)
- [Netlify CLI Reference](https://cli.netlify.com/)

## ✅ Checklist de Deploy

- [ ] Dependências instaladas (`npm install`)
- [ ] Build local funcionando (`npm run build`)
- [ ] Arquivo `netlify.toml` configurado
- [ ] Login no Netlify realizado
- [ ] Site criado no Netlify
- [ ] Deploy realizado com sucesso
- [ ] Site acessível e funcionando
- [ ] Domínio customizado configurado (opcional)
- [ ] Variáveis de ambiente configuradas (se necessário)

---

**Última atualização**: Configuração inicial do projeto

