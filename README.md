# 🏆 Liga da Balança - Sistema de Competição de Perda de Peso

## 📋 Descrição

Sistema web para gerenciar competições de perda de peso entre colegas de trabalho. Permite cadastrar participantes, registrar pesagens, acompanhar progresso e gerar rankings baseados na porcentagem de perda de peso.

## ✨ Funcionalidades

### 👥 Gestão de Participantes
- **Cadastro completo** com nome, peso inicial, peso meta e departamento
- **Upload de fotos** com otimização automática
- **Edição e exclusão** de participantes
- **Múltiplas visualizações**: Cards, Lista e Grade

### ⚖️ Controle de Pesagens
- **Registro de pesagens** com data e observações
- **Limite de 3 pesagens** por participante
- **Histórico completo** de todas as pesagens
- **Exportação de dados** em CSV

### 📊 Relatórios e Estatísticas
- **Ranking automático** por porcentagem de perda
- **Estatísticas gerais** da competição
- **Gráficos de progresso** (em desenvolvimento)
- **Relatórios detalhados**

### ⚙️ Configuração da Competição
- **Período personalizado** (data de início e fim)
- **Nome e descrição** da competição
- **Regras específicas**
- **Status em tempo real** (Aguardando, Ativa, Finalizada)

### 🎨 Interface Moderna
- **Design responsivo** para desktop e mobile
- **Tema azul** profissional
- **Animações suaves** e transições
- **Feedback visual** para todas as ações

## 🚀 Como Executar

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Python 3.x (opcional, para servidor local)

### Instalação Local

1. **Clone ou baixe** os arquivos do projeto
2. **Navegue** até a pasta do projeto
3. **Execute** um dos métodos abaixo:

#### Método 1: Servidor Python (Recomendado)
```bash
python -m http.server 8000
```
Acesse: `http://localhost:8000`

#### Método 2: Abrir Diretamente
Abra o arquivo `index.html` diretamente no navegador

### 🌐 Publicação Online

Para publicar o projeto online, consulte o [**Guia de Publicação**](./GUIA_PUBLICACAO.md) completo.

#### **Opções Recomendadas:**
- **GitHub Pages** (Gratuito) - [Tutorial](./GUIA_PUBLICACAO.md#1-github-pages-recomendado---gratuito)
- **Netlify** (Gratuito) - [Tutorial](./GUIA_PUBLICACAO.md#2-netlify-recomendado---gratuito)
- **Vercel** (Gratuito) - [Tutorial](./GUIA_PUBLICACAO.md#3-vercel-recomendado---gratuito)

#### **Deploy Rápido:**
```bash
# Windows
deploy.bat

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

### Estrutura de Arquivos
```
consulta-pessoas/
├── index.html          # Arquivo principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript (se separado)
└── README.md           # Este arquivo
```

## 📱 Como Usar

### 1. Configurar Competição
- Clique em **"Configurar"** no header
- Defina nome, período e regras da competição
- Salve as configurações

### 2. Adicionar Participantes
- Clique em **"Adicionar Participante"**
- Preencha os dados obrigatórios (nome e peso inicial)
- Adicione foto opcional
- Salve o participante

### 3. Registrar Pesagens
- Clique em **"Registrar Peso"**
- Selecione o participante
- Informe o peso atual e observações
- Registre a pesagem

### 4. Acompanhar Progresso
- Visualize o **ranking** na página principal
- Use as **visualizações** (Cards, Lista, Grade)
- Acesse **estatísticas** detalhadas
- Consulte o **histórico** de pesagens

## 🔧 Funcionalidades Técnicas

### Armazenamento
- **localStorage** para persistência de dados
- **Otimização automática** de imagens
- **Limpeza inteligente** quando necessário
- **Backup automático** de configurações

### Validações
- **Campos obrigatórios** (nome e peso inicial)
- **Validação de peso** (valores positivos)
- **Limite de pesagens** (3 por participante)
- **Validação de arquivos** (tipos de imagem)

### Responsividade
- **Mobile-first** design
- **Breakpoints** para diferentes telas
- **Touch-friendly** interface
- **Otimização** para tablets

## 🎯 Regras da Competição

### Sistema de Pontuação
- **Ranking por porcentagem** de perda de peso
- **Cálculo**: `((Peso Inicial - Peso Atual) / Peso Inicial) × 100`
- **Atualização automática** a cada pesagem

### Limitações
- **Máximo 3 pesagens** por participante
- **Peso inicial obrigatório**
- **Período da competição** definido pelo administrador

## 🛠️ Personalização

### Cores e Tema
- **Tema azul** padrão
- **Gradientes** personalizados
- **Cores de status** (verde para perda, vermelho para ganho)

### Configurações
- **Nome da competição**
- **Período personalizado**
- **Regras específicas**
- **Descrição motivacional**

## 📊 Dados e Relatórios

### Exportação
- **Histórico completo** em CSV
- **Dados dos participantes**
- **Estatísticas da competição**

### Métricas
- **Total de participantes**
- **Duração da competição**
- **Melhor performance**
- **Peso total perdido**

## 🔒 Segurança e Privacidade

### Dados Locais
- **Nenhum servidor** externo
- **Dados armazenados** localmente
- **Privacidade total** dos participantes

### Limpeza de Dados
- **Botão de limpeza** para reset completo
- **Remoção automática** de dados antigos
- **Confirmação** antes de limpar

## 🐛 Solução de Problemas

### Erro de Quota Excedida
- **Limpeza automática** de dados antigos
- **Otimização de imagens**
- **Botão "Limpar Dados"** se necessário

### Problemas de Performance
- **Imagens otimizadas** automaticamente
- **Limpeza periódica** de dados
- **Monitoramento** do uso do localStorage

## 📈 Próximas Versões

### Funcionalidades Planejadas
- **Gráficos interativos** de progresso
- **Notificações** de pesagem
- **Sistema de metas** personalizadas
- **Relatórios em PDF**
- **Modo offline** completo

### Melhorias Técnicas
- **PWA** (Progressive Web App)
- **Sincronização** entre dispositivos
- **Backup na nuvem**
- **API REST** para integração

## 👥 Suporte

### Documentação
- **Console do navegador** para logs detalhados
- **Comentários** no código
- **README** atualizado

### Contato
- **Issues** no repositório
- **Pull requests** para melhorias
- **Feedback** sempre bem-vindo

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais e comerciais.

---

**Versão:** 1.0.0  
**Data:** Setembro 2025  
**Desenvolvido com:** HTML5, CSS3, JavaScript ES6+

🏆 **Boa sorte na sua competição de perda de peso!** 💪