import { useState } from 'react'
import { X, Mail, User, Briefcase, Calendar } from 'lucide-react'
import axios from 'axios'

export default function SendInvitationModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    candidateName: '',
    email: '',
    interviewType: 'TECHNICAL',
    assessmentTitle: '',
    deadline: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'http://localhost:8081/api/hr/send-invitation',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      onSuccess(response.data)
      handleClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send invitation')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      candidateName: '',
      email: '',
      interviewType: 'TECHNICAL',
      assessmentTitle: '',
      deadline: ''
    })
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="card max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-royal-800/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-royal rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-100">Send Interview Invitation</h2>
              <p className="text-sm text-gray-400">Invite candidate via email with auto-generated credentials</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-600/20 border border-red-600/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Candidate Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Candidate Name
            </label>
            <input
              type="text"
              required
              value={formData.candidateName}
              onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
              className="input-field"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
              placeholder="john.doe@example.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              This email will be used as username. A temporary password will be auto-generated.
            </p>
          </div>

          {/* Interview Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Briefcase className="w-4 h-4 inline mr-2" />
              Interview Type
            </label>
            <select
              value={formData.interviewType}
              onChange={(e) => setFormData({ ...formData, interviewType: e.target.value })}
              className="input-field"
            >
              <option value="HR">HR Interview</option>
              <option value="TECHNICAL">Technical Interview</option>
              <option value="COMBINED">Combined Interview</option>
            </select>
          </div>

          {/* Assessment Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Assessment Title (Optional)
            </label>
            <input
              type="text"
              value={formData.assessmentTitle}
              onChange={(e) => setFormData({ ...formData, assessmentTitle: e.target.value })}
              className="input-field"
              placeholder="Frontend Developer Assessment"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Deadline (Optional)
            </label>
            <input
              type="datetime-local"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="input-field"
            />
          </div>

          {/* Info Box */}
          <div className="bg-royal-900/30 border border-royal-700/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-royal-300 mb-2">📧 What happens next?</h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• System generates secure temporary password</li>
              <li>• Email sent with login credentials and interview details</li>
              <li>• Candidate can login and change password</li>
              <li>• Interview entry created in system</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="btn-outline"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <span className="spinner mr-2"></span>
                  Sending...
                </span>
              ) : (
                'Send Invitation'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
