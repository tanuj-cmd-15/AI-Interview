# Quick Start Guide - AI Interview Platform

## 🚀 Get Started in 5 Minutes!

---

## ✅ What You Have

1. ✅ **Google OAuth** configured (Continue with Google button)
2. ✅ **ATS Resume Scanner** (with auto-save for students)
3. ✅ **HR Dashboard** (sees all student ATS scores automatically)
4. ✅ **Forgot Password** (email with black text)
5. ✅ **Candidate Pipeline** (6-stage Kanban board)
6. ✅ **Professional UI** (Royal theme)

---

## 🔧 Setup Steps

### 1. Configure Google OAuth (5 minutes)

Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

Add these Authorized redirect URIs:
```
http://localhost:8081/login/oauth2/code/google
```

Add these Authorized JavaScript origins:
```
http://localhost:8081
http://localhost:5173
```

Click **Save** ✅

---

### 2. Configure Email (Optional - 3 minutes)

**Option A: Gmail (Recommended for Testing)**
```bash
# PowerShell
$env:MAIL_USERNAME="your-email@gmail.com"
$env:MAIL_PASSWORD="your-app-password"
```

**Option B: Skip Email**
- Forgot password won't work
- Interview invitations won't send
- Other features work fine

---

### 3. Start Backend (1 minute)

```bash
cd backend-java
mvn spring-boot:run
```

Wait for: `Started AiInterviewApplication`

Backend running on: **http://localhost:8081** ✅

---

### 4. Start Frontend (1 minute)

```bash
cd frontend-react
npm install  # First time only
npm run dev
```

Frontend running on: **http://localhost:5173** ✅

---

## 🎯 Test Features

### Test 1: Google Login (30 seconds)
1. Go to http://localhost:5173/login
2. Click **"Continue with Google"** ← NEW!
3. Sign in with Google
4. ✅ Auto-created account, logged in!

---

### Test 2: Regular Login (30 seconds)
1. Go to http://localhost:5173/register
2. Register as STUDENT
3. Login with credentials
4. ✅ See Student Dashboard!

---

### Test 3: ATS Scanner (1 minute)
1. Login as Student
2. Go to **ATS Scanner** tab
3. Upload a PDF/DOCX resume
4. ✅ See instant scores!
5. ✅ Score saved to database automatically!

---

### Test 4: HR Sees ATS Scores (30 seconds)
1. Login as HR (register as HR first)
2. Open **Pipeline** or **Candidates** tab
3. ✅ See all student ATS scores automatically!
4. Color-coded: Green ✅, Blue 👍, Yellow ⚠️, Red ❌

---

### Test 5: Standalone ATS Checker (1 minute)
1. Login as HR
2. Go to **"ATS Checker"** tab ← NEW!
3. Upload any resume (doesn't need to be from a student)
4. ✅ Get instant analysis!
5. Great for screening email applicants!

---

## 📊 Default Credentials

### Create Your Own:
```
Register → Choose Role (Student/HR) → Login
```

### Or Use Google:
```
Click "Continue with Google" → Done! ✅
```

---

## 🎨 Login Page Preview

```
┌─────────────────────────────────┐
│     🔷 Welcome Back             │
│  Sign in to your dashboard      │
├─────────────────────────────────┤
│  Email: [_________________]     │
│  Password: [_________________]  │
│  [Forgot Password?]             │
│                                 │
│  [     Sign In     ]            │
│                                 │
│  ─── Or continue with ───       │
│                                 │
│  [🔴 Continue with Google]      │ ← NEW!
│                                 │
│  Don't have account? Register   │
└─────────────────────────────────┘
```

---

## 🎯 Key URLs

| Service | URL | Status |
|---------|-----|--------|
| Frontend | http://localhost:5173 | ✅ Ready |
| Backend API | http://localhost:8081 | ✅ Ready |
| H2 Database | http://localhost:8081/h2-console | ✅ Ready |
| Google OAuth | /oauth2/authorization/google | ✅ Ready |

---

## 🔍 Check If Everything Works

### Backend Health Check:
```bash
curl http://localhost:8081/api/auth/register
```
Should return: Method Not Allowed (means it's running!)

### Frontend Check:
Open: http://localhost:5173
Should see: Beautiful landing page ✅

### Google OAuth Check:
Click "Continue with Google"
Should redirect to: Google login page ✅

---

## 🎨 What Each Role Sees

### Student Dashboard (4 Tabs):
```
1. Overview     → Stats, recent activity
2. ATS Scanner  → Upload resume, get scores ⭐
3. Assessments  → Tests, results
4. Interviews   → Schedule, history
```

### HR Dashboard (5 Tabs):
```
1. Pipeline       → Kanban with ATS scores ⭐
2. All Candidates → Table with ATS scores ⭐
3. ATS Checker    → Upload any resume ⭐
4. Question Bank  → Manage questions
5. Analytics      → Hiring metrics
```

---

## 🚨 Troubleshooting

### Issue: "Failed to send reset email"
**Solution:** Configure Gmail SMTP (see Setup Step 2)

### Issue: "redirect_uri_mismatch" (Google)
**Solution:** Add redirect URI in Google Console (see Setup Step 1)

### Issue: Backend won't start
**Solution:** Check if port 8081 is free
```bash
# Windows
netstat -ano | findstr :8081
```

### Issue: Frontend won't start
**Solution:** Check if port 5173 is free, run `npm install`

---

## 📋 Feature Checklist

Test these features:

- [ ] **Google OAuth Login** - Click "Continue with Google"
- [ ] **Regular Login** - Email + Password
- [ ] **Registration** - Create STUDENT/HR account
- [ ] **Forgot Password** - Email reset link
- [ ] **ATS Scanner (Student)** - Upload resume, see scores
- [ ] **ATS Scores (HR)** - See student scores automatically
- [ ] **Standalone ATS (HR)** - Upload any resume
- [ ] **Candidate Pipeline** - Drag-and-drop Kanban
- [ ] **Question Bank** - Create/edit questions
- [ ] **Send Invitation** - Email with credentials

---

## 🎉 You're Ready!

### Next Steps:

1. ✅ **Test Google login** - Main new feature!
2. ✅ **Upload a resume as Student** - See ATS scores
3. ✅ **Check HR dashboard** - See student scores automatically
4. ✅ **Try standalone ATS checker** - Analyze any resume
5. ✅ **Test forgot password** - Email with black text

---

## 📚 Documentation

Detailed docs in these files:

- `GOOGLE_OAUTH_SETUP.md` - Google OAuth details
- `ATS_SCORE_VISIBILITY_FEATURE.md` - HR ATS features
- `EMAIL_SETUP_GUIDE.md` - Email configuration
- `COMPLETE_PROJECT_SUMMARY.md` - Full feature list

---

## 💡 Quick Tips

### For Students:
- Upload your resume in **ATS Scanner** tab
- Get instant feedback and suggestions
- Improve based on recommendations
- Your score is visible to HR automatically!

### For HR:
- See all candidate ATS scores in Pipeline/Candidates tabs
- Use **ATS Checker** tab for quick resume screening
- Drag candidates through pipeline stages
- Send invitations with auto-generated credentials

---

## 🎯 Everything Works!

**Your AI Interview Platform is fully functional with:**

✅ Google OAuth (Continue with Google)  
✅ ATS Scanner with auto-save  
✅ HR sees all student ATS scores  
✅ Forgot password with email  
✅ Candidate pipeline Kanban  
✅ Professional UI throughout  

**Start testing now!** 🚀

---

## 📞 Need Help?

Check the detailed documentation files or review the code comments!

**Happy Testing!** 🎉
