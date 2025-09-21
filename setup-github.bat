@echo off
echo ========================================
echo    Liga da Balanca - Setup GitHub
echo ========================================
echo.

REM Verificar se Git está instalado
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Git nao encontrado. Instale o Git primeiro.
    echo Baixe em: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo [1/6] Verificando Git...
git --version

echo.
echo [2/6] Inicializando repositorio Git...
git init

echo.
echo [3/6] Adicionando arquivos...
git add .

echo.
echo [4/6] Fazendo commit inicial...
git commit -m "Initial commit - Liga da Balanca v1.0.0"

echo.
echo [5/6] Configurando branch main...
git branch -M main

echo.
echo [6/6] Configuracao local concluida!
echo.
echo ========================================
echo    Proximo passo: Criar repositorio no GitHub
echo ========================================
echo.
echo 1. Acesse: https://github.com/new
echo 2. Nome do repositorio: liga-da-balanca
echo 3. Descricao: Sistema de Competicao de Perda de Peso
echo 4. Marque como PUBLIC
echo 5. NAO marque nenhuma opcao de inicializacao
echo 6. Clique em "Create repository"
echo.
echo 7. Depois execute: connect-github.bat
echo.
pause
