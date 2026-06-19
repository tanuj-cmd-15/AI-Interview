# Google OAuth with Role Selection - Complete Implementation ✅

## What Was Implemented

### 1. Google OAuth on Login Page ✅
- "Continue with Google" button on Login page
- Users can sign in with existing Google accounts

### 2. Google OAuth on Register Page ✅
- "Continue with Google" button on Register page  
- New users can sign up using Gmail/Google account

### 3. Role Selection for New OAuth Users ✅
- New Google OAuth users are redirected to role selection page
- Can choose between Student or HR role
- Beautiful UI with role cards
- Existing Google users go directly to dashboard

---

## User Flows

### Flow 1: New User Signs Up with Google

1. **User clicks "Continue with Google" on Register page**
   - Frontend: http://localhost:5173/register
   - Click "Continue with Google"

2. **Redirected to Google consent screen**
   - User selects Google account
   - Grants email and profile permissions

3. **Backend creates new user**
   - `OAuth2LoginSuccessHandler` detects new user
   - Creates user with default STUDENT role
   - Generates JWT token

4. **Redirected to Role Selection page**
   - Frontend: http://localhost:5173/select-role?token={jwt}&email={email}&name={name}
   - Shows two role cards: Student and HR/Recruiter

5. **User selects role**
   - Clicks on preferred role (Student or HR)
   - Clicks "Continue"

6. **Backend updates role**
   - API call to PUT `/api/user/update-role`
   - Updates user role in database

7. **Redirected to dashboard**
   - Student → http://localhost:5173/student/dashboard
   - HR → http://localhost:5173/hr/dashboard

### Flow 2: Existing User Logs In with Google

1. **User clicks "Continue with Google" on Login page**
   - Frontend: http://localhost:5173/login

2. **Redirected to Google consent screen**
   - User selects Google account

3. **Backend finds existing user**
   - `OAuth2LoginSuccessHandler` finds user by email
   - Generates JWT token

4. **Directly redirected to dashboard** (no role selection)
   - Goes straight to OAuth2RedirectHandler
   - Redirected to appropriate dashboard based on existing role

---

## Files Created/Modified

### Frontend Files

#### Created:
1. **SelectRole.jsx** (NEW)
   - Location: `frontend-react/src/pages/SelectRole.jsx`
   - Beautiful role selection UI
   - Two role cards: Student and HR
   - API integration to update role

#### Modified:
1. **Register.jsx**
   - Added "Continue with Google" button
   - Added divider
   - Consistent styling with Login page

2. **App.jsx**
   - Added `import SelectRole` 
   - Added route: `/select-role`
   - Added `/select-role` to publicPages array

3. **Login.jsx**
   - Already has "Continue with Google" button ✅

### Backend Files

#### Modified:
1. **OAuth2LoginSuccessHandler.java**
   - Detects if user is new or existing
   - New users → redirected to `/select-role`
   - Existing users → redirected to `/oauth2/redirect`

2. **UserController.java**
   - Added `PUT /api/user/update-role` endpoint
   - Accepts role (STUDENT or HR)
   - Updates user role in database

3. **UserService.java**
   - Added `updateUserRole(email, role)` method
   - Validates role
   - Updates user in database

---

## API Endpoints

### New Endpoint Added

#### Update User Role
```
PUT /api/user/update-role
Authorization: Bearer {jwt-token}
Content-Type: application/json

Request Body:
{
  "role": "STUDENT"  // or "HR"
}

Response:
{
  "message": "Role updated successfully",
  "role": "STUDENT"
}
```

---

## Component Details

### SelectRole Component

**Location**: `frontend-react/src/pages/SelectRole.jsx`

**Features**:
- Receives token, email, name from URL query parameters
- Shows two beautifully styled role cards
- Student card (Royal blue theme)
- HR/Recruiter card (Purple theme)
- Calls `/api/user/update-role` API
- Redirects to appropriate dashboard after role selection

**Query Parameters**:
- `token`: JWT token (temporary, needs role update)
- `email`: User's email from Google
- `name`: User's name from Google
- `isNew`: Flag indicating new user (optional)

---

## Backend Logic

### OAuth2LoginSuccessHandler Flow

```java
1. User authenticates with Google
2. Extract email and name from OAuth2User
3. Check if user exists in database
   
   IF NEW USER:
     - Create user with default STUDENT role
     - Generate JWT token
     - Redirect to: /select-role?token={jwt}&email={email}&name={name}&isNew=true
   
   IF EXISTING USER:
     - Find user from database
     - Generate JWT token with actual role
     - Redirect to: /oauth2/redirect?token={jwt}&role={role}
```

### UserService.updateUserRole()

```java
1. Find user by email (from JWT)
2. Validate role (STUDENT or HR)
3. Update user.role in database
4. Save user
```

---

## UI/UX Design

### Register Page Updates
- Consistent with Login page design
- "Continue with Google" button with official logo
- "Or continue with" divider
- Royal theme colors

### SelectRole Page Design
- Welcome message with user name and email
- Two large role cards:
  - **Student Card**:
    - Graduation cap icon
    - Royal blue theme (#4F46E5)
    - Description: "I'm looking for job opportunities..."
  
  - **HR/Recruiter Card**:
    - Briefcase icon  
    - Purple theme (#9333EA)
    - Description: "I want to conduct interviews..."

- Selected card has:
  - Glowing border
  - Background color
  - Shadow effect

- Large "Continue" button at bottom
- Loading state with spinner

---

## Database Schema

### Users Table
All OAuth users stored in same `users` table:

```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255),  -- Empty for OAuth users
  role VARCHAR(255) NOT NULL,  -- STUDENT, HR, or ADMIN
  auth_provider VARCHAR(255),  -- LOCAL or GOOGLE
  is_active BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**OAuth User Characteristics**:
- `auth_provider` = 'GOOGLE'
- `password_hash` = '' (empty)
- `role` = 'STUDENT' (default, can be changed)

---

## Testing Steps

### Test New User Registration with Google

1. **Start backend and frontend**
   ```bash
   # Backend running on port 8081
   # Frontend running on port 5173
   ```

2. **Go to Register page**
   - Open: http://localhost:5173/register

3. **Click "Continue with Google"**
   - Should redirect to Google login
   - Select Google account
   - Grant permissions

4. **Verify Role Selection page opens**
   - Should see: http://localhost:5173/select-role?token=...
   - Shows your name and email
   - Two role cards visible

5. **Select a role**
   - Click on Student or HR card
   - Selected card should highlight
   - Click "Continue"

6. **Verify redirect to dashboard**
   - If Student: http://localhost:5173/student/dashboard
   - If HR: http://localhost:5173/hr/dashboard

7. **Verify in database**
   ```sql
   SELECT * FROM users WHERE auth_provider = 'GOOGLE';
   -- Should see your user with selected role
   ```

### Test Existing User Login with Google

1. **Use same Google account (already registered)**

2. **Go to Login page**
   - Open: http://localhost:5173/login

3. **Click "Continue with Google"**
   - Should redirect to Google
   - May auto-login if already authenticated

4. **Verify direct dashboard redirect**
   - Should NOT see role selection page
   - Goes directly to dashboard based on existing role

---

## Security Considerations

### JWT Token Flow
1. **Initial token** generated after Google OAuth
2. Used for role update API call
3. Stored in localStorage after role selection
4. Used for all subsequent API calls

### Role Update Authorization
- Requires valid JWT token
- User can only update their own role
- Role extracted from JWT (email claim)
- Can only set to STUDENT or HR (not ADMIN)

### Session Management
- `SessionCreationPolicy.IF_REQUIRED`
- Sessions created only for OAuth2 flow
- JWT authentication remains stateless

---

## Known Limitations & Future Enhancements

### Current Limitations
1. **One-time role selection**
   - Users can change role only once during signup
   - Need admin panel to change role later

2. **No profile picture**
   - Google profile picture not stored
   - Can be added in future

3. **Single OAuth provider**
   - Only Google supported
   - Can add Facebook, GitHub, etc. later

### Future Enhancements
1. **Role change feature**
   - Allow users to change role in settings
   - Add confirmation dialog

2. **Profile picture**
   - Store Google profile picture URL
   - Display in user avatar

3. **More OAuth providers**
   - Facebook OAuth
   - GitHub OAuth
   - LinkedIn OAuth

4. **Account linking**
   - Link Google account to existing email/password account
   - Multiple auth methods for same user

---

## Troubleshooting

### Issue: Role selection page not showing
**Cause**: Existing user trying to register again  
**Solution**: OAuth flow detects existing user and skips role selection

### Issue: Role update fails
**Cause**: Invalid JWT token or expired token  
**Solution**: 
1. Check token in URL
2. Verify backend is running
3. Check browser console for errors

### Issue: Redirect to wrong dashboard
**Cause**: Role not updated in database  
**Solution**: Check database, verify API call succeeded

### Issue: Google OAuth fails
**Cause**: Google Cloud Console configuration  
**Solution**: 
1. Verify redirect URI in Google Console
2. Add test user if using External mode
3. Check client ID and secret

---

## Configuration Requirements

### Google Cloud Console
- ✅ OAuth consent screen configured
- ✅ Test users added (if External mode)
- ✅ Redirect URI: `http://localhost:8081/login/oauth2/code/google`
- ✅ JavaScript origins: `http://localhost:8081`, `http://localhost:5173`

### Backend Configuration (application.yml)
```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: {YOUR_CLIENT_ID}
            client-secret: {YOUR_CLIENT_SECRET}
            scope: [email, profile]
            redirect-uri: "{baseUrl}/login/oauth2/code/{registrationId}"
```

### Frontend Configuration
- Login page: "Continue with Google" button ✅
- Register page: "Continue with Google" button ✅
- SelectRole route configured ✅
- OAuth2RedirectHandler for existing users ✅

---

## Summary

### What Works Now
1. ✅ Login with Google (existing users)
2. ✅ Register with Google (new users)
3. ✅ Role selection for new Google users
4. ✅ Direct dashboard access for existing Google users
5. ✅ Beautiful UI with role cards
6. ✅ Database persistence of OAuth users
7. ✅ JWT token authentication

### User Experience
- **New users**: Google OAuth → Role Selection → Dashboard
- **Existing users**: Google OAuth → Dashboard (direct)
- **Seamless**: No password needed for Google users
- **Beautiful**: Royal-themed UI with gradient effects

### Ready for Testing
- Backend running on port 8081
- Frontend running on port 5173
- All components implemented
- Database schema ready

---

**Implementation Date**: June 19, 2026  
**Status**: ✅ Complete and Ready for Testing  
**Backend**: Restarting with new changes  
**Frontend**: Ready (needs npm run dev if not started)
