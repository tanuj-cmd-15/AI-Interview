# Email Configuration Setup Guide

## Issue: "Failed to send reset email"

The email is not sending because the email configuration needs real SMTP credentials.

---

## 🔧 Quick Fix Options

### Option 1: Use Gmail SMTP (Recommended for Testing)

#### Step 1: Generate Gmail App Password

1. Go to your Gmail account
2. Click your profile picture → **Manage your Google Account**
3. Go to **Security** tab
4. Enable **2-Step Verification** (if not already enabled)
5. Go back to Security → Search for **App passwords**
6. Select **Mail** and **Windows Computer**
7. Click **Generate**
8. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

#### Step 2: Set Environment Variables

**Windows (PowerShell):**
```powershell
$env:MAIL_USERNAME="your-email@gmail.com"
$env:MAIL_PASSWORD="abcd efgh ijkl mnop"
```

**Windows (CMD):**
```cmd
set MAIL_USERNAME=your-email@gmail.com
set MAIL_PASSWORD=abcdefghijklmnop
```

**Linux/Mac:**
```bash
export MAIL_USERNAME="your-email@gmail.com"
export MAIL_PASSWORD="abcdefghijklmnop"
```

#### Step 3: Restart Spring Boot Application

Stop and restart your backend server after setting environment variables.

---

### Option 2: Update application.yml Directly (For Testing Only)

**⚠️ WARNING: Never commit real passwords to Git!**

Edit `backend-java/src/main/resources/application.yml`:

```yaml
spring:
  mail:
    host: smtp.gmail.com
    port: 587
    username: your-email@gmail.com  # Replace with your Gmail
    password: your-app-password      # Replace with app password
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
            required: true
```

---

### Option 3: Use Mailtrap (For Development/Testing)

Mailtrap catches all emails without sending them to real addresses.

1. Sign up at https://mailtrap.io (free)
2. Get your credentials
3. Update `application.yml`:

```yaml
spring:
  mail:
    host: smtp.mailtrap.io
    port: 2525
    username: your-mailtrap-username
    password: your-mailtrap-password
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
```

---

### Option 4: Disable Email for Testing

If you just want to test other features without email:

Update `EmailService.java` to log instead of sending:

```java
@Async
public void sendPasswordResetEmail(String toEmail, String userName, String resetToken) {
    log.info("=".repeat(50));
    log.info("PASSWORD RESET EMAIL (Not sent - Email disabled)");
    log.info("To: {}", toEmail);
    log.info("Reset Token: {}", resetToken);
    log.info("Reset URL: {}/reset-password?token={}", frontendUrl, resetToken);
    log.info("=".repeat(50));
    
    // Uncomment below when email is configured
    // try {
    //     MimeMessage message = mailSender.createMimeMessage();
    //     ... rest of email code
    // }
}
```

---

## 🎨 Email Text Color Fixed

I've updated the email template to use **black text** on **white background**:

### Changes Made:
```css
body { color: #000000; background-color: #ffffff; }
.content h2 { color: #000000; }
.content p { color: #000000; }
.content li { color: #000000; }
```

All text is now black and readable!

---

## 🧪 Test Email Configuration

### Test 1: Check Spring Boot Logs

Look for email errors in console:
```
ERROR c.a.service.EmailService - Failed to send password reset email
```

### Test 2: Try Forgot Password Flow

1. Go to `/forgot-password`
2. Enter: `pawartushar1215@gmail.com`
3. Click "Send Reset Link"
4. Check logs for error messages

### Common Error Messages:

**"Authentication failed"**
- Wrong username/password
- App password not enabled
- 2-Step Verification not enabled

**"Connection timeout"**
- SMTP host/port incorrect
- Firewall blocking port 587

**"Username and Password not accepted"**
- Need to use App Password, not regular Gmail password

---

## ✅ Verification Checklist

After configuration:

- [ ] Set MAIL_USERNAME environment variable
- [ ] Set MAIL_PASSWORD environment variable (App Password)
- [ ] Restart Spring Boot application
- [ ] Test forgot password feature
- [ ] Check email inbox
- [ ] Verify email text is black/readable
- [ ] Test reset password link

---

## 📧 Expected Email Output

After configuration, you should receive:

```
From: your-email@gmail.com
To: pawartushar1215@gmail.com
Subject: Password Reset Request - AI Interview Platform

[Email with black text on white background]
- Reset Password button
- Reset link
- 24-hour expiry warning
- Security recommendations
```

---

## 🔍 Troubleshooting

### Issue 1: "Failed to send reset email"
**Solution:** Configure Gmail App Password (see Option 1)

### Issue 2: "Username and Password not accepted"
**Solution:** Use App Password, not Gmail password

### Issue 3: Email sent but not received
**Solution:** 
- Check spam folder
- Verify Gmail allows "less secure apps"
- Use App Password instead of regular password

### Issue 4: Text is white/unreadable
**Solution:** Already fixed! Text is now black.

---

## 🚀 Quick Start (Recommended)

**For Testing:**
```bash
# Set credentials
export MAIL_USERNAME="your-gmail@gmail.com"
export MAIL_PASSWORD="your-app-password"

# Start backend
cd backend-java
mvn spring-boot:run
```

**For Production:**
- Use secure environment variables
- Never commit passwords
- Use dedicated email service (SendGrid, AWS SES, etc.)

---

## 📝 Summary

### Fixed:
✅ Email text color changed to black
✅ Background changed to white
✅ All text now readable

### Needs Configuration:
⚠️ Gmail SMTP credentials
⚠️ App Password setup
⚠️ Environment variables

**Next Steps:**
1. Generate Gmail App Password
2. Set environment variables
3. Restart backend
4. Test forgot password feature
5. Verify email received with black text

---

## 💡 For pawartushar1215@gmail.com

To test with your email:
1. Go to https://myaccount.google.com/apppasswords
2. Generate app password for "Mail"
3. Use that password in MAIL_PASSWORD
4. Test forgot password feature
5. Check your inbox

The email will now have **black text** and be readable! 📧
