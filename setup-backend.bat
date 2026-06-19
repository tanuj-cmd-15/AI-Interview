@echo off
echo ========================================
echo   AI Interview Platform - Backend Setup
echo ========================================
echo.

cd flask\Emotion_detection_with_CNN-main

echo Creating virtual environment...
python -m venv new_env

echo.
echo Activating virtual environment...
call new_env\Scripts\activate.bat

echo.
echo Installing dependencies...
pip install --upgrade pip
pip install -r requirements.txt

echo.
echo Setting up NLTK data...
python setup_nltk.py

echo.
echo ========================================
echo   Backend Setup Complete!
echo ========================================
echo.
echo To start the backend server, run: start-backend.bat
echo.
pause
