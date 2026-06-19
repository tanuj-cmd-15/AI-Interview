# AI Interview Platform - Complete Setup Guide

## Overview
This is an AI-powered interview preparation platform featuring:
- **Resume ATS Scoring** - Analyze resume compatibility with job descriptions
- **HR Interview Practice** - Real-time feedback on HR questions
- **Emotion Detection** - Track facial expressions during interviews
- **Technical Interview** - Practice technical questions based on resume skills

## Prerequisites
- Python 3.8+ installed
- Node.js 16+ and npm installed
- MongoDB Atlas account (for emotion tracking)
- 4GB+ RAM recommended

## Quick Start

### 1. Backend Setup (Flask)

```bash
# Navigate to backend directory
cd AI_interview-main/flask/Emotion_detection_with_CNN-main

# Create virtual environment
python -m venv new_env

# Activate virtual environment
# On Windows PowerShell:
.\new_env\Scripts\Activate.ps1
# On Windows CMD:
.\new_env\Scripts\activate.bat
# On Linux/Mac:
source new_env/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup NLTK data
python setup_nltk.py

# Run the Flask server
python app.py
```

The backend will start on `http://localhost:5000`

### 2. Frontend Setup (React + Vite)

Open a new terminal:

```bash
# Navigate to frontend directory
cd AI_interview-main/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## Features

### 1. Resume ATS Scoring
- Upload your resume (PDF/DOCX)
- Enter job description or role
- Get detailed analysis:
  - Overall ATS score
  - Hard skills match/missing
  - Soft skills match/missing
  - Resume structure analysis
  - Word count optimization
  - Grammar corrections

### 2. HR Interview Practice
- Real-time video emotion detection
- Voice-to-text transcription
- Predefined HR questions:
  - Tell me about yourself
  - Where do you see yourself in 5 years?
  - What are your strengths/weaknesses?
  - Why do you want to work here?
- AI-powered answer evaluation
- Suggested improvements

### 3. Emotion Detection
- Real-time facial emotion tracking
- Emotions detected: Happy, Sad, Angry, Surprised, Neutral, Fearful, Disgusted
- MongoDB integration for emotion analytics

### 4. Technical Interview
- Questions generated based on resume skills
- Skill extraction from uploaded resume
- Difficulty levels: Easy, Medium, Hard

## Project Structure

```
AI_interview-main/
├── flask/
│   ├── backend/              # Resume parsing & question generation
│   ├── ats/                  # ATS scoring system
│   └── Emotion_detection_with_CNN-main/  # Main Flask app
│       ├── app.py            # Main application
│       ├── ats.py            # ATS processing logic
│       ├── model/            # Emotion detection model
│       ├── templates/        # HTML templates
│       └── static/           # Static files & uploads
└── frontend/
    ├── src/
    │   ├── components/       # React components
    │   ├── context/          # Context API
    │   └── assets/           # Images & resources
    └── package.json
```

## Configuration

### MongoDB Setup (Optional - for emotion tracking)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update in `app.py`:
```python
app.config["MONGO_URI"] = "your_mongodb_connection_string"
```

### Environment Variables
Create `.env` file in frontend directory:
```
VITE_API_URL=http://localhost:5000
```

## Troubleshooting

### Backend Issues

**Issue: TensorFlow installation fails**
```bash
pip install tensorflow==2.15.0 --no-cache-dir
```

**Issue: OpenCV camera not working**
- Ensure camera permissions are granted
- Check if another application is using the camera

**Issue: NLTK data not found**
```bash
python setup_nltk.py
```

### Frontend Issues

**Issue: npm install fails**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Issue: CORS errors**
- Ensure Flask-CORS is installed
- Check backend is running on port 5000

## Usage Tips

1. **For Best Results:**
   - Use a well-lit environment for emotion detection
   - Speak clearly for voice recognition
   - Upload resume in PDF format
   - Provide detailed job descriptions

2. **Interview Practice:**
   - Practice in a quiet environment
   - Look at the camera while answering
   - Take time to think before answering
   - Review feedback after each question

3. **Resume Optimization:**
   - Include relevant keywords from job description
   - Maintain proper resume structure
   - Keep word count between 400-600 words
   - Use action verbs and quantifiable achievements

## Tech Stack

**Backend:**
- Flask (Web framework)
- TensorFlow/Keras (Emotion detection)
- OpenCV (Computer vision)
- PyMongo (MongoDB integration)
- Socket.IO (Real-time communication)
- NLTK (Natural language processing)

**Frontend:**
- React 18
- Vite (Build tool)
- Tailwind CSS (Styling)
- Socket.IO Client (Real-time communication)
- React Speech Recognition (Voice input)
- React Router (Navigation)

## Contributing
Feel free to contribute by:
- Reporting bugs
- Suggesting new features
- Improving documentation
- Submitting pull requests

## License
This project is for educational purposes.

## Support
For issues and questions, please open an issue on GitHub.

---
Happy Interviewing! 🚀
