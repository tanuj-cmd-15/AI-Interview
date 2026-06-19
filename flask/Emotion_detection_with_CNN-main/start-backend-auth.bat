@echo off
echo ============================================================
echo Starting AI Interview Platform - Backend with Authentication
echo ============================================================
echo.

cd /d "%~dp0"

if not exist "new_env\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo Please run setup first.
    pause
    exit /b 1
)

echo Activating virtual environment...
call new_env\Scripts\activate.bat

echo.
echo Starting Flask backend with authentication...
echo Backend will be available at: http://localhost:5000
echo.
echo Auth endpoints:
echo   POST /api/auth/register - Register new user
echo   POST /api/auth/login    - Login user
echo   GET  /api/auth/me       - Get current user (requires JWT)
echo.
echo Press CTRL+C to stop the server
echo.

python app_auth.py

pause
