# 🚀 Quick Reference Card

## One-Page Guide to AI Interview Platform

---

## ⚡ Quick Start (Windows)

```
1. setup-backend.bat      → Setup backend (one-time)
2. setup-frontend.bat     → Setup frontend (one-time)
3. RUN_APPLICATION.bat    → Start both servers
4. Open: http://localhost:5173
```

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview |
| `QUICK_START.md` | 5-minute setup guide |
| `INSTALLATION.md` | Detailed installation |
| `USER_GUIDE.md` | Complete user manual |
| `CHECKLIST.md` | Verification checklist |

---

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |

---

## 🎯 Main Features

### 1. HR Interview
- **Path**: `/hr`
- **Features**: Emotion detection, voice recording, AI feedback
- **Requirements**: Camera, microphone

### 2. Resume ATS
- **Path**: `/resume`
- **Features**: ATS scoring, skill analysis, grammar check
- **Formats**: PDF, DOCX

### 3. Technical Interview
- **Path**: `/technical`
- **Features**: Skill-based questions, multiple difficulties
- **Input**: Resume upload

---

## 🛠 Commands

### Backend

```bash
# Setup
cd flask/Emotion_detection_with_CNN-main
python -m venv new_env
new_env\Scripts\activate
pip install -r requirements.txt
python setup_nltk.py

# Run
python app.py
```

### Frontend

```bash
# Setup
cd frontend
npm install

# Run
npm run dev
```

---

## 🔧 Troubleshooting

### Backend Won't Start
```bash
✓ Check Python version (3.8+)
✓ Activate virtual environment
✓ Install dependencies
✓ Check port 5000 available
```

### Frontend Won't Start
```bash
✓ Check Node.js version (16+)
✓ Run npm install
✓ Check port 5173 available
✓ Verify backend is running
```

### Camera Not Working
```bash
✓ Grant browser permissions
✓ Close other apps using camera
✓ Try different browser
✓ Check device drivers
```

---

## 📊 Scoring System

### Resume ATS Score

| Component | Weight | Optimal |
|-----------|--------|---------|
| Hard Skills | 40% | Match job description |
| Soft Skills | 20% | Leadership, communication |
| Structure | 20% | Proper sections, format |
| Word Count | 20% | 400-600 words |

**Score Interpretation:**
- 90-100%: Excellent ✅
- 70-89%: Good 👍
- 50-69%: Needs work 📝
- <50%: Major revision 🔧

---

## 🎤 HR Questions

1. Tell me about yourself (60-90s)
2. Where do you see yourself in 5 years? (45-60s)
3. What are your strengths? (45-60s)
4. What is your weakness? (30-45s)
5. Why do you want to work here? (45-60s)

---

## 😊 Emotions Detected

| Emotion | Icon | Ideal % |
|---------|------|---------|
| Neutral | 😐 | 60-70% |
| Happy | 😊 | 20-30% |
| Surprised | 😲 | 5-10% |
| Sad | 😢 | Minimize |
| Angry | 😠 | Avoid |
| Fearful | 😨 | Minimize |
| Disgusted | 🤢 | Avoid |

---

## 🔑 Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Home | Click logo |
| Navigate | Menu links |
| Back | Browser back |
| Refresh | F5 |
| Console | F12 |

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Recommended |
| Edge | ✅ Recommended |
| Firefox | ✅ Supported |
| Safari | ✅ Supported |

---

## 🎨 UI Features

- **Glassmorphism**: Frosted glass effects
- **Gradients**: Smooth color transitions
- **Animations**: Hover and scroll effects
- **Responsive**: Works on all devices
- **Dark Theme**: Easy on the eyes

---

## 📦 Tech Stack

**Frontend:**
- React 18
- Vite 5
- Tailwind CSS 3
- Socket.IO Client

**Backend:**
- Flask 3
- TensorFlow 2.15
- OpenCV 4
- PyMongo

---

## 🔐 Privacy

- ✅ Local processing
- ✅ No external servers
- ✅ Temporary file storage
- ✅ Optional MongoDB
- ✅ User controls data

---

## 📞 Get Help

1. **Documentation**: Read guides
2. **Checklist**: Verify setup
3. **Issues**: GitHub Issues
4. **Community**: Discussions

---

## 💡 Pro Tips

### For Best Results

**HR Interview:**
- Practice in quiet space
- Good lighting
- Look at camera
- Speak clearly
- Be authentic

**Resume ATS:**
- Use keywords from job description
- Simple formatting
- Proofread carefully
- Quantify achievements
- Tailor for each job

**Technical Interview:**
- Review extracted skills
- Practice explaining concepts
- Use examples
- Think aloud
- Ask clarifying questions

---

## 🎯 Quick Wins

1. **Day 1**: Setup and explore
2. **Day 2**: Upload resume, get ATS score
3. **Day 3**: Practice 1 HR question
4. **Day 4**: Review technical questions
5. **Day 5**: Full mock interview

---

## 📊 Success Metrics

Track your progress:
- ✅ ATS score improvement
- ✅ Emotion stability
- ✅ Answer quality
- ✅ Confidence level
- ✅ Practice sessions

---

## 🎓 Learning Path

### Week 1: Setup & Basics
- Install platform
- Explore features
- Upload resume
- Try one interview

### Week 2: Practice
- Daily HR questions
- Review feedback
- Improve resume
- Track progress

### Week 3: Advanced
- Technical questions
- Mock interviews
- Refine answers
- Build confidence

### Week 4: Master
- Full interviews
- Optimize everything
- Final preparations
- Ready to apply!

---

## 🚨 Emergency Fixes

### Quick Resets

**Backend:**
```bash
# Restart backend
Ctrl+C (stop)
python app.py (start)
```

**Frontend:**
```bash
# Restart frontend
Ctrl+C (stop)
npm run dev (start)
```

**Full Reset:**
```bash
# Close all terminals
# Delete node_modules and new_env
# Run setup scripts again
```

---

## 📋 Pre-Interview Checklist

- [ ] Resume optimized (ATS score > 80%)
- [ ] Practiced all HR questions
- [ ] Reviewed technical concepts
- [ ] Comfortable with camera
- [ ] Confident in answers
- [ ] Ready to succeed!

---

## 🎉 You're Ready!

**Remember:**
- Practice makes perfect
- Review feedback carefully
- Stay consistent
- Build confidence
- You've got this! 💪

---

## 📚 Full Documentation

For detailed information:
- **Setup**: QUICK_START.md, INSTALLATION.md
- **Usage**: USER_GUIDE.md
- **Reference**: PROJECT_SUMMARY.md
- **Verify**: CHECKLIST.md

---

**Quick Reference v1.0**

**Last Updated:** 2024

**Print this page for easy reference!**

---

[⬆ Back to Top](#-quick-reference-card)
