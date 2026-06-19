import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler'
import SelectRole from './pages/SelectRole'
import StudentDashboard from './pages/StudentDashboard'
import HRDashboard from './pages/HRDashboard'
import Home from './pages/Home'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Careers from './pages/Careers'
import Blog from './pages/Blog'
import HowItWorks from './pages/HowItWorks'
import Support from './pages/Support'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Navbar from './components/Navbar'
import PublicHeader from './components/PublicHeader'
import Footer from './components/Footer'

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />
  }

  return children
}

function AppContent() {
  const { user } = useAuth()
  const location = useLocation()

  // Public pages that show PublicHeader instead of Navbar
  const publicPages = ['/', '/features', '/pricing', '/about', '/careers', '/blog', '/how-it-works', '/support', '/privacy', '/terms', '/login', '/register', '/forgot-password', '/reset-password', '/oauth2/redirect', '/select-role']
  const isPublicPage = publicPages.includes(location.pathname)

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col">
      {/* Show PublicHeader on public pages when not logged in, otherwise show Navbar */}
      {isPublicPage && !user ? <PublicHeader /> : <Navbar />}
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          <Route path="/select-role" element={<SelectRole />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute requiredRole="STUDENT">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hr/dashboard"
            element={
              <ProtectedRoute requiredRole="HR">
                <HRDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
