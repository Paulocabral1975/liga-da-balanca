@echo off
echo ========================================
echo    Liga da Balanca - Conectar GitHub
echo ========================================
echo.

set /p github_user="Digite seu nome de usuario do GitHub: "
if "%github_user%"=="" (
    echo ERRO: Nome de usuario e obrigatorio!
    pause
    exit /b 1
)

echo.
echo [1/4] Conectando com GitHub...
git remote add origin https://github.com/%github_user%/liga-da-balanca.git

echo.
echo [2/4] Enviando arquivos para GitHub...
git push -u origin main

echo.
echo [3/4] Verificando status...
git status

echo.
echo [4/4] Concluido!
echo.
echo ========================================
echo    Repositorio criado com sucesso!
echo ========================================
echo.
echo Seu repositorio esta em:
echo https://github.com/%github_user%/liga-da-balanca
echo.
echo Proximo passo: Ativar GitHub Pages
echo 1. Acesse: https://github.com/%github_user%/liga-da-balanca/settings/pages
echo 2. Em Source, selecione "Deploy from a branch"
echo 3. Escolha "main" branch e "/ (root)"
echo 4. Clique em "Save"
echo.
echo Seu site estara em:
echo https://%github_user%.github.io/liga-da-balanca
echo.
pause
