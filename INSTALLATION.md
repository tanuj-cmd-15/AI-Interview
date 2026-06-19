# 📦 Complete Installation Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Windows Installation](#windows-installation)
3. [Linux/Mac Installation](#linuxmac-installation)
4. [Verification](#verification)
5. [Common Issues](#common-issues)

---

## Prerequisites

### Required Software

1. **Python 3.8 or higher**
   - Download: https://www.python.org/downloads/
   - During installation, check "Add Python to PATH"
   - Verify: `python --version`

2. **Node.js 16 or higher**
   - Download: https://nodejs.org/
   - Includes npm automatically
   - Verify: `node --version` and `npm --version`

3. **Git** (Optional, for cloning)
   - Download: https://git-scm.com/downloads
   - Verify: `git --version`

### System Requirements
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space minimum
- **Internet**: Required for initial setup
- **Webcam**: Optional, for emotion detection feature

---

## Windows Installation

### Method 1: Automated Setup (Recommended)

1. **Extract the project** to a folder (e.g., `C:\AI_interview-main`)

2. **Setup Backend**
   - Double-click `setup-backend.bat`
   - Wait for installation to complete (~10-15 minutes)
   - You should see "Backend Setup Complete!"

3. **Setup Frontend**
   - Double-click `setup-frontend.bat`
   - Wait for installation to complete (~5-10 minutes)
   - You should see "Frontend Setup Complete!"

4. **Run Application**
   - Double-click `RUN_APPLICATION.bat`
   - Two terminal windows will open
   - Wait for both servers to start
   - Open browser: http://localhost:5173

### Method 2: Manual Setup

#### Backend Setup

```cmd
# Open Command Prompt or PowerShell

# Navigate to project directory
cd C:\path\to\AI_interview-main\flask\Emotion_detection_with_CNN-main

# Create virtual environment
python -m venv new_env

# Activate virtual environment
# For CMD:
new_env\Scripts\activate.bat
# For PowerShell:
new_env\Scripts\Activate.ps1

# Upgrade pip
python -m pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

# If requirements.txt has encoding issues, use:
pip install -r requirements-clean.txt

# Setup NLTK data
python setup_nltk.py

# Test backend
python app.py
```

#### Frontend Setup

```cmd
# Open new Command Prompt

# Navigate to frontend directory
cd C:\path\to\AI_interview-main\frontend

# Install dependencies
npm install

# Test frontend
npm run dev
```

---

## Linux/Mac Installation

### Backend Setup

```bash
# Open Terminal

# Navigate to project directory
cd ~/AI_interview-main/flask/Emotion_detection_with_CNN-main

# Create virtual environment
python3 -m venv new_env

# Activate virtual environment
source new_env/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

# If requirements.txt has issues:
pip install -r requirements-clean.txt

# Setup NLTK data
python setup_nltk.py

# Run backend
python app.py
```

### Frontend Setup

```bash
# Open new Terminal

# Navigate to frontend directory
cd ~/AI_interview-main/frontend

# Install dependencies
npm install

# Run frontend
npm run dev
```

---

## Verification

### Backend Verification

1. Backend should start on port 5000
2. You should see:
   ```
   * Running on http://127.0.0.1:5000
   * Running on http://0.0.0.0:5000
   ```
3. Test in browser: http://localhost:5000
4. You should see a basic page or JSON response

### Frontend Verification

1. Frontend should start on port 5173
2. You should see:
   ```
   VITE v5.x.x  ready in xxx ms
   ➜  Local:   http://localhost:5173/
   ```
3. Open browser: http://localhost:5173
4. You should see the AI Interview Platform homepage

---

## Common Issues

### Python Issues

**Issue: 'python' is not recognized**
```bash
# Try python3 instead
python3 --version

# Or add Python to PATH:
# Windows: System Properties > Environment Variables > Path
# Add: C:\Python3x\ and C:\Python3x\Scripts\
```

**Issue: pip install fails**
```bash
# Upgrade pip
python -m pip install --upgrade pip

# Install with no cache
pip install -r requirements.txt --no-cache-dir

# Install individually if needed
pip install flask flask-socketio flask-cors flask-pymongo
pip install opencv-python numpy tensorflow==2.15.0
pip install pypdf2 docx2txt nltk scikit-learn PyMuPDF
```

**Issue: TensorFlow installation fails**
```bash
# For Windows
pip install tensorflow==2.15.0 --no-cache-dir

# For Mac M1/M2
pip install tensorflow-macos==2.15.0
pip install tensorflow-metal

# For Linux
pip install tensorflow==2.15.0
```

**Issue: Virtual environment activation fails (PowerShell)**
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy RemoteSigned

# Then activate
.\new_env\Scripts\Activate.ps1
```

### Node.js Issues

**Issue: 'npm' is not recognized**
```bash
# Reinstall Node.js from nodejs.org
# Ensure "Add to PATH" is checked during installation

# Verify installation
node --version
npm --version
```

**Issue: npm install fails**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json  # Linux/Mac
rmdir /s node_modules & del package-lock.json  # Windows

# Reinstall
npm install

# If still fails, try with legacy peer deps
npm install --legacy-peer-deps
```

**Issue: Port 5173 already in use**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9

# Or change port in vite.config.js
```

### Backend-Frontend Connection Issues

**Issue: CORS errors**
```bash
# Ensure Flask-CORS is installed
pip install flask-cors

# Check backend is running on port 5000
# Check frontend is configured to use http://localhost:5000
```

**Issue: Socket.IO connection fails**
```bash
# Ensure both servers are running
# Check browser console for errors
# Verify Socket.IO versions match:
# Backend: flask-socketio
# Frontend: socket.io-client
```

### Database Issues

**Issue: MongoDB connection fails**
```python
# The app uses MongoDB for emotion tracking
# If you don't have MongoDB, the app will still work
# but emotion tracking won't be saved

# To use MongoDB:
# 1. Create free account at mongodb.com/atlas
# 2. Create cluster
# 3. Get connection string
# 4. Update in app.py:
app.config["MONGO_URI"] = "your_connection_string"
```

### Webcam Issues

**Issue: Webcam not detected**
```bash
# Check camera permissions
# Windows: Settings > Privacy > Camera
# Mac: System Preferences > Security & Privacy > Camera
# Linux: Check /dev/video0 exists

# Test camera
python -c "import cv2; print(cv2.VideoCapture(0).isOpened())"
```

---

## Post-Installation

### Optional: Create Desktop Shortcuts

**Windows:**
1. Right-click `RUN_APPLICATION.bat`
2. Select "Create shortcut"
3. Move shortcut to Desktop
4. Rename to "AI Interview Platform"

**Linux/Mac:**
Create a shell script:
```bash
#!/bin/bash
cd ~/AI_interview-main
./start-backend.sh &
./start-frontend.sh &
```

### Optional: Configure Environment Variables

Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

---

## Next Steps

1. ✅ Verify both servers are running
2. ✅ Open http://localhost:5173 in browser
3. ✅ Test resume upload feature
4. ✅ Try HR interview practice
5. ✅ Explore technical interview section

---

## Getting Help

If you encounter issues not covered here:

1. Check error messages carefully
2. Review SETUP_GUIDE.md for detailed documentation
3. Ensure all prerequisites are installed
4. Try manual installation method
5. Check system requirements

---

## Uninstallation

### Remove Virtual Environment
```bash
# Backend
rm -rf flask/Emotion_detection_with_CNN-main/new_env

# Frontend
rm -rf frontend/node_modules
```

### Remove Downloaded Data
```bash
# NLTK data (optional)
# Windows: C:\Users\<username>\AppData\Roaming\nltk_data
# Linux/Mac: ~/nltk_data
```

---

**Installation Complete! 🎉**

You're now ready to use the AI Interview Platform!

For usage instructions, see: QUICK_START.md
