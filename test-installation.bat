@echo off
echo ========================================
echo   AI Interview Platform - Installation Test
echo ========================================
echo.

echo Testing Python installation...
python --version
if %errorlevel% neq 0 (
    echo [ERROR] Python not found! Please install Python 3.8+
    pause
    exit /b 1
)
echo [OK] Python is installed
echo.

echo Testing Node.js installation...
node --version
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found! Please install Node.js 16+
    pause
    exit /b 1
)
echo [OK] Node.js is installed
echo.

echo Testing npm installation...
npm --version
if %errorlevel% neq 0 (
    echo [ERROR] npm not found! Please reinstall Node.js
    pause
    exit /b 1
)
echo [OK] npm is installed
echo.

echo Testing pip installation...
pip --version
if %errorlevel% neq 0 (
    echo [ERROR] pip not found! Please reinstall Python
    pause
    exit /b 1
)
echo [OK] pip is installed
echo.

echo ========================================
echo   All prerequisites are installed!
echo ========================================
echo.
echo You can now run:
echo   1. setup-backend.bat
echo   2. setup-frontend.bat
echo   3. RUN_APPLICATION.bat
echo.
pause
