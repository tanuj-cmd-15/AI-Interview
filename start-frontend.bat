@echo off
echo ========================================
echo   Starting AI Interview Platform Frontend
echo ========================================
echo.
echo Frontend will run on: http://localhost:5173
echo.

cd frontend-react
call npm install
call npm run dev

pause
