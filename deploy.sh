#!/bin/bash

echo "========================================"
echo "   Liga da Balanca - Deploy Script"
echo "========================================"
echo

# Verificar se Git está instalado
if ! command -v git &> /dev/null; then
    echo "ERRO: Git não encontrado. Instale o Git primeiro."
    exit 1
fi

echo "[1/5] Verificando status do Git..."
git status

echo
echo "[2/5] Adicionando arquivos..."
git add .

echo
echo "[3/5] Fazendo commit..."
read -p "Digite a mensagem do commit (ou pressione Enter para usar 'Deploy v1.0.0'): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Deploy v1.0.0"
fi
git commit -m "$commit_msg"

echo
echo "[4/5] Enviando para GitHub..."
git push origin main

echo
echo "[5/5] Deploy concluído!"
echo
echo "========================================"
echo "   Deploy realizado com sucesso!"
echo "========================================"
echo
echo "Seu site estará disponível em:"
echo "https://SEU-USUARIO.github.io/liga-da-balanca"
echo
echo "(Substitua SEU-USUARIO pelo seu usuário do GitHub)"
echo
