# AI Interview Platform - Authentication Backend Documentation

## Overview
This is a complete JWT-based authentication backend for the AI Interview Platform. It provides secure user registration, login, and session management with SQLite database storage.

## Features
- ✅ JWT-based authentication (flask-jwt-extended)
- ✅ Bcrypt password hashing (never stores plaintext passwords)
- ✅ Email format validation
- ✅ Password strength validation (min 8 chars, at least 1 number)
- ✅ Rate limiting (10 requests/min on auth endpoints)
- ✅ Role-based access (student/hr roles)
- ✅ SQLite database (easy upgrade to PostgreSQL)
- ✅ CORS configured for frontend (http://localhost:5173)
- ✅ Proper error handling with clear HTTP status codes
- ✅ Protected endpoints with JWT verification

## Architecture

### File Structure
```
flask/Emotion_detection_with_CNN-main/
├── app_auth.py              # Main Flask application with auth
├── extensions.py            # Flask extensions initialization
├── init_db.py              # Database initialization script
├── .env.example            # Environment variables template
├── blueprints/
│   ├── __init__.py
│   └── auth.py             # Authentication endpoints
├── models/
│   ├── __init__.py
│   └── user.py             # User model
└── config/
    └── config.py           # Configuration settings
```

### Database Schema

**User Model:**
```python
id: Integer (Primary Key)
email: String (Unique, Indexed)
password_hash: String (Bcrypt hashed)
name: String
role: String ('student' or 'hr')
auth_provider: String ('local' or 'google' - future)
created_at: DateTime
```

## Setup Instructions

### 1. Environment Setup

Create a `.env` file in the `flask/Emotion_detection_with_CNN-main/` directory:

```bash
cd flask/Emotion_detection_with_CNN-main
cp .env.example .env
```

Edit `.env` and set your secrets:
```env
SECRET_KEY=your-random-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
DATABASE_URL=sqlite:///ai_interview.db
CORS_ORIGINS=http://localhost:5173
```

**Generate secure secrets (optional):**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### 2. Install Dependencies

```bash
# Activate virtual environment
.\new_env\Scripts\Activate

# Install dependencies (already in requirements.txt)
pip install flask-sqlalchemy flask-bcrypt flask-jwt-extended flask-limiter python-dotenv
```

### 3. Initialize Database

```bash
python init_db.py
```

Expected output:
```
✓ Database tables created successfully!
✓ Database location: sqlite:///ai_interview.db
```

### 4. Run the Backend

```bash
python app_auth.py
```

Server will start on: **http://localhost:5000**

## API Endpoints

### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "SecurePass123",
  "name": "John Doe",
  "role": "student"
}
```

**Validation Rules:**
- `email`: Valid email format required
- `password`: Min 8 characters, at least 1 number
- `name`: Required
- `role`: Must be "student" or "hr" (defaults to "student")

**Success Response (201):**
```json
{
  "message": "Registration successful",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "email": "student@example.com",
    "name": "John Doe",
    "role": "student",
    "auth_provider": "local",
    "created_at": "2026-06-17T10:30:00"
  }
}
```

**Error Responses:**
- `400`: Missing fields or invalid format
- `409`: Email already registered

**Example curl command:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "SecurePass123",
    "name": "John Doe",
    "role": "student"
  }'
```

### 2. Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "SecurePass123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "email": "student@example.com",
    "name": "John Doe",
    "role": "student",
    "auth_provider": "local",
    "created_at": "2026-06-17T10:30:00"
  }
}
```

**Error Responses:**
- `400`: Missing email or password
- `401`: Invalid credentials

**Example curl command:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "SecurePass123"
  }'
```

### 3. Get Current User (Protected)
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "student@example.com",
    "name": "John Doe",
    "role": "student",
    "auth_provider": "local",
    "created_at": "2026-06-17T10:30:00"
  }
}
```

**Error Responses:**
- `401`: Missing or invalid token
- `404`: User not found

**Example curl command:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc..."
```

### 4. Health Check
**GET** `/api/health`

Check if the backend is running and connected to databases.

**Response (200):**
```json
{
  "status": "healthy",
  "database": "connected",
  "mongodb": "connected"
}
```

## Security Features

### Password Hashing
- Uses **bcrypt** for secure password hashing
- Passwords are never stored in plaintext
- Industry-standard algorithm with salt rounds

### JWT Tokens
- Tokens expire after **24 hours**
- Include user `id` and `role` in claims
- Signed with secret key (configurable via .env)

### Rate Limiting
- **10 requests per minute** on `/register` and `/login`
- Prevents brute-force attacks
- Per-IP address tracking

### Input Validation
- Email format validation (RFC compliant regex)
- Password strength enforcement
- SQL injection prevention (SQLAlchemy ORM)
- XSS prevention (automatic JSON escaping)

### CORS Protection
- Only allows requests from configured origins
- Default: `http://localhost:5173` (Vite dev server)
- Add more origins via `CORS_ORIGINS` in .env

## Frontend Integration

### 1. Store JWT Token
After successful login/register, store the token:
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const data = await response.json();
localStorage.setItem('access_token', data.access_token);
```

### 2. Include Token in Requests
For protected endpoints:
```javascript
const token = localStorage.getItem('access_token');
const response = await fetch('http://localhost:5000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### 3. Handle Token Expiration
Implement token refresh or redirect to login:
```javascript
if (response.status === 401) {
  // Token expired or invalid
  localStorage.removeItem('access_token');
  window.location.href = '/login';
}
```

## Testing Guide

### Test Registration - Success
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPass123",
    "name": "Test User",
    "role": "student"
  }'
```

Expected: `201 Created` with access token

### Test Registration - Duplicate Email
```bash
# Run the same curl command twice
```

Expected: `409 Conflict` with error message

### Test Registration - Weak Password
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "weak@example.com",
    "password": "short",
    "name": "Weak Password User",
    "role": "student"
  }'
```

Expected: `400 Bad Request` - "Password must be at least 8 characters long"

### Test Registration - No Number in Password
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nonumber@example.com",
    "password": "NoNumberPassword",
    "name": "No Number User",
    "role": "student"
  }'
```

Expected: `400 Bad Request` - "Password must contain at least one number"

### Test Login - Invalid Password
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "WrongPassword123"
  }'
```

Expected: `401 Unauthorized` - "Invalid email or password"

### Test Protected Endpoint - No Token
```bash
curl -X GET http://localhost:5000/api/auth/me
```

Expected: `401 Unauthorized` - Missing Authorization Header

### Test Protected Endpoint - Valid Token
```bash
# First login to get token
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"TestPass123"}' \
  | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

# Then use token
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

Expected: `200 OK` with user profile

## Troubleshooting

### Database File Not Found
**Error:** `sqlite3.OperationalError: unable to open database file`

**Solution:**
```bash
python init_db.py
```

### Import Errors
**Error:** `ModuleNotFoundError: No module named 'flask_sqlalchemy'`

**Solution:**
```bash
pip install flask-sqlalchemy flask-bcrypt flask-jwt-extended flask-limiter python-dotenv
```

### CORS Errors in Frontend
**Error:** `Access to fetch blocked by CORS policy`

**Solution:**
- Check `.env` file has correct `CORS_ORIGINS`
- Restart backend after changing `.env`

### Rate Limit Exceeded
**Error:** `429 Too Many Requests`

**Solution:**
- Wait 1 minute before retrying
- Or increase limit in `blueprints/auth.py`

## Future Enhancements (Out of Scope)
- Google OAuth integration
- Email verification with OTP
- Password reset flow
- Refresh token rotation
- User profile updates
- Account deletion

## Database Migration to PostgreSQL

When ready for production, update `.env`:
```env
DATABASE_URL=postgresql://username:password@host:5432/dbname
```

SQLAlchemy will automatically adapt. No code changes needed!

## Support

For issues or questions:
1. Check this documentation first
2. Review error messages in terminal
3. Enable debug mode: `app.run(debug=True)`
4. Check frontend console for CORS/network errors
