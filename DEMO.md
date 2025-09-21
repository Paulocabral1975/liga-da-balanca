# 🎯 Demonstração Rápida - Liga da Balança

## 🚀 Início Rápido (2 minutos)

### 1. Executar o Sistema
```bash
# Opção 1: Python
python server.py

# Opção 2: Python simples
python -m http.server 8000

# Opção 3: Abrir diretamente
# Abra index.html no navegador
```

### 2. Acessar
Abra: `http://localhost:8000`

## 🎬 Demonstração Passo a Passo

### Passo 1: Configurar Competição
1. Clique em **"Configurar"** (ícone de engrenagem)
2. Preencha:
   - **Nome**: "Liga da Balança 2025"
   - **Data Início**: Hoje
   - **Data Fim**: 30 dias
   - **Descrição**: "Desafio do Peso: juntos na balança, unidos na vitória! 💪"
3. Clique em **"Salvar Configuração"**

### Passo 2: Adicionar Participantes
1. Clique em **"Adicionar Participante"**
2. Adicione 3 participantes:

**Participante 1:**
- Nome: "João Silva"
- Peso Inicial: 85.5
- Peso Meta: 75.0
- Departamento: "TI"

**Participante 2:**
- Nome: "Maria Santos"
- Peso Inicial: 72.3
- Peso Meta: 65.0
- Departamento: "RH"

**Participante 3:**
- Nome: "Pedro Costa"
- Peso Inicial: 95.2
- Peso Meta: 85.0
- Departamento: "Vendas"

### Passo 3: Registrar Pesagens
1. Clique em **"Registrar Peso"**
2. Selecione "João Silva"
3. Peso: 83.2
4. Observações: "Primeira pesagem"
5. Clique em **"Registrar"**

Repita para os outros participantes:
- Maria: 70.8 kg
- Pedro: 93.1 kg

### Passo 4: Acompanhar Progresso
1. Veja o **ranking** atualizado
2. Teste as **visualizações**: Cards, Lista, Grade
3. Clique em **"Estatísticas"** para ver métricas
4. Clique em **"Histórico"** para ver todas as pesagens

### Passo 5: Segunda Semana
1. Registre novas pesagens:
   - João: 81.8 kg
   - Maria: 69.5 kg
   - Pedro: 91.2 kg
2. Veja o ranking atualizado
3. Observe as mudanças nas posições

## 🎨 Funcionalidades Demonstradas

### ✅ Gestão de Participantes
- [x] Cadastro completo
- [x] Edição de dados
- [x] Exclusão de participantes
- [x] Upload de fotos (opcional)

### ✅ Sistema de Pesagens
- [x] Registro de pesagens
- [x] Limite de 3 pesagens
- [x] Histórico completo
- [x] Observações

### ✅ Ranking e Estatísticas
- [x] Ranking automático
- [x] Cálculo de porcentagem
- [x] Estatísticas gerais
- [x] Progresso visual

### ✅ Configuração
- [x] Período da competição
- [x] Nome personalizado
- [x] Regras específicas
- [x] Status em tempo real

### ✅ Interface
- [x] Design responsivo
- [x] Múltiplas visualizações
- [x] Tema azul moderno
- [x] Animações suaves

## 🔍 Pontos de Destaque

### 1. **Ranking Inteligente**
- Ordena por **porcentagem de perda**
- Atualiza **automaticamente**
- Mostra **peso atual** e **perda**

### 2. **Interface Responsiva**
- **Desktop**: Layout completo
- **Tablet**: Adaptado
- **Mobile**: Otimizado

### 3. **Sistema de Validação**
- **Campos obrigatórios**
- **Validação de peso**
- **Limite de pesagens**
- **Feedback visual**

### 4. **Persistência de Dados**
- **localStorage** automático
- **Otimização** de imagens
- **Limpeza** inteligente
- **Recuperação** de erros

## 🎯 Cenários de Teste

### Cenário 1: Competição Básica
- 3 participantes
- 2 pesagens cada
- Período de 1 mês
- Sem fotos

### Cenário 2: Competição Completa
- 10 participantes
- 3 pesagens cada
- Período de 3 meses
- Com fotos
- Diferentes departamentos

### Cenário 3: Teste de Limites
- 50 participantes
- Muitas pesagens
- Imagens grandes
- Teste de performance

## 🚨 Solução de Problemas

### Erro: "Quota Excedida"
- Sistema limpa automaticamente
- Use botão "Limpar Dados" se necessário
- Otimize imagens antes do upload

### Erro: "Porta em Uso"
```bash
# Use outra porta
python -m http.server 8080
```

### Problemas de Performance
- Limpe cache do navegador (Ctrl+F5)
- Verifique console (F12)
- Use dados de exemplo menores

## 📊 Dados de Exemplo

Use o arquivo `exemplo-dados.json` para:
- **Importar dados** de demonstração
- **Testar funcionalidades** rapidamente
- **Demonstrar** para clientes
- **Desenvolvimento** e testes

## 🎉 Próximos Passos

1. **Personalize** a competição
2. **Adicione** mais participantes
3. **Configure** regras específicas
4. **Monitore** o progresso
5. **Exporte** relatórios

---

**🎯 Demonstração concluída! O sistema está pronto para uso! 🚀**

