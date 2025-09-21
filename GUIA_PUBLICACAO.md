# 🚀 Guia de Publicação - Liga da Balança

## 📋 Opções de Publicação

### 1. **GitHub Pages** (Recomendado - Gratuito)

#### **Vantagens:**
- ✅ Gratuito
- ✅ Fácil de configurar
- ✅ HTTPS automático
- ✅ Domínio personalizado
- ✅ Integração com GitHub

#### **Passos:**

1. **Criar repositório no GitHub:**
   ```bash
   # No terminal, na pasta do projeto
   git init
   git add .
   git commit -m "Initial commit - Liga da Balança v1.0.0"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/liga-da-balanca.git
   git push -u origin main
   ```

2. **Ativar GitHub Pages:**
   - Acesse o repositório no GitHub
   - Vá em **Settings** → **Pages**
   - Em **Source**, selecione **Deploy from a branch**
   - Escolha **main** branch e **/ (root)**
   - Clique em **Save**

3. **Acessar o site:**
   - URL será: `https://SEU-USUARIO.github.io/liga-da-balanca`

---

### 2. **Netlify** (Recomendado - Gratuito)

#### **Vantagens:**
- ✅ Gratuito
- ✅ Deploy automático
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Formulários integrados

#### **Passos:**

1. **Preparar arquivos:**
   - Comprimir todos os arquivos em um ZIP
   - Ou conectar com GitHub

2. **Deploy no Netlify:**
   - Acesse [netlify.com](https://netlify.com)
   - Clique em **"New site from ZIP"**
   - Faça upload do ZIP ou conecte com GitHub
   - Deploy automático!

3. **Configurações opcionais:**
   - Personalizar domínio
   - Configurar redirects
   - Adicionar formulários

---

### 3. **Vercel** (Recomendado - Gratuito)

#### **Vantagens:**
- ✅ Gratuito
- ✅ Deploy automático
- ✅ Performance otimizada
- ✅ Integração com GitHub

#### **Passos:**

1. **Instalar Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   # Na pasta do projeto
   vercel
   ```

3. **Seguir instruções:**
   - Fazer login na Vercel
   - Configurar projeto
   - Deploy automático!

---

### 4. **Firebase Hosting** (Gratuito)

#### **Vantagens:**
- ✅ Gratuito
- ✅ Google Cloud
- ✅ CDN global
- ✅ HTTPS automático

#### **Passos:**

1. **Instalar Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Configurar projeto:**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Deploy:**
   ```bash
   firebase deploy
   ```

---

## 🛠️ Preparação para Publicação

### **1. Otimizar Arquivos**

#### **Minificar CSS e JavaScript:**
```bash
# Instalar ferramentas de minificação
npm install -g clean-css-cli uglify-js

# Minificar CSS
cleancss -o styles.min.css styles.css

# Minificar JavaScript
uglifyjs script.js -o script.min.js
```

#### **Otimizar Imagens:**
- Usar ferramentas como TinyPNG ou ImageOptim
- Converter para WebP quando possível
- Reduzir tamanho sem perder qualidade

### **2. Configurar package.json**

Atualizar o `package.json` com informações corretas:

```json
{
  "name": "liga-da-balanca",
  "version": "1.0.0",
  "description": "Sistema de Competição de Perda de Peso - Liga da Balança",
  "main": "index.html",
  "scripts": {
    "start": "python -m http.server 8000",
    "build": "npm run minify-css && npm run minify-js",
    "minify-css": "cleancss -o dist/styles.min.css styles.css",
    "minify-js": "uglifyjs script.js -o dist/script.min.js"
  },
  "keywords": [
    "competição",
    "perda-peso",
    "fitness",
    "web-app",
    "javascript",
    "html5",
    "css3"
  ],
  "author": "Seu Nome",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/SEU-USUARIO/liga-da-balanca.git"
  },
  "homepage": "https://SEU-USUARIO.github.io/liga-da-balanca"
}
```

### **3. Criar Arquivo .gitignore**

```gitignore
# Dependências
node_modules/
npm-debug.log*

# Arquivos de build
dist/
build/

# Arquivos temporários
*.tmp
*.temp

# Logs
*.log

# Arquivos do sistema
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Arquivos de backup
*.bak
*.backup
```

---

## 🌐 Configurações de Domínio

### **Domínio Personalizado (Opcional)**

#### **Para GitHub Pages:**
1. Comprar domínio (ex: `ligadabalanca.com`)
2. Configurar DNS:
   ```
   CNAME: www → SEU-USUARIO.github.io
   A: @ → 185.199.108.153
   A: @ → 185.199.109.153
   A: @ → 185.199.110.153
   A: @ → 185.199.111.153
   ```
3. Adicionar arquivo `CNAME` no repositório com o domínio

#### **Para Netlify/Vercel:**
- Configurar domínio personalizado nas configurações
- Atualizar DNS do provedor

---

## 📱 Configurações PWA (Opcional)

### **Criar manifest.json:**

```json
{
  "name": "Liga da Balança",
  "short_name": "LigaBalanca",
  "description": "Sistema de Competição de Perda de Peso",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#667eea",
  "theme_color": "#667eea",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### **Adicionar no HTML:**
```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#667eea">
```

---

## 🔧 Scripts de Deploy Automático

### **GitHub Actions (CI/CD):**

Criar `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

---

## 📊 Monitoramento e Analytics

### **Google Analytics:**

Adicionar no HTML:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### **Monitoramento de Performance:**

- **Google PageSpeed Insights**
- **GTmetrix**
- **WebPageTest**

---

## 🚀 Checklist de Publicação

### **Antes do Deploy:**
- [ ] Testar localmente
- [ ] Otimizar imagens
- [ ] Minificar CSS/JS
- [ ] Verificar responsividade
- [ ] Testar em diferentes navegadores
- [ ] Validar HTML/CSS
- [ ] Atualizar README
- [ ] Configurar analytics

### **Após o Deploy:**
- [ ] Testar site online
- [ ] Verificar HTTPS
- [ ] Testar funcionalidades
- [ ] Verificar performance
- [ ] Configurar domínio (se aplicável)
- [ ] Monitorar analytics
- [ ] Documentar URL final

---

## 🎯 Recomendação Final

**Para este projeto, recomendo:**

1. **GitHub Pages** - Mais simples e gratuito
2. **Netlify** - Alternativa excelente com mais recursos
3. **Domínio personalizado** - Para profissionalismo

### **URLs de Exemplo:**
- GitHub Pages: `https://seuusuario.github.io/liga-da-balanca`
- Netlify: `https://liga-da-balanca.netlify.app`
- Domínio próprio: `https://ligadabalanca.com`

---

**Boa sorte com a publicação! 🚀**
