# 🚀 AI Interview Platform - Setup & Run Guide

## Professional Java Spring Boot + React Application

---

## 📋 Prerequisites

Before running the application, ensure you have:

1. **Java 17 or higher**
   ```bash
   java -version
   ```

2. **Node.js 18+ and npm**
   ```bash
   node -version
   npm -version
   ```

3. **Maven 3.8+** (or use included Maven Wrapper)
   ```bash
   mvn -version
   ```

---

## 🎯 Quick Start (Easiest Way)

### Option 1: Run Everything with One Click

Simply double-click the file:
```
START-APPLICATION.bat
```

This will:
- ✅ Start Spring Boot backend on port 8080
- ✅ Install frontend dependencies
- ✅ Start React frontend on port 5173
- ✅ Open both servers in separate windows

**Wait 1-2 minutes** for servers to start, then open:
👉 **http://localhost:5173**

---

## 🔧 Manual Setup (Step by Step)

### Step 1: Setup Backend

```bash
cd backend-java

# Install dependencies and run
mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
```

Backend will start on: **http://localhost:8080**

### Step 2: Setup Frontend

Open a NEW terminal window:

```bash
cd frontend-react

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start on: **http://localhost:5173**

---

## 🎨 Application Features

### ✨ For Students (Job Seekers)
- View interview statistics
- Track average scores
- See recent interview history
- Professional dashboard

### 🎯 For HR (Recruiters)
- View all candidates
- Manage question bank
- Update candidate status
- Create custom questions

### 🔐 Authentication
- JWT-based secure authentication
- Role-based access control (Student/HR)
- Professional login/register UI

### 📊 Technology Stack
- **Backend:** Spring Boot 3.2.5, Spring Security, JWT, H2 Database
- **Frontend:** React 18, Tailwind CSS, Axios, React Router
- **Design:** Royal Blue + Purple + Gold color theme

---

## 🌐 Access Points

After starting the application:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | Main application UI |
| **Backend API** | http://localhost:8080 | REST API endpoints |
| **H2 Console** | http://localhost:8080/h2-console | Database admin |

### H2 Database Console Access
- **JDBC URL:** `jdbc:h2:mem:testdb`
- **Username:** `sa`
- **Password:** *(leave empty)*

---

## 📝 Test the Application

### 1. Register New Users

**Student Account:**
- Go to http://localhost:5173/register
- Name: John Doe
- Email: john@example.com
- Password: password123
- Role: Student

**HR Account:**
- Go to http://localhost:5173/register
- Name: Jane Smith
- Email: jane@example.com
- Password: password123
- Role: HR

### 2. Test Features

**As Student:**
1. Login with student account
2. View dashboard statistics
3. Check recent interviews (will be empty initially)

**As HR:**
1. Login with HR account
2. View candidates list
3. Create new questions
4. Manage question bank

---

## 🛠️ API Endpoints

### Authentication
```
POST /api/auth/register  - Register new user
POST /api/auth/login     - Login user
GET  /api/auth/me        - Get current user
```

### Student
```
GET /api/student/stats           - Get dashboard stats
GET /api/student/recent-activity - Get recent interviews
```

### HR
```
GET    /api/hr/candidates             - List all candidates
PUT    /api/hr/candidates/{id}/status - Update candidate status
GET    /api/hr/questions              - Get question bank
POST   /api/hr/questions              - Create new question
PUT    /api/hr/questions/{id}         - Update question
DELETE /api/hr/questions/{id}         - Delete question
```

### Resume
```
POST /api/resume/analyze - Upload and analyze resume (PDF/DOCX)
```

---

## 🎨 Design Theme

### Royal Color Palette
- **Primary:** Royal Blue (#4F46E5)
- **Secondary:** Deep Purple (#9333EA)
- **Accent:** Gold (#D97706)
- **Background:** Navy Gradient (#0F172A → #1E1B4B)

### UI Features
- ✨ Glass morphism effects
- 🌈 Gradient buttons with hover animations
- 📊 Professional dashboard cards
- 🎭 Smooth transitions and animations

---

## 🐛 Troubleshooting

### Backend Issues

**Port 8080 already in use:**
```bash
# Change port in backend-java/src/main/resources/application.yml
server:
  port: 8081  # Change to any available port
```

**Maven command not found:**
```bash
# Use Maven Wrapper instead
cd backend-java
./mvnw spring-boot:run  # Linux/Mac
mvnw.cmd spring-boot:run  # Windows
```

### Frontend Issues

**Port 5173 already in use:**
```bash
# Vite will automatically use next available port (5174, 5175, etc.)
```

**Dependencies not installing:**
```bash
cd frontend-react
rm -rf node_modules package-lock.json
npm install
```

**CORS errors:**
```bash
# Make sure backend is running on port 8080
# Check frontend .env file has correct API URL
```

---

## 📦 Project Structure

```
ai-interview-platform/
├── backend-java/              # Spring Boot Backend
│   ├── src/main/java/com/aiinterview/
│   │   ├── controller/       # REST Controllers
│   │   ├── service/         # Business Logic
│   │   ├── repository/      # Data Access
│   │   ├── model/           # JPA Entities
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── security/        # JWT & Security Config
│   │   └── exception/       # Exception Handling
│   └── pom.xml              # Maven Dependencies
│
├── frontend-react/            # React Frontend
│   ├── src/
│   │   ├── pages/           # Page Components
│   │   ├── components/      # Reusable Components
│   │   ├── context/         # React Context (Auth)
│   │   └── index.css        # Tailwind + Custom Styles
│   └── package.json         # NPM Dependencies
│
└── START-APPLICATION.bat     # One-click startup
```

---

## 🔒 Security Features

- ✅ JWT authentication with 24-hour expiration
- ✅ BCrypt password hashing
- ✅ Role-based access control (RBAC)
- ✅ CORS configuration
- ✅ Input validation
- ✅ SQL injection protection

---

## 🚀 Production Deployment

### Build Backend
```bash
cd backend-java
mvnw.cmd clean package
java -jar target/ai-interview-platform-1.0.0.jar
```

### Build Frontend
```bash
cd frontend-react
npm run build
# Deploy dist/ folder to web server
```

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review console logs for errors
3. Ensure all prerequisites are installed
4. Verify ports 8080 and 5173 are available

---

## 🎉 Success!

If everything is working correctly, you should see:

✅ Backend running on http://localhost:8080
✅ Frontend running on http://localhost:5173
✅ Beautiful royal-themed UI
✅ Functional authentication
✅ Working dashboards

**Enjoy your professional AI Interview Platform!** 🚀

---

## 📄 License

MIT License - Professional Edition

---

**Built with ❤️ using Spring Boot & React**
