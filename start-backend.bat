@echo off
echo ========================================
echo   Starting AI Interview Platform Backend
echo ========================================
echo.
echo Backend will run on: http://localhost:8080
echo.

cd backend-java
call mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev

pause
