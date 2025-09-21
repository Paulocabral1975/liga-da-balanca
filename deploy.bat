@echo off
echo ========================================
echo    Liga da Balanca - Deploy Script
echo ========================================
echo.

REM Verificar se Git está instalado
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Git nao encontrado. Instale o Git primeiro.
    pause
    exit /b 1
)

echo [1/5] Verificando status do Git...
git status

echo.
echo [2/5] Adicionando arquivos...
git add .

echo.
echo [3/5] Fazendo commit...
set /p commit_msg="Digite a mensagem do commit (ou pressione Enter para usar 'Deploy v1.0.0'): "
if "%commit_msg%"=="" set commit_msg=Deploy v1.0.0
git commit -m "%commit_msg%"

echo.
echo [4/5] Enviando para GitHub...
git push origin main

echo.
echo [5/5] Deploy concluido!
echo.
echo ========================================
echo    Deploy realizado com sucesso!
echo ========================================
echo.
echo Seu site estara disponivel em:
echo https://SEU-USUARIO.github.io/liga-da-balanca
echo.
echo (Substitua SEU-USUARIO pelo seu usuario do GitHub)
echo.
pause
