@echo off
echo ========================================
echo   AI Interview Platform - Quick Start
echo ========================================
echo.
echo This will start both Backend and Frontend servers
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to continue...
pause > nul

echo.
echo Starting Backend Server...
start cmd /k "cd /d %~dp0 && start-backend.bat"

timeout /t 3 > nul

echo Starting Frontend Server...
start cmd /k "cd /d %~dp0 && start-frontend.bat"

echo.
echo ========================================
echo   Both servers are starting...
echo   Please wait for them to initialize
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
pause
