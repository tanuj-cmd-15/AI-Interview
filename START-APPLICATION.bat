@echo off
echo ========================================
echo   AI Interview Platform - Professional Edition
echo ========================================
echo.
echo Starting Backend and Frontend servers...
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
echo.
echo Press any key to start both servers...
pause > nul

echo.
echo [1/2] Starting Backend Server...
start "Backend - Spring Boot" cmd /k "cd backend-java && mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev"

timeout /t 10 > nul

echo [2/2] Starting Frontend Server...
start "Frontend - React + Vite" cmd /k "cd frontend-react && npm install && npm run dev"

echo.
echo ========================================
echo   Both servers are starting!
echo ========================================
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
echo H2 Console: http://localhost:8080/h2-console
echo.
echo Please wait for servers to initialize...
echo Then open: http://localhost:5173
echo.
pause
