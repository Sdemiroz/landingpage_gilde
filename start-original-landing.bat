@echo off
setlocal

set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"

echo Starting the original GILDE landing page...
echo Project folder: %CD%
echo.

start "GILDE Dev Server" cmd /k "set PATH=C:\Program Files\nodejs;%PATH% && npm run dev -- --host 127.0.0.1"

timeout /t 5 >nul
start "" http://127.0.0.1:5173

echo If the page does not open immediately, wait a few seconds and refresh the browser.
echo Close the "GILDE Dev Server" window to stop the project.
echo.
pause
