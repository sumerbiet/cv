@echo off
title Hector's Deployment System
cls
echo [1/4] Configurando rama principal...
git branch -M main

echo [2/4] Preparando archivos...
git add .

echo [3/4] Guardando version...
git commit -m "Actualizacion automatica: %date% %time%"

echo [4/4] Subiendo a GitHub...
git push origin main

echo.
echo ==============================================
echo   PROCESO TERMINADO - REVISA TU WEB
echo ==============================================
pause