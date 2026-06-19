# Quick Start Guide - Email Notification System 📧

## 🚀 What's New?

Your AI Interview Platform now has a **complete email notification system**! HR can invite candidates via email with auto-generated credentials, and students can update their passwords.

---

## ⚙️ Setup Email Configuration

### Option 1: Gmail (Recommended for Testing)

1. **Enable 2-Factor Authentication on your Gmail account**

2. **Generate App Password**:
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Scroll down and click "App passwords"
   - Select "Mail" and "Other (Custom name)"
   - Enter "AI Interview Platform"
   - Click "Generate"
   - Copy the 16-character password

3. **Set Environment Variables** (Windows):
   ```cmd
   set MAIL_USERNAME=your-email@gmail.com
   set MAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
   set FRONTEND_URL=http://localhost:5173
   ```

4. **Restart the backend** to pick up new environment variables

### Option 2: Update application.yml Directly

Edit `backend-java/src/main/resources/application.yml`:

```yaml
spring:
  mail:
    username: your-email@gmail.com
    password: your-app-password-here
```

Then restart backend.

---

## 📝 How to Use

### For HR Users

#### Step 1: Login as HR
1. Go to http://localhost:5173/login
2. Login with HR credentials
3. You'll be redirected to HR Dashboard

#### Step 2: Send Interview Invitation
1. Click on **"Candidates"** tab (if not already there)
2. Click **"Send Invitation"** button (top right, blue button with mail icon)
3. Fill in the form:

   **Required Fields**:
   - **Candidate Name**: Full name (e.g., "John Doe")
   - **Email Address**: Valid email (e.g., "john@example.com")
   - **Interview Type**: Select HR, Technical, or Combined

   **Optional Fields**:
   - **Assessment Title**: e.g., "Frontend Developer Interview"
   - **Deadline**: Select date and time

4. Click **"Send Invitation"**

#### Step 3: What Happens?
- ✅ System generates secure temporary password (e.g., `Ab3$xYz9Qm`)
- ✅ Creates new student account automatically
- ✅ Creates interview entry in database
- ✅ Sends professional email with:
  - Login credentials
  - Interview details
  - Direct login link
- ✅ Candidate appears in your candidate list

#### Step 4: View Candidate
- Candidate will appear in the candidates table
- You can mark them as "REVIEWED" after assessment
- Track their scores and progress

---

### For Students

#### Step 1: Check Your Email
After HR sends invitation, you'll receive an email with:
- **Subject**: "Interview Invitation - AI Interview Platform"
- **Username**: Your email address
- **Temporary Password**: Auto-generated secure password
- **Login Button**: Direct link to platform

#### Step 2: Login
1. Click **"Login to Platform"** button in email
2. OR go to http://localhost:5173/login
3. Enter:
   - **Username**: Your email from invitation
   - **Password**: Temporary password from email
4. Click **"Login"**

#### Step 3: Change Password (Recommended!)
1. After logging in, you'll be on Student Dashboard
2. Click **"Change Password"** button (top right, with lock icon)
3. Enter:
   - **Current Password**: The temporary password from email
   - **New Password**: Your new secure password (min 6 chars)
   - **Confirm Password**: Same as new password
4. Click **"Update Password"**
5. ✅ Password updated!
6. ✅ Confirmation email sent

#### Step 4: Use the Platform
- View your interview stats
- Upload resume
- Take assessments
- Track your progress

---

## 📧 Email Examples

### 1. Interview Invitation Email

```
Subject: Interview Invitation - AI Interview Platform

Hello John Doe,

You have been invited to take a Technical interview on our 
AI-powered platform.

📧 Your Login Credentials:
Username/Email: john.doe@example.com
Temporary Password: Ab3$xYz9Qm

⚠️ Important: For security reasons, please change your password 
after your first login.

[Login to Platform Button]

What to expect:
• AI-powered interview questions
• Real-time feedback and assessment
• Comprehensive performance analytics

Good luck with your interview!
```

### 2. Password Change Confirmation

```
Subject: Password Updated Successfully - AI Interview Platform

Hello John Doe,

Your password has been successfully updated.

If you did not make this change, please contact our support 
team immediately.
```

---

## 🧪 Testing the System

### Quick Test Flow

1. **Start both servers**:
   - Backend: http://localhost:8081 ✅
   - Frontend: http://localhost:5173 ✅

2. **Login as HR**:
   - Email: (your HR account)
   - Password: (your HR password)

3. **Send Test Invitation**:
   - Candidate Name: "Test User"
   - Email: **YOUR OWN EMAIL** (so you can see the email)
   - Interview Type: Technical
   - Click "Send Invitation"

4. **Check Your Email**:
   - Look for "Interview Invitation" email
   - Note the temporary password
   - Click login link

5. **Login as Student**:
   - Use email and password from invitation
   - Should redirect to Student Dashboard

6. **Change Password**:
   - Click "Change Password"
   - Enter current password (from email)
   - Enter new password
   - Confirm change
   - Check email for confirmation

### Expected Results
- ✅ Email received within seconds
- ✅ Login works with credentials from email
- ✅ Password change works
- ✅ Confirmation email received
- ✅ Can login with new password

---

## 🎨 UI Elements Added

### HR Dashboard
**Location**: http://localhost:5173/hr/dashboard

**New Button**:
- **"Send Invitation"** button
- Located: Top right of Candidates tab
- Icon: Mail icon (envelope)
- Color: Royal blue gradient
- Opens modal form when clicked

**Modal Features**:
- Professional form with royal theme
- Input validation
- Loading state while sending
- Error messages if fails
- Success notification

### Student Dashboard
**Location**: http://localhost:5173/student/dashboard

**New Button**:
- **"Change Password"** button
- Located: Top right next to dashboard title
- Icon: Lock icon
- Color: Outlined button style
- Opens modal form when clicked

**Modal Features**:
- Show/hide password toggles (eye icons)
- Password validation
- Confirmation password matching
- Loading state
- Success toast notification

---

## 🔒 Security Features

### Password Generation
- **Length**: 10 characters
- **Complexity**: Mix of:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Special characters (!@#$%)
- **Example**: `Ab3$xYz9Qm`

### Password Storage
- ✅ Never stored in plain text
- ✅ BCrypt hashing with salt
- ✅ Separate field `passwordHash` in database

### Email Security
- ✅ TLS/STARTTLS encryption
- ✅ SMTP authentication required
- ✅ Async sending (non-blocking)
- ✅ Connection timeout configured

---

## 🐛 Troubleshooting

### Email Not Sending?

**Check 1: Email Configuration**
```bash
# Check if environment variables are set
echo %MAIL_USERNAME%
echo %MAIL_PASSWORD%
```

**Check 2: Backend Logs**
Look for errors in backend console:
```
✅ Good: "Interview invitation email sent to: john@example.com"
❌ Bad: "Failed to send interview invitation email"
```

**Check 3: Gmail Settings**
- 2-Factor Authentication enabled?
- App Password generated?
- Using app password (not regular password)?

**Check 4: Firewall**
- Port 587 open?
- SMTP not blocked?

### Login Not Working?

**Check 1: Correct Credentials**
- Using exact email from invitation?
- Copy-pasting password from email?
- No extra spaces?

**Check 2: Account Created**
- Check HR Dashboard candidates list
- Should see candidate after invitation sent

### Password Change Failing?

**Check 1: Current Password**
- Using correct current password?
- If just created, use temporary password from email

**Check 2: New Password Requirements**
- Minimum 6 characters?
- Passwords match?

---

## 📊 System Flow Diagram

```
┌─────────────┐
│  HR Login   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│  HR Dashboard               │
│  [Send Invitation Button]   │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Fill Invitation Form       │
│  • Name: John Doe           │
│  • Email: john@example.com  │
│  • Type: Technical          │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Backend Processing         │
│  1. Generate password       │
│  2. Create account          │
│  3. Create interview        │
│  4. Send email              │
└──────┬──────────────────────┘
       │
       ├──────────────┬──────────────┐
       │              │              │
       ▼              ▼              ▼
   Database       Email Sent    HR Dashboard
   Updated        to Student    Updated
       │              │              │
       │              ▼              │
       │       ┌─────────────┐      │
       │       │ Student     │      │
       │       │ Receives    │      │
       │       │ Email       │      │
       │       └──────┬──────┘      │
       │              │              │
       │              ▼              │
       │       ┌─────────────┐      │
       │       │ Student     │      │
       │       │ Logs In     │      │
       │       └──────┬──────┘      │
       │              │              │
       │              ▼              │
       │       ┌─────────────┐      │
       │       │ Changes     │      │
       │       │ Password    │      │
       │       └──────┬──────┘      │
       │              │              │
       │              ▼              │
       │       ┌─────────────┐      │
       │       │ Gets        │      │
       │       │ Confirmation│      │
       │       │ Email       │      │
       │       └─────────────┘      │
       │                             │
       └─────────────────────────────┘
```

---

## ✅ Success Checklist

Before considering the feature complete, verify:

- [ ] Backend compiles and runs on port 8081
- [ ] Frontend runs on port 5173
- [ ] Email configuration set in application.yml or env vars
- [ ] Can login as HR user
- [ ] "Send Invitation" button visible in HR Dashboard
- [ ] Modal opens when button clicked
- [ ] Form validation works
- [ ] Invitation sends successfully
- [ ] Email received in inbox
- [ ] Can login with credentials from email
- [ ] "Change Password" button visible in Student Dashboard
- [ ] Password change modal opens
- [ ] Password change works
- [ ] Confirmation email received
- [ ] Can login with new password

---

## 🎉 You're All Set!

Your AI Interview Platform now has a complete email notification system. HR can easily invite candidates, and students receive professional emails with login credentials.

**Next Steps**:
1. Set up your email configuration
2. Test with a real email address
3. Customize email templates if needed (optional)
4. Start inviting real candidates!

**Need Help?**
- Check backend logs for errors
- Review EMAIL_SYSTEM_COMPLETE.md for technical details
- Verify email configuration is correct

---

**Status**: ✅ System Ready for Use!
