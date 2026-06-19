# AI Interview Platform - Java Spring Boot Backend

Professional AI-powered interview platform with Java Spring Boot backend and React frontend.

## 🚀 Features

- ✅ User Authentication (JWT + Google OAuth)
- ✅ Role-based Access Control (Student, HR, Admin)
- ✅ Interview Management
- ✅ Question Bank Management
- ✅ Resume Parsing (ATS)
- ✅ Real-time WebSocket Communication
- ✅ RESTful API Design
- ✅ Professional Exception Handling

## 🛠️ Technology Stack

**Backend:**
- Java 17
- Spring Boot 3.2.5
- Spring Security
- Spring Data JPA
- JWT Authentication
- MySQL Database
- Maven

**Frontend:**
- React 18
- React Router
- Tailwind CSS
- Axios
- Socket.IO Client

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.8+
- MySQL 8.0+
- Node.js 18+ (for frontend)

## 🚦 Quick Start

### Backend Setup

1. **Configure Database:**
   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE ai_interview_db;
   ```

2. **Update application.yml:**
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/ai_interview_db
       username: your_username
       password: your_password
   ```

3. **Build and Run:**
   ```bash
   cd backend-java
   mvn clean install
   mvn spring-boot:run
   ```

   Backend will start on **http://localhost:8080**

### Frontend Setup

```bash
cd frontend-react
npm install
npm run dev
```

Frontend will start on **http://localhost:5173**

## 📁 Project Structure

```
backend-java/
├── src/main/java/com/aiinterview/
│   ├── controller/         # REST Controllers
│   ├── service/           # Business Logic
│   ├── repository/        # Data Access Layer
│   ├── model/             # JPA Entities
│   ├── dto/               # Data Transfer Objects
│   ├── security/          # Security Configuration
│   ├── exception/         # Exception Handling
│   └── config/            # App Configuration
├── src/main/resources/
│   ├── application.yml    # Configuration
│   └── application-dev.yml
└── pom.xml               # Maven Dependencies

frontend-react/
├── src/
│   ├── components/       # React Components
│   ├── pages/           # Page Components
│   ├── services/        # API Services
│   ├── context/         # React Context
│   ├── styles/          # CSS/Tailwind
│   └── utils/           # Helper Functions
└── package.json
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/google` - Google OAuth login

### Student
- `GET /api/student/stats` - Get student statistics
- `GET /api/student/recent-activity` - Get recent interviews

### HR
- `GET /api/hr/candidates` - Get all candidates
- `PUT /api/hr/candidates/{id}/status` - Update candidate status
- `GET /api/hr/questions` - Get question bank
- `POST /api/hr/questions` - Create new question
- `PUT /api/hr/questions/{id}` - Update question
- `DELETE /api/hr/questions/{id}` - Delete question

## 🎨 Royal Color Theme

The application uses a professional royal color scheme:

- Primary: Royal Blue (#1E40AF)
- Secondary: Deep Purple (#6B21A8)
- Accent: Gold (#D97706)
- Background: Navy (#0F172A)
- Text: Light Gray (#F1F5F9)

## 🔒 Security

- JWT-based authentication
- Password encryption with BCrypt
- Role-based access control
- CORS configuration
- Request validation
- Rate limiting (planned)

## 📝 Environment Variables

Create `.env` file in backend-java/:

```properties
JWT_SECRET=your-secret-key-min-256-bits
GOOGLE_CLIENT_ID=your-google-client-id
DATABASE_URL=jdbc:mysql://localhost:3306/ai_interview_db
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
```

## 🧪 Testing

```bash
# Run backend tests
cd backend-java
mvn test

# Run frontend tests
cd frontend-react
npm test
```

## 📦 Build for Production

```bash
# Backend
cd backend-java
mvn clean package
java -jar target/ai-interview-platform-1.0.0.jar

# Frontend
cd frontend-react
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👥 Author

AI Interview Platform Team

## 🐛 Issues

Report issues at: [GitHub Issues](https://github.com/your-repo/issues)
