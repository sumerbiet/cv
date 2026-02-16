@echo off
setlocal
title HECTOR DEPLOY SYSTEM V3
color 0b

echo ===================================================
echo   SISTEMA DE DESPLIEGUE AUTOMATICO - MI CV
echo ===================================================
echo.

:: PASO 1: Forzar ayuda de credenciales
git config --global credential.helper manager

:: PASO 2: Verificar conexion
echo [+] Verificando estado del repositorio...
git remote -v

:: PASO 3: Preparar archivos
echo [+] Escaneando cambios...
git add .

:: PASO 4: Guardar version
set "msg=Deploy: %date% %time% - Update Features"
echo [+] Guardando version: %msg%
git commit -m "%msg%"

:: PASO 5: Subir a GitHub con manejo de errores
echo [+] Sincronizando con GitHub...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo [!] ERROR DETECTADO. Intentando corregir flujo...
    git pull origin main --rebase
    git push origin main
)

if %errorlevel% neq 0 (
    echo.
    echo [X] ERROR CRITICO: No se pudo subir. 
    echo Revisa si tu terminal te pide login en una ventana externa.
    color 0c
) else (
    echo.
    echo [OK] DESPLIEGUE EXITOSO! 🚀
    echo Tu web se actualizara en: https://hmmarabotto-commits.github.io/mi-cv/
    color 0a
)

echo.
echo Presiona cualquier tecla para cerrar...
pause >nul