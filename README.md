# 🎯 AI Interview Platform

An AI-powered interview platform with resume ATS scanner, Google OAuth authentication, and comprehensive candidate management system.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/ai-interview-platform)

## ✨ Features

### For Students
- 📄 **ATS Resume Scanner** - Get instant feedback on resume compatibility
- 🎯 **Detailed Scoring** - Format, Keywords, Content, and Overall scores
- 💡 **Smart Suggestions** - AI-powered recommendations to improve your resume
- 📊 **Dashboard** - Track your interviews and assessments
- 🔐 **Google OAuth** - Quick sign-up with your Google account

### For HR/Recruiters
- 👥 **Candidate Management** - Manage all candidates in one place
- 🔄 **Pipeline Tracking** - 6-stage Kanban board (Applied → Hired)
- 📈 **Analytics Dashboard** - Track hiring metrics and performance
- 📧 **Email Invitations** - Send interview invites with auto-generated credentials
- ✅ **ATS Score Visibility** - View candidate resume scores at a glance
- 🔍 **Standalone ATS Checker** - Analyze any resume instantly

### Authentication & Security
- 🔑 **JWT Authentication** - Secure token-based auth
- 🔐 **Google OAuth 2.0** - One-click sign-in with Google
- 🔒 **Role-Based Access** - Student and HR role separation
- 📧 **Password Reset** - Secure email-based password recovery
- 🛡️ **CORS Protection** - Configured for production security

---

## 🏗️ Tech Stack

### Frontend
- ⚛️ **React 18** - Modern React with Hooks
- 🎨 **Tailwind CSS** - Utility-first styling
- 🧭 **React Router v6** - Client-side routing
- 🔗 **Axios** - HTTP client
- 🎭 **Lucide React** - Beautiful icons
- ⚡ **Vite** - Lightning-fast build tool

### Backend
- ☕ **Java 17** - Modern Java features
- 🍃 **Spring Boot 3.x** - Enterprise-grade framework
- 🔐 **Spring Security** - Authentication & Authorization
- 🔑 **JWT** - Stateless authentication
- 🌐 **OAuth2 Client** - Google OAuth integration
- 💾 **H2 Database** - In-memory database (dev)
- 📄 **Apache PDFBox** - PDF parsing
- 📊 **Apache POI** - DOCX parsing
- 📧 **Spring Mail** - Email notifications
- 🏗️ **Maven** - Dependency management

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Java 17+
- Maven 3.8+
- Git

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/ai-interview-platform.git
cd ai-interview-platform
```

### 2. Backend Setup
```bash
cd backend-java

# Update application.yml with your configurations
# (OAuth credentials, email settings, etc.)

# Run backend
mvn spring-boot:run
```

Backend runs on: http://localhost:8081

### 3. Frontend Setup
```bash
cd frontend-react

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs on: http://localhost:5174

### 4. Access Application
- Frontend: http://localhost:5174
- Backend API: http://localhost:8081/api
- H2 Console: http://localhost:8081/h2-console

---

## 📦 Deployment

### Deploy Frontend to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/ai-interview-platform&root-directory=frontend-react)

**Manual Deployment**:
```bash
cd frontend-react
npm install -g vercel
vercel --prod
```

**Environment Variables** (add in Vercel):
```
VITE_API_BASE_URL=https://your-backend-url.com
```

See: [DEPLOY_VIA_GITHUB.md](./DEPLOY_VIA_GITHUB.md)

### Deploy Backend via Cloudflare Tunnel

```bash
# Install cloudflared
winget install cloudflare.cloudflared

# Create quick tunnel
cloudflared tunnel --url http://localhost:8081
```

See: [DEPLOYMENT_BACKEND_CLOUDFLARE.md](./DEPLOYMENT_BACKEND_CLOUDFLARE.md)

---

## ⚙️ Configuration

### Backend Configuration

**Location**: `backend-java/src/main/resources/application.yml`

```yaml
# Server
server:
  port: 8081

# Database (H2 for development)
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    
# Google OAuth
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: YOUR_CLIENT_ID
            client-secret: YOUR_CLIENT_SECRET

# Email (optional)
spring:
  mail:
    username: your-email@gmail.com
    password: your-app-password
```

### Frontend Configuration

**Location**: `frontend-react/.env.production`

```env
VITE_API_BASE_URL=https://your-backend-url.com
```

---

## 🔐 OAuth Setup

### Google Cloud Console Configuration

1. Go to: https://console.cloud.google.com/
2. Create project
3. Enable APIs:
   - Google+ API
   - People API
4. Configure OAuth consent screen
5. Create OAuth 2.0 credentials
6. Add authorized URLs:
   - JavaScript origins: `http://localhost:5174`, `https://your-frontend.vercel.app`
   - Redirect URIs: `http://localhost:8081/login/oauth2/code/google`

See: [GCP_OAUTH_COMPLETE_SETUP.md](./GCP_OAUTH_COMPLETE_SETUP.md)

---

## 📧 Email Configuration

### Gmail App Password Setup

1. Go to: https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Generate App Password for Mail
4. Update `application.yml` or set environment variables:
   ```bash
   set MAIL_USERNAME=your-email@gmail.com
   set MAIL_PASSWORD=your-app-password
   ```

---

## 📚 Documentation

- [QUICK_DEPLOYMENT_GUIDE.md](./QUICK_DEPLOYMENT_GUIDE.md) - Complete deployment guide
- [DEPLOY_VIA_GITHUB.md](./DEPLOY_VIA_GITHUB.md) - GitHub + Vercel setup
- [DEPLOYMENT_BACKEND_CLOUDFLARE.md](./DEPLOYMENT_BACKEND_CLOUDFLARE.md) - Backend deployment
- [DEPLOYMENT_FRONTEND_VERCEL.md](./DEPLOYMENT_FRONTEND_VERCEL.md) - Frontend deployment
- [GCP_OAUTH_COMPLETE_SETUP.md](./GCP_OAUTH_COMPLETE_SETUP.md) - OAuth configuration
- [DO_THIS_NOW.md](./DO_THIS_NOW.md) - OAuth troubleshooting

---

## 🎨 Features Deep Dive

### ATS Resume Scanner
- Analyzes resumes for ATS compatibility
- Provides 4 scores: Overall, Format, Keywords, Content
- Color-coded suggestions (Green/Yellow/Red)
- Supports PDF and DOCX formats
- Automatic scoring when students upload resumes
- HR can view all candidate ATS scores

### Candidate Pipeline
- 6-stage pipeline: Applied, Screening, Assessment, Interview, Offer, Hired
- Drag-and-drop Kanban board (frontend)
- Stage transition API
- Real-time updates

### Google OAuth Integration
- One-click sign-in with Google
- New user role selection
- Existing user direct login
- Session management with JWT
- Automatic user creation

### Dashboard Analytics
- Student stats and progress tracking
- HR metrics and candidate overview
- Interview history and status
- Assessment tracking

---

## 🧪 Testing

### Test Accounts

**Student**:
- Email: student@test.com
- Password: password123

**HR**:
- Email: hr@test.com
- Password: password123

### Test OAuth
1. Click "Continue with Google"
2. Select Google account
3. Grant permissions
4. Should redirect to appropriate dashboard

---

## 🔧 Development

### Frontend Development
```bash
cd frontend-react
npm run dev
```

### Backend Development
```bash
cd backend-java
mvn spring-boot:run
```

### Build for Production
```bash
# Frontend
cd frontend-react
npm run build

# Backend
cd backend-java
mvn clean package
```

---

## 📊 Project Structure

```
ai-interview-platform/
├── backend-java/
│   ├── src/main/java/com/aiinterview/
│   │   ├── controller/      # REST controllers
│   │   ├── service/         # Business logic
│   │   ├── model/           # Entity models
│   │   ├── repository/      # Data access
│   │   ├── dto/             # Data transfer objects
│   │   ├── security/        # Security configs
│   │   └── exception/       # Exception handlers
│   ├── src/main/resources/
│   │   └── application.yml  # Configuration
│   └── pom.xml              # Maven dependencies
├── frontend-react/
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context
│   │   └── App.jsx          # Main app component
│   ├── package.json         # npm dependencies
│   └── vercel.json          # Vercel config
├── .gitignore
└── README.md
```

---

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /oauth2/authorization/google` - Google OAuth

### Student
- `GET /api/student/stats` - Get dashboard statistics
- `GET /api/student/interviews` - Get student interviews

### HR
- `GET /api/hr/candidates` - Get all candidates
- `POST /api/hr/send-invitation` - Send interview invitation
- `PUT /api/hr/candidates/{id}/stage` - Update candidate stage

### Resume
- `POST /api/resume/upload` - Upload resume
- `POST /api/resume/analyze-ats` - Analyze ATS score
- `GET /api/resume/download/{filename}` - Download resume

### User
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/change-password` - Change password
- `PUT /api/user/update-role` - Update user role

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- Your Name - [@yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Spring Boot team for the amazing framework
- React team for the fantastic library
- Vercel for free hosting
- Cloudflare for free tunneling
- Google for OAuth integration

---

## 📧 Support

For issues and questions:
- Create an issue: https://github.com/YOUR_USERNAME/ai-interview-platform/issues
- Email: your-email@example.com

---

## 🎯 Roadmap

- [ ] Add video interview feature
- [ ] Implement AI-powered question generation
- [ ] Add calendar integration
- [ ] Create mobile app
- [ ] Add team collaboration features
- [ ] Implement advanced analytics
- [ ] Add multilingual support

---

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/ai-interview-platform?style=social)
![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/ai-interview-platform?style=social)
![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/ai-interview-platform)
![GitHub license](https://img.shields.io/github/license/YOUR_USERNAME/ai-interview-platform)

---

**Made with ❤️ by [Your Name](https://github.com/yourusername)**

---

## ⭐ Star this repo if you find it helpful!
