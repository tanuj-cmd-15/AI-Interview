# Quick Start Guide 🚀

## Current Status
- ✅ Backend is running on port 8081
- ⏳ Frontend needs to be started

---

## Start the Frontend

Open a **new terminal** and run:

```bash
cd frontend-react
npm run dev
```

Frontend will start on: **http://localhost:5173**

---

## Test Google OAuth Login (5 minutes)

### Step 1: Open Login Page
Navigate to: **http://localhost:5173/login**

### Step 2: Click "Continue with Google"
- You'll be redirected to Google's login page
- Select your Google account
- Grant email and profile permissions

### Step 3: You're Logged In!
- Google redirects back to the app
- You'll be automatically logged in
- Redirected to your dashboard (Student or HR)

### Step 4: Verify in Database
1. Open H2 Console: **http://localhost:8081/h2-console**
2. Connection:
   - JDBC URL: `jdbc:h2:mem:testdb`
   - Username: `sa`
   - Password: (leave blank)
3. Run query:
   ```sql
   SELECT * FROM users WHERE auth_provider = 'GOOGLE';
   ```
4. You should see your Google account!

---

## Test Regular Login

### Step 1: Register a Test User
Navigate to: **http://localhost:5173/register**

Fill in:
- Email: `test@example.com`
- Name: `Test User`
- Password: `password123`
- Role: `STUDENT` or `HR`

### Step 2: Login
Navigate to: **http://localhost:5173/login**

Use your credentials:
- Email: `test@example.com`
- Password: `password123`

---

## Test ATS Resume Scanner (Student)

### Step 1: Login as Student
Use your student credentials or Google OAuth

### Step 2: Upload Resume
1. Click **"ATS Scanner"** tab
2. Click **"Upload Resume"**
3. Select a PDF or DOCX resume
4. Click **"Analyze Resume"**

### Step 3: View Your Score
You'll see:
- 📊 Overall Score (0-100)
- 📄 Format Score
- 🔑 Keyword Score
- ✍️ Content Score
- 💡 Color-coded suggestions

---

## Test HR Features

### Step 1: Login as HR
Register as HR role or change existing user

### Step 2: View Candidate Pipeline
1. Click **"Pipeline"** tab
2. See candidates in different stages:
   - Applied
   - Screening
   - Assessment
   - Interview
   - Offer
   - Hired

### Step 3: View ATS Scores
- Each candidate card shows ATS score badge
- Click **"View ATS Score"** to see details
- Green = Good (>75), Yellow = Fair (50-75), Red = Needs Work (<50)

### Step 4: Use ATS Checker
1. Click **"ATS Checker"** tab
2. Upload any resume (not tied to a candidate)
3. Get instant ATS analysis

---

## Test Password Reset

### Step 1: Click "Forgot Password"
On login page, click **"Forgot Password?"**

### Step 2: Enter Email
Enter the email address for your account

### Step 3: Check Console (Email Not Configured Yet)
- Backend logs will show reset link
- Or configure email in `application.yml`:
  ```yaml
  spring:
    mail:
      username: your-email@gmail.com
      password: your-gmail-app-password
  ```

### Step 4: Use Reset Link
Navigate to: `http://localhost:5173/reset-password?token={token}`

Enter new password and confirm

---

## View Backend Logs

Backend is running in Terminal 2. To see logs:

```bash
# In your IDE or terminal, check Terminal 2
# Logs show all API calls, database queries, and errors
```

---

## Common URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | React app |
| Backend API | http://localhost:8081/api | REST API |
| H2 Console | http://localhost:8081/h2-console | Database viewer |
| Login | http://localhost:5173/login | Login page |
| Register | http://localhost:5173/register | Registration |
| Student Dashboard | http://localhost:5173/student/dashboard | Student view |
| HR Dashboard | http://localhost:5173/hr/dashboard | HR view |

---

## Troubleshooting

### Frontend won't start?
```bash
cd frontend-react
npm install
npm run dev
```

### Backend not responding?
Check Terminal 2 - backend should be running on port 8081

### CORS errors?
- Verify backend is on port 8081
- Verify frontend is on port 5173
- Clear browser cache

### Can't login with Google?
- Verify backend is running
- Check Google Cloud Console configuration
- Check browser console for errors

### ATS scores not showing?
- Upload a resume as student first
- Refresh HR dashboard
- Check H2 console for `resume_ats_scores` table

---

## Stop Services

### Stop Backend
In Terminal 2, press `Ctrl+C`

### Stop Frontend
In your frontend terminal, press `Ctrl+C`

---

## Need More Help?

Read the detailed guides:
- 📖 `TESTING_GUIDE.md` - Comprehensive testing instructions
- 🔐 `GOOGLE_OAUTH_IMPLEMENTATION_COMPLETE.md` - OAuth details
- 📋 `SESSION_COMPLETE_SUMMARY.md` - Complete feature list

---

## Quick Tips

✨ **Use Chrome DevTools** (F12) to debug:
- Console tab for errors
- Network tab for API calls
- Application > Local Storage for tokens

✨ **Check H2 Console** to verify:
- User accounts created
- ATS scores saved
- Password reset tokens

✨ **Watch Backend Logs** for:
- API requests
- Database queries
- Email sending
- Errors and exceptions

---

**You're all set!** 🎉

Start the frontend and begin testing. The backend is already running and ready.

**First Test**: Google OAuth Login  
**Time**: 5 minutes  
**Difficulty**: Easy  

Good luck! 🚀
