@echo off
cls
echo ===========================================
echo   ACTUALIZADOR AUTOMATICO DE PORTAFOLIO
echo ===========================================
echo.

:: 1. Preparar archivos
echo [+] Preparando archivos...
git add .

:: 2. Guardar cambios (Commit)
set /p msg="Introduzca el mensaje del cambio (ej. agregando proyectos): "
git commit -m "%msg%"

:: 3. Subir a GitHub
echo.
echo [+] Subiendo a GitHub...
git push origin main

echo.
echo ===========================================
echo   PROCESO TERMINADO - REVISA TU WEB
echo ===========================================
pause