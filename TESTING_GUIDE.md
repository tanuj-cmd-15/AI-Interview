# Testing Guide - AI Interview Platform

## Current Status ✅

### Backend
- **Status**: Running
- **Port**: 8081
- **URL**: http://localhost:8081
- **Database**: H2 in-memory
- **Process**: Terminal 2 (mvn spring-boot:run)

### Frontend
- **Status**: Not running (needs to be started)
- **Port**: 5173 (when started)
- **URL**: http://localhost:5173 (when started)

---

## Start Frontend

Open a new terminal and run:

```bash
cd frontend-react
npm install  # If not already installed
npm run dev
```

Or use Vite:
```bash
cd frontend-react
npx vite
```

The frontend should start on **http://localhost:5173**

---

## Test Scenarios

### 1. Google OAuth Login Test

#### Prerequisites
- Backend running on port 8081 ✅
- Frontend running on port 5173
- Google OAuth credentials configured ✅

#### Steps
1. **Navigate to Login Page**
   - Open: http://localhost:5173/login
   - Verify "Continue with Google" button is visible

2. **Click Google Login Button**
   - Click "Continue with Google"
   - Should redirect to Google consent screen
   - URL should be: `https://accounts.google.com/o/oauth2/v2/auth?...`

3. **Grant Permissions**
   - Select Google account
   - Grant email and profile permissions
   - Google will redirect back to backend

4. **Backend Processing**
   - Backend receives callback at: `http://localhost:8081/login/oauth2/code/google`
   - `OAuth2LoginSuccessHandler` processes the login
   - Creates user if doesn't exist or uses existing user
   - Generates JWT token
   - Redirects to: `http://localhost:5173/oauth2/redirect?token={jwt}&role={role}`

5. **Frontend Token Processing**
   - `OAuth2RedirectHandler` extracts token and role
   - Stores token in localStorage
   - Updates AuthContext
   - Redirects to dashboard

6. **Verify Dashboard Access**
   - For STUDENT: http://localhost:5173/student/dashboard
   - For HR: http://localhost:5173/hr/dashboard

#### Expected Results
- ✅ User successfully logged in
- ✅ Token stored in localStorage (check browser DevTools > Application > Local Storage)
- ✅ Redirected to correct dashboard based on role
- ✅ User can access protected routes

#### Check Database
1. Open H2 Console: http://localhost:8081/h2-console
2. Connection details:
   - JDBC URL: `jdbc:h2:mem:testdb`
   - Username: `sa`
   - Password: (leave blank)
3. Run query:
   ```sql
   SELECT id, email, name, role, auth_provider, is_active 
   FROM users 
   WHERE auth_provider = 'GOOGLE';
   ```
4. Verify new user created with:
   - auth_provider = 'GOOGLE'
   - role = 'STUDENT' (default)
   - is_active = true
   - password_hash = '' (empty for OAuth users)

---

### 2. Regular Login Test (Email/Password)

#### Steps
1. Navigate to: http://localhost:5173/login
2. Enter email and password
3. Click "Sign In"
4. Should redirect to appropriate dashboard

#### Test Credentials
Create a test user first by registering at: http://localhost:5173/register

---

### 3. Forgot Password Flow Test

#### Steps
1. **Request Password Reset**
   - Navigate to: http://localhost:5173/login
   - Click "Forgot Password?"
   - Enter email address
   - Click "Send Reset Link"
   - Should see success message

2. **Check Email (if configured)**
   - Open email inbox
   - Find password reset email
   - Verify email text is black on white background ✅
   - Verify reset link format: `http://localhost:5173/reset-password?token={uuid}`
   - Token expires in 24 hours ✅

3. **Reset Password**
   - Click reset link in email
   - Should open: http://localhost:5173/reset-password?token={token}
   - Enter new password
   - Confirm new password
   - Click "Reset Password"
   - Should see success message

4. **Login with New Password**
   - Navigate to login page
   - Use email and new password
   - Should successfully log in

#### Verify in Database
```sql
SELECT * FROM password_reset_tokens;
```
- Token should have `used = true` after successful reset
- Token should be deleted after 24 hours

---

### 4. ATS Resume Scanner Test (Student)

#### Steps
1. **Login as Student**
   - Navigate to: http://localhost:5173/login
   - Login with student credentials

2. **Upload Resume**
   - Click "ATS Scanner" tab
   - Upload resume (PDF or DOCX)
   - Click "Analyze Resume"

3. **View ATS Score**
   - Should see circular progress indicators:
     - Overall Score (0-100)
     - Format Score (0-100)
     - Keyword Score (0-100)
     - Content Score (0-100)
   - Should see color-coded suggestions:
     - Red (Critical): Score < 50
     - Yellow (Warning): Score 50-75
     - Green (Success): Score > 75

4. **Verify Database Storage**
   ```sql
   SELECT * FROM resume_ats_scores;
   ```
   - Score should be automatically saved ✅
   - user_id should match logged-in student

---

### 5. HR ATS Score Visibility Test

#### Steps
1. **Login as HR**
   - Navigate to: http://localhost:5173/login
   - Login with HR credentials

2. **View Candidate Pipeline**
   - Click "Pipeline" tab
   - Should see candidates in different stages
   - Each candidate card should show:
     - ATS Score badge (color-coded)
     - "View ATS Score" button

3. **View Individual ATS Score**
   - Click "View ATS Score" on any candidate
   - Modal should open showing:
     - Overall Score
     - Format Score
     - Keyword Score
     - Content Score
     - Detailed suggestions
   - If no score exists, should show "No ATS score available"

4. **Upload Resume for Candidate**
   - In ATS modal, click "Upload Resume"
   - Select resume file
   - Should analyze and display score
   - Score saved to database ✅

5. **Standalone ATS Checker**
   - Click "ATS Checker" tab
   - Upload any resume (not tied to candidate)
   - Should analyze and display score
   - Can be used for quick resume checks

6. **View Candidates Table**
   - Click "Candidates" tab
   - Table should show ATS scores for all candidates
   - Color-coded badges for quick reference

---

### 6. Email Notification Test

#### Prerequisites
Configure email in `backend-java/src/main/resources/application.yml`:

```yaml
spring:
  mail:
    username: your-email@gmail.com
    password: your-app-password  # Gmail App Password
```

Or set environment variables:
```bash
export MAIL_USERNAME=your-email@gmail.com
export MAIL_PASSWORD=your-app-password
```

#### Steps
1. **Send Interview Invitation (HR)**
   - Login as HR
   - Navigate to "Candidates" or "Pipeline"
   - Click "Send Invitation" on a candidate
   - Enter interview details
   - Click "Send"

2. **Check Email**
   - Open candidate's email inbox
   - Should receive "Interview Invitation" email
   - Email should contain:
     - Black text on white background ✅
     - Candidate name
     - Interview type
     - Login credentials (email + temporary password)
     - "Login to Platform" button
     - Security warning to change password

3. **Password Reset Email**
   - Follow "Forgot Password Flow Test" above
   - Verify email formatting:
     - Black text ✅
     - White background ✅
     - Reset link button
     - 24-hour expiry notice

---

## Browser DevTools Debugging

### Check Console Logs
1. Open DevTools (F12)
2. Go to Console tab
3. Look for:
   - Network requests to `/api/auth/login`
   - OAuth redirect URLs
   - Token storage confirmations
   - Error messages

### Check Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Monitor:
   - API calls to backend (http://localhost:8081/api/*)
   - OAuth redirects
   - Response status codes (200, 401, 403, etc.)
   - Response payloads

### Check Local Storage
1. Open DevTools (F12)
2. Go to Application tab
3. Expand Local Storage > http://localhost:5173
4. Verify:
   - `token` key exists after login
   - Token is JWT format (3 parts separated by dots)

### Check Cookies
1. Open DevTools (F12)
2. Go to Application tab
3. Check Cookies > http://localhost:5173
4. OAuth flow may use cookies temporarily

---

## Backend API Testing (Using curl or Postman)

### 1. Register User
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123",
    "role": "STUDENT"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Get Current User (with token)
```bash
curl -X GET http://localhost:8081/api/auth/me \
  -H "Authorization: Bearer {your-jwt-token}"
```

### 4. Forgot Password
```bash
curl -X POST http://localhost:8081/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

### 5. Reset Password
```bash
curl -X POST http://localhost:8081/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "{reset-token-from-email}",
    "newPassword": "newpassword123"
  }'
```

### 6. Upload Resume (Student)
```bash
curl -X POST http://localhost:8081/api/resume/upload \
  -H "Authorization: Bearer {student-jwt-token}" \
  -F "file=@/path/to/resume.pdf"
```

### 7. Analyze ATS Score
```bash
curl -X POST http://localhost:8081/api/resume/analyze-ats \
  -H "Authorization: Bearer {jwt-token}" \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "Your resume text here..."
  }'
```

---

## Common Issues & Solutions

### Issue 1: "CORS Error"
**Symptom**: Browser console shows CORS policy error  
**Solution**: 
- Verify backend is running on port 8081
- Check `application.yml` CORS configuration includes `http://localhost:5173`
- Clear browser cache

### Issue 2: "Invalid redirect URI" (Google OAuth)
**Symptom**: Google shows error after consent  
**Solution**:
- Verify Google Cloud Console has correct redirect URI: `http://localhost:8081/login/oauth2/code/google`
- Check `application.yml` has correct client ID and secret

### Issue 3: Token not stored after OAuth
**Symptom**: User redirected but not logged in  
**Solution**:
- Check browser console for errors
- Verify `OAuth2RedirectHandler` is parsing token from URL
- Check localStorage for token

### Issue 4: Email not sent
**Symptom**: No email received after password reset  
**Solution**:
- Check `application.yml` email configuration
- Verify Gmail App Password (not regular password)
- Check backend logs for email errors
- Check spam folder

### Issue 5: ATS score not visible to HR
**Symptom**: HR cannot see student ATS scores  
**Solution**:
- Verify student uploaded resume (triggers auto-save)
- Check `resume_ats_scores` table in H2 console
- Verify `HRService.getAllCandidates()` includes ATS score join
- Check `InterviewDTO` has `atsScore` field

### Issue 6: Backend won't start
**Symptom**: Compilation errors or port already in use  
**Solution**:
- Check port 8081 is not in use: `netstat -ano | findstr :8081`
- Verify all Java files compile without errors
- Check `application.yml` syntax
- Clear Maven cache: `mvn clean`

---

## Database Verification Queries

### Check Users Table
```sql
SELECT * FROM users;
```

### Check OAuth Users
```sql
SELECT email, name, role, auth_provider 
FROM users 
WHERE auth_provider = 'GOOGLE';
```

### Check Password Reset Tokens
```sql
SELECT u.email, prt.token, prt.expires_at, prt.used, prt.created_at
FROM password_reset_tokens prt
JOIN users u ON prt.user_id = u.id;
```

### Check ATS Scores
```sql
SELECT u.email, ras.overall_score, ras.format_score, 
       ras.keyword_score, ras.content_score, ras.created_at
FROM resume_ats_scores ras
JOIN users u ON ras.user_id = u.id;
```

### Check Interviews with ATS Scores
```sql
SELECT i.id, u.email AS candidate_email, i.status, i.pipeline_stage,
       ras.overall_score AS ats_score
FROM interviews i
JOIN users u ON i.candidate_id = u.id
LEFT JOIN resume_ats_scores ras ON ras.user_id = u.id;
```

---

## Performance Testing

### Load Testing (Optional)
Use Apache Bench (ab) or JMeter to test:

```bash
# Test login endpoint
ab -n 100 -c 10 -p login.json -T application/json http://localhost:8081/api/auth/login

# Test resume upload
ab -n 50 -c 5 http://localhost:8081/api/resume/upload
```

---

## Security Checklist

- [ ] Passwords are hashed with BCrypt ✅
- [ ] JWT tokens have expiration (24 hours) ✅
- [ ] Password reset tokens expire (24 hours) ✅
- [ ] Password reset tokens can only be used once ✅
- [ ] OAuth users have no password stored ✅
- [ ] CORS configured to allow only frontend origin ✅
- [ ] SQL injection prevented by JPA ✅
- [ ] File upload size limited (10MB) ✅
- [ ] Sensitive endpoints require authentication ✅
- [ ] Role-based access control implemented ✅

---

## Next Steps After Testing

1. **Fix any bugs found during testing**
2. **Configure production email service**
3. **Set up production Google OAuth credentials**
4. **Deploy to production environment**
5. **Set up monitoring and logging**
6. **Add comprehensive error handling**
7. **Implement rate limiting**
8. **Add API documentation (Swagger)**
9. **Set up automated testing**
10. **Configure production database (PostgreSQL/MySQL)**

---

## Support & Resources

- **Backend URL**: http://localhost:8081
- **Frontend URL**: http://localhost:5173
- **H2 Console**: http://localhost:8081/h2-console
- **API Docs**: (Add Swagger UI later)

**Testing Date**: June 19, 2026  
**Status**: Ready for Testing ✅
