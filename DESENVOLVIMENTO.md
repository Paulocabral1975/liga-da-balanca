# 🛠️ Guia de Desenvolvimento - Liga da Balança

## 📋 Estrutura do Projeto

```
consulta-pessoas/
├── index.html              # Arquivo principal (HTML + CSS + JS)
├── styles.css              # Estilos CSS (se separado)
├── script.js               # JavaScript (se separado)
├── server.py               # Servidor Python personalizado
├── config.json             # Configurações da aplicação
├── package.json            # Metadados do projeto
├── exemplo-dados.json      # Dados de exemplo para demonstração
├── README.md               # Documentação principal
├── INSTALACAO.md           # Guia de instalação
├── DESENVOLVIMENTO.md      # Este arquivo
└── CHANGELOG.md            # Histórico de versões
```

## 🚀 Configuração do Ambiente

### Pré-requisitos
- **Python 3.6+** (para servidor local)
- **Navegador moderno** (Chrome, Firefox, Safari, Edge)
- **Editor de código** (VS Code, Sublime, Atom, etc.)

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/liga-da-balanca.git
cd liga-da-balanca

# Instale dependências (opcional)
pip install -r requirements.txt

# Execute o servidor
python server.py
```

## 🔧 Desenvolvimento

### Estrutura do Código

#### HTML (index.html)
- **Estrutura semântica** com tags HTML5
- **Modais responsivos** para formulários
- **Formulários validados** com HTML5
- **Acessibilidade** com ARIA labels

#### CSS (styles.css)
- **Design responsivo** com Flexbox e Grid
- **Tema azul** com gradientes
- **Animações suaves** e transições
- **Media queries** para diferentes telas

#### JavaScript (script.js)
- **ES6+** com async/await
- **Modularização** por funcionalidade
- **Tratamento de erros** robusto
- **Logs de debug** detalhados

### Principais Funcionalidades

#### 1. Gestão de Participantes
```javascript
// Adicionar participante
function addParticipant(data) {
  const participant = {
    id: uid(),
    name: data.name,
    initialWeight: data.initialWeight,
    targetWeight: data.targetWeight,
    department: data.department,
    photo: data.photo,
    weights: [{
      value: data.initialWeight,
      date: new Date().toISOString(),
      notes: 'Peso inicial'
    }]
  };
  
  participants.push(participant);
  saveParticipants();
  refreshAll();
}
```

#### 2. Sistema de Pesagens
```javascript
// Registrar pesagem
function registerWeight(participantId, weight, notes) {
  const participant = participants.find(p => p.id === participantId);
  if (!participant) return false;
  
  if (participant.weights.length >= 3) {
    throw new Error('Limite de 3 pesagens atingido');
  }
  
  participant.weights.push({
    value: weight,
    date: new Date().toISOString(),
    notes: notes || ''
  });
  
  saveParticipants();
  refreshAll();
}
```

#### 3. Cálculo de Ranking
```javascript
// Calcular porcentagem de perda
function calculateWeightLossPercentage(participant) {
  const initialWeight = participant.initialWeight;
  const currentWeight = getCurrentWeight(participant);
  
  if (!initialWeight || !currentWeight) return 0;
  
  return ((initialWeight - currentWeight) / initialWeight) * 100;
}
```

### Padrões de Código

#### Nomenclatura
- **Variáveis**: camelCase (`participantName`)
- **Funções**: camelCase (`addParticipant`)
- **Constantes**: UPPER_SNAKE_CASE (`LS_KEY`)
- **Classes CSS**: kebab-case (`participant-card`)

#### Estrutura de Funções
```javascript
function functionName(param1, param2) {
  // 1. Validação de parâmetros
  if (!param1) return;
  
  // 2. Lógica principal
  try {
    // Processamento
  } catch (error) {
    // Tratamento de erro
    console.error('Erro:', error);
  }
  
  // 3. Atualização da interface
  refreshAll();
}
```

#### Tratamento de Erros
```javascript
try {
  // Operação que pode falhar
  await riskyOperation();
} catch (error) {
  console.error('Erro detalhado:', error);
  showUserFriendlyMessage(error.message);
  // Fallback ou recuperação
}
```

## 🧪 Testes

### Testes Manuais
1. **Cadastro de participantes** com diferentes dados
2. **Registro de pesagens** até o limite
3. **Edição e exclusão** de participantes
4. **Configuração da competição**
5. **Exportação de dados**
6. **Limpeza de dados**

### Testes de Performance
1. **Muitos participantes** (100+)
2. **Imagens grandes** (otimização)
3. **localStorage cheio** (quota excedida)
4. **Dispositivos móveis** (responsividade)

### Testes de Compatibilidade
1. **Diferentes navegadores**
2. **Diferentes resoluções**
3. **Diferentes dispositivos**
4. **JavaScript desabilitado**

## 🐛 Debugging

### Console do Navegador
```javascript
// Logs de debug
console.log('Debug info:', data);
console.error('Erro:', error);
console.warn('Aviso:', warning);

// Informações do localStorage
console.log('localStorage info:', getStorageInfo());
```

### Ferramentas de Desenvolvimento
- **F12** - DevTools do navegador
- **Console** - Logs e erros
- **Network** - Requisições HTTP
- **Application** - localStorage e cookies
- **Elements** - DOM e CSS

### Logs de Debug
O sistema inclui logs detalhados:
- **Formulários**: Validação e submissão
- **localStorage**: Salvamento e carregamento
- **Imagens**: Upload e otimização
- **Erros**: Stack trace completo

## 📦 Build e Deploy

### Build de Produção
```bash
# Minificar CSS (opcional)
npx clean-css-cli -o styles.min.css styles.css

# Minificar JS (opcional)
npx terser script.js -o script.min.js

# Otimizar imagens (opcional)
npx imagemin images/* --out-dir=dist/images
```

### Deploy
1. **Servidor web** (Apache, Nginx, etc.)
2. **CDN** para arquivos estáticos
3. **HTTPS** para segurança
4. **Compressão gzip** para performance

## 🔄 Versionamento

### Semver (Semantic Versioning)
- **MAJOR**: Mudanças incompatíveis
- **MINOR**: Novas funcionalidades compatíveis
- **PATCH**: Correções de bugs

### Changelog
- **Documentar** todas as mudanças
- **Categorizar** por tipo (Added, Changed, Fixed, Removed)
- **Incluir** breaking changes
- **Referenciar** issues e PRs

## 🤝 Contribuição

### Fluxo de Trabalho
1. **Fork** do repositório
2. **Branch** para feature/fix
3. **Desenvolvimento** com testes
4. **Commit** com mensagens claras
5. **Push** para o repositório
6. **Pull Request** com descrição

### Padrões de Commit
```
feat: adiciona funcionalidade X
fix: corrige bug Y
docs: atualiza documentação
style: formatação de código
refactor: refatora funcionalidade Z
test: adiciona testes
chore: tarefas de manutenção
```

### Code Review
- **Revisar** código antes do merge
- **Testar** funcionalidades
- **Verificar** padrões de código
- **Validar** documentação

## 📚 Recursos Úteis

### Documentação
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)
- [Can I Use](https://caniuse.com/)

### Ferramentas
- [VS Code](https://code.visualstudio.com/)
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Bibliotecas
- [Font Awesome](https://fontawesome.com/) - Ícones
- [Chart.js](https://www.chartjs.org/) - Gráficos (futuro)
- [Papa Parse](https://www.papaparse.com/) - CSV (futuro)

---

**Boa sorte no desenvolvimento! 🚀**

