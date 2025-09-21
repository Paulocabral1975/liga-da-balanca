# Sistema de Gerenciamento de Usuários - Liga da Balança

## Visão Geral

O sistema de gerenciamento de usuários permite controlar o acesso e as permissões de diferentes usuários no sistema Liga da Balança. Ele oferece três níveis de acesso com permissões específicas para cada função.

## Níveis de Usuário

### 1. Administrador
- **Acesso total** ao sistema
- Pode gerenciar usuários
- Pode configurar a competição
- Pode adicionar, editar e excluir participantes
- Pode visualizar estatísticas
- Pode exportar dados
- Pode limpar dados do sistema

### 2. Moderador
- Pode adicionar e editar participantes
- Pode visualizar estatísticas
- Pode exportar dados
- **NÃO** pode gerenciar usuários
- **NÃO** pode configurar a competição
- **NÃO** pode excluir participantes
- **NÃO** pode limpar dados

### 3. Usuário Comum
- Pode apenas visualizar estatísticas
- **NÃO** pode adicionar, editar ou excluir participantes
- **NÃO** pode gerenciar usuários
- **NÃO** pode configurar a competição

## Como Acessar o Gerenciamento de Usuários

1. **Faça login como administrador**:
   - Acesse `admin.html` no navegador
   - Use as credenciais padrão:
     - **Usuário**: `admin`
     - **Senha**: `liga2024`

2. **Acesse o sistema principal**:
   - Após o login, você será redirecionado para `index.html`
   - Clique no botão **"Gerenciar Usuários"** (visível apenas para administradores)

## Funcionalidades do Gerenciamento

### Adicionar Novo Usuário

1. Clique em **"Adicionar Usuário"**
2. Preencha os campos obrigatórios:
   - Nome Completo
   - Email (deve ser único)
   - Função (Administrador, Moderador ou Usuário)
   - Senha
3. Campos opcionais:
   - Departamento
   - Telefone
4. Para usuários Moderadores e Comuns, configure as permissões específicas
5. Clique em **"Salvar Usuário"**

### Editar Usuário Existente

1. Na lista de usuários, clique no botão **"Editar"** (ícone de lápis)
2. Modifique os dados desejados
3. Para alterar a senha, digite uma nova senha (deixe em branco para manter a atual)
4. Clique em **"Salvar Usuário"**

### Alterar Função de Usuário

1. Na lista de usuários, clique no botão **"Permissões"** (ícone de chave)
2. Selecione a nova função desejada
3. As permissões serão atualizadas automaticamente conforme a função

### Excluir Usuário

1. Na lista de usuários, clique no botão **"Excluir"** (ícone de lixeira)
2. Confirme a exclusão na caixa de diálogo
3. **Atenção**: Esta ação não pode ser desfeita

## Permissões Detalhadas

| Funcionalidade | Administrador | Moderador | Usuário |
|----------------|---------------|-----------|---------|
| Adicionar Participantes | ✅ | ✅ | ❌ |
| Editar Participantes | ✅ | ✅ | ❌ |
| Excluir Participantes | ✅ | ❌ | ❌ |
| Gerenciar Usuários | ✅ | ❌ | ❌ |
| Configurar Competição | ✅ | ❌ | ❌ |
| Visualizar Estatísticas | ✅ | ✅ | ✅ |
| Exportar Dados | ✅ | ✅ | ❌ |
| Limpar Dados | ✅ | ❌ | ❌ |

## Credenciais Padrão

### Administrador Principal
- **Usuário**: `admin`
- **Senha**: `liga2024`
- **Email**: `admin@ligadabalanca.com`

## Segurança

### Sessões
- As sessões de usuário expiram em **8 horas**
- Após a expiração, é necessário fazer login novamente

### Senhas
- As senhas são armazenadas em texto simples no localStorage
- **Recomendação**: Para produção, implemente criptografia de senhas

### Validações
- Emails devem ser únicos no sistema
- Campos obrigatórios são validados antes do salvamento
- Apenas administradores podem gerenciar usuários

## Solução de Problemas

### "Acesso Negado"
- Verifique se você está logado como administrador
- Confirme se sua sessão não expirou
- Verifique se você tem as permissões necessárias

### "Email já existe"
- Cada email deve ser único no sistema
- Use um email diferente ou edite o usuário existente

### "Sessão expirada"
- Faça logout e login novamente
- Suas permissões serão restauradas automaticamente

## Arquivos do Sistema

- `user-management.html` - Interface de gerenciamento de usuários
- `admin.html` - Sistema de login de administradores
- `index.html` - Sistema principal com controle de permissões
- Dados armazenados em `localStorage` com a chave `lb_users_v1`

## Próximos Passos

Para melhorar o sistema, considere implementar:

1. **Criptografia de senhas** (hash com bcrypt ou similar)
2. **Sistema de recuperação de senha**
3. **Logs de auditoria** (quem fez o quê e quando)
4. **Validação de força de senhas**
5. **Integração com sistema de autenticação externo**
6. **Backup automático dos dados de usuários**

## Suporte

Para dúvidas ou problemas:
1. Verifique este documento
2. Consulte o console do navegador para erros
3. Verifique se todos os arquivos estão presentes
4. Confirme se o localStorage está funcionando corretamente
