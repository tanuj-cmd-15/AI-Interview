import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  // Configure axios defaults
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081'

  // Set auth token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setToken(token)
    } else {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      setToken(null)
    }
  }

  // Load user from token on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
      fetchCurrentUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/api/auth/me')
      setUser(data)
    } catch (error) {
      console.error('Failed to fetch user:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password })
      setAuthToken(data.accessToken)
      setUser(data.user)
      toast.success('Login successful!')
      return data.user
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed'
      toast.error(message)
      throw error
    }
  }

  const register = async (email, password, name, role) => {
    try {
      const { data } = await axios.post('/api/auth/register', {
        email,
        password,
        name,
        role
      })
      setAuthToken(data.accessToken)
      setUser(data.user)
      toast.success('Registration successful!')
      return data.user
    } catch (error) {
      const message = error.response?.data?.error || 'Registration failed'
      toast.error(message)
      throw error
    }
  }

  const logout = () => {
    setAuthToken(null)
    setUser(null)
    toast.success('Logged out successfully')
  }

  const value = {
    user,
    loading,
    token,
    setToken: setAuthToken,
    setUser,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
