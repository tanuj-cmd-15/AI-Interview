import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, User, LayoutDashboard } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="glass border-b border-royal-700/30 sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-royal rounded-lg flex items-center justify-center shadow-royal">
              <span className="text-2xl font-bold text-white">AI</span>
            </div>
            <span className="text-xl font-bold text-gradient">
              Interview Platform
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to={user.role === 'STUDENT' ? '/student/dashboard' : '/hr/dashboard'}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-royal-900/50 transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5 text-royal-400" />
                  <span className="text-gray-300">Dashboard</span>
                </Link>

                <div className="flex items-center space-x-3 px-4 py-2 bg-royal-900/50 rounded-lg">
                  <User className="w-5 h-5 text-royal-400" />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-300">{user.name}</span>
                    <span className="text-xs text-royal-400">{user.role}</span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
