# Sistema de Login - Liga da Balança

## Visão Geral

O sistema agora possui uma tela de login obrigatória que protege todo o acesso ao sistema. Os usuários precisam fazer login com suas credenciais antes de acessar qualquer funcionalidade.

## Como Acessar o Sistema

### 1. Acesso Principal
- **URL**: `http://localhost:8000/login.html`
- Esta é a página de entrada principal do sistema
- Todos os usuários devem fazer login aqui

### 2. Credenciais Padrão

#### Administrador
- **Email**: `admin@ligadabalanca.com`
- **Usuário**: `admin`
- **Senha**: `liga2024`
- **Permissões**: Acesso total ao sistema

#### Moderador (Demonstração)
- **Email**: `moderador@ligadabalanca.com`
- **Usuário**: `moderador`
- **Senha**: `mod123`
- **Permissões**: Adicionar/editar participantes, visualizar estatísticas

#### Usuário Comum (Demonstração)
- **Email**: `usuario@ligadabalanca.com`
- **Usuário**: `usuario`
- **Senha**: `user123`
- **Permissões**: Apenas visualizar estatísticas

## Funcionalidades da Tela de Login

### Interface Moderna
- Design responsivo com animações
- Gradiente azul com efeitos visuais
- Logo animado da Liga da Balança
- Campos de entrada com validação visual

### Validações
- Verificação de campos obrigatórios
- Validação de credenciais
- Verificação de status do usuário (ativo/inativo)
- Tratamento de erros com mensagens claras

### Segurança
- Sessões com expiração de 8 horas
- Verificação automática de sessão válida
- Redirecionamento automático para login quando necessário
- Limpeza automática de sessões expiradas

## Fluxo de Autenticação

### 1. Login Inicial
1. Usuário acessa `login.html`
2. Digita email/usuário e senha
3. Sistema valida credenciais
4. Se válido, cria sessão e redireciona para `index.html`
5. Se inválido, mostra mensagem de erro

### 2. Verificação de Sessão
- Todas as páginas verificam se há sessão válida
- Se não houver sessão ou estiver expirada, redireciona para login
- Sessões são válidas por 8 horas

### 3. Logout
- Botão "Sair" limpa a sessão
- Redireciona automaticamente para a tela de login
- Todas as credenciais são removidas do localStorage

## Páginas Protegidas

Todas as páginas principais agora requerem login:

- **`index.html`** - Sistema principal
- **`user-management.html`** - Gerenciamento de usuários (apenas admins)
- **`admin.html`** - Login de administrador (legado)

## Sistema de Sessões

### Armazenamento
- **Chave**: `lb_session_v1`
- **Dados**: `userId`, `userRole`, `loginTime`, `lastActivity`

### Validação
- Verifica se existe sessão válida
- Calcula tempo decorrido desde o login
- Expira após 8 horas de inatividade
- Limpa dados automaticamente quando expirada

### Segurança
- Dados sensíveis não são armazenados em texto plano
- Verificação de integridade da sessão
- Limpeza automática de dados expirados

## Recuperação de Senha

### Status Atual
- Funcionalidade ainda não implementada
- Botão "Esqueceu sua senha?" mostra mensagem informativa
- Usuários devem entrar em contato com administrador

### Implementação Futura
- Sistema de recuperação por email
- Geração de códigos temporários
- Redefinição segura de senhas

## Solução de Problemas

### "Sessão Expirada"
- **Causa**: Login feito há mais de 8 horas
- **Solução**: Fazer login novamente

### "Usuário Não Encontrado"
- **Causa**: Email ou nome de usuário incorreto
- **Solução**: Verificar credenciais ou criar novo usuário

### "Senha Incorreta"
- **Causa**: Senha digitada incorretamente
- **Solução**: Verificar senha ou resetar com administrador

### "Usuário Inativo"
- **Causa**: Conta desabilitada por administrador
- **Solução**: Entrar em contato com administrador

### "Acesso Negado"
- **Causa**: Tentativa de acessar área restrita
- **Solução**: Fazer login com usuário com permissões adequadas

## Configuração do Servidor

### Iniciar o Servidor
```bash
cd C:\consulta-pessoas
python server.py
```

### Acessar o Sistema
1. Abra o navegador
2. Acesse `http://localhost:8000/login.html`
3. Faça login com suas credenciais
4. Use o sistema normalmente

## Arquivos do Sistema

### Páginas Principais
- **`login.html`** - Tela de login principal
- **`index.html`** - Sistema principal (protegido)
- **`user-management.html`** - Gerenciamento de usuários (protegido)
- **`admin.html`** - Login de admin (legado)

### Dados
- **`lb_users_v1`** - Dados dos usuários
- **`lb_session_v1`** - Sessões ativas
- **`lb_participants_v1`** - Dados dos participantes
- **`lb_competition_config_v1`** - Configurações da competição

## Próximas Melhorias

### Segurança
1. **Criptografia de senhas** (hash com bcrypt)
2. **Tokens JWT** para sessões
3. **Rate limiting** para tentativas de login
4. **Logs de auditoria** de acessos

### Funcionalidades
1. **Recuperação de senha** por email
2. **Alteração de senha** pelo usuário
3. **Lembrar usuário** (opcional)
4. **Login com redes sociais** (Google, Facebook)

### Interface
1. **Tema escuro/claro** configurável
2. **Idiomas** múltiplos
3. **Acessibilidade** melhorada
4. **PWA** (Progressive Web App)

## Suporte

Para problemas ou dúvidas:
1. Verifique este documento
2. Consulte o console do navegador
3. Confirme se o servidor está rodando
4. Teste com as credenciais padrão
5. Limpe o localStorage se necessário
