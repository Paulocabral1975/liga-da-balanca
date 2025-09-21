# 🚀 Instalação Rápida - Liga da Balança

## ⚡ Instalação em 3 Passos

### 1. Baixar os Arquivos
```bash
# Clone o repositório ou baixe os arquivos
git clone https://github.com/seu-usuario/liga-da-balanca.git
cd liga-da-balanca
```

### 2. Executar o Servidor
```bash
# Opção 1: Python (Recomendado)
python -m http.server 8000

# Opção 2: Node.js (se tiver instalado)
npx http-server -p 8000

# Opção 3: PHP (se tiver instalado)
php -S localhost:8000
```

### 3. Acessar o Sistema
Abra seu navegador e acesse: `http://localhost:8000`

## 🎯 Primeiro Uso

### 1. Configurar a Competição
- Clique em **"Configurar"** no header
- Defina o nome da competição
- Escolha as datas de início e fim
- Adicione uma descrição motivacional
- Salve as configurações

### 2. Adicionar Participantes
- Clique em **"Adicionar Participante"**
- Preencha:
  - **Nome Completo** (obrigatório)
  - **Peso Inicial** (obrigatório)
  - **Peso Meta** (opcional)
  - **Departamento** (opcional)
  - **Foto** (opcional)
- Clique em **"Adicionar"**

### 3. Registrar Pesagens
- Clique em **"Registrar Peso"**
- Selecione o participante
- Informe o peso atual
- Adicione observações (opcional)
- Clique em **"Registrar"**

### 4. Acompanhar o Ranking
- O ranking é atualizado automaticamente
- Use as visualizações: Cards, Lista ou Grade
- Acesse estatísticas e histórico

## 🔧 Solução de Problemas

### Erro: "Quota Excedida"
- O sistema limpa automaticamente dados antigos
- Se persistir, clique em **"Limpar Dados"**
- Use fotos menores para economizar espaço

### Erro: "Porta 8000 em uso"
```bash
# Use outra porta
python -m http.server 8080
# Acesse: http://localhost:8080
```

### Problemas de Performance
- Limpe o cache do navegador (Ctrl+F5)
- Verifique o console (F12) para logs
- Use o botão "Limpar Dados" se necessário

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Dispositivos
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

## 🎨 Personalização

### Cores
- Edite `styles.css` para alterar cores
- Tema azul padrão pode ser modificado
- Gradientes personalizáveis

### Funcionalidades
- Edite `index.html` para adicionar campos
- Modifique `script.js` para novas funcionalidades
- Adicione validações personalizadas

## 📊 Backup de Dados

### Exportar Dados
- Use o botão **"Exportar Histórico"**
- Salve o arquivo CSV gerado
- Importe em planilhas para análise

### Limpar Dados
- Clique em **"Limpar Dados"**
- Confirme a ação
- Todos os dados serão removidos

## 🆘 Suporte

### Logs de Debug
- Abra o Console (F12)
- Verifique mensagens de erro
- Logs detalhados disponíveis

### Contato
- Abra uma issue no GitHub
- Descreva o problema detalhadamente
- Inclua logs do console se possível

---

**Pronto! Seu sistema está funcionando! 🎉**

💪 **Boa sorte na competição!**

