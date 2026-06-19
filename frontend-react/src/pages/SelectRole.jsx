import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { GraduationCap, Briefcase } from 'lucide-react'
import axios from 'axios'

export default function SelectRole() {
  const [searchParams] = useSearchParams()
  const [selectedRole, setSelectedRole] = useState('STUDENT')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const email = searchParams.get('email')
  const name = searchParams.get('name')
  const tempToken = searchParams.get('token')

  const handleSubmit = async () => {
    setLoading(true)
    
    try {
      // Update user role via API
      const response = await axios.put(
        'http://localhost:8081/api/user/update-role',
        { role: selectedRole },
        {
          headers: {
            'Authorization': `Bearer ${tempToken}`
          }
        }
      )

      // Store the token
      localStorage.setItem('token', tempToken)

      // Redirect to appropriate dashboard
      if (selectedRole === 'STUDENT') {
        navigate('/student/dashboard')
      } else {
        navigate('/hr/dashboard')
      }
    } catch (error) {
      console.error('Error updating role:', error)
      alert('Failed to update role. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full fade-in">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gradient mb-2">Choose Your Role</h2>
          <p className="text-gray-400">Welcome, {name}!</p>
          <p className="text-gray-500 text-sm mt-1">{email}</p>
        </div>

        <div className="card p-8">
          <div className="space-y-4 mb-6">
            <button
              type="button"
              onClick={() => setSelectedRole('STUDENT')}
              className={`w-full p-6 rounded-lg border-2 transition-all ${
                selectedRole === 'STUDENT'
                  ? 'border-royal-500 bg-royal-900/30 shadow-royal'
                  : 'border-royal-800 hover:border-royal-700'
              }`}
            >
              <GraduationCap className="w-12 h-12 mx-auto mb-3 text-royal-400" />
              <div className="text-center">
                <div className="text-xl font-semibold text-gray-200 mb-1">Student</div>
                <div className="text-sm text-gray-400">
                  I'm looking for job opportunities and want to practice interviews
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('HR')}
              className={`w-full p-6 rounded-lg border-2 transition-all ${
                selectedRole === 'HR'
                  ? 'border-purple-500 bg-purple-900/30 shadow-purple'
                  : 'border-royal-800 hover:border-royal-700'
              }`}
            >
              <Briefcase className="w-12 h-12 mx-auto mb-3 text-purple-400" />
              <div className="text-center">
                <div className="text-xl font-semibold text-gray-200 mb-1">HR / Recruiter</div>
                <div className="text-sm text-gray-400">
                  I want to conduct interviews and manage candidates
                </div>
              </div>
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="spinner mr-2"></div>
                Setting up your account...
              </span>
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
