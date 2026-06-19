import { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  TrendingUp, Calendar, Award, FileText, Lock, 
  Upload, CheckCircle, XCircle, AlertCircle, 
  Target, Briefcase, BookOpen, ClipboardList,
  BarChart3, PieChart, Lightbulb, Star
} from 'lucide-react'
import toast from 'react-hot-toast'
import ChangePasswordModal from '../components/ChangePasswordModal'

export default function StudentDashboard() {
  const [stats, setStats] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  
  // ATS Scanner state
  const [resumeFile, setResumeFile] = useState(null)
  const [atsScore, setAtsScore] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activityRes] = await Promise.all([
        axios.get('/api/student/stats'),
        axios.get('/api/student/recent-activity')
      ])
      setStats(statsRes.data)
      setRecentActivity(activityRes.data)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.name.match(/\.(pdf|docx)$/i)) {
      toast.error('Please upload PDF or DOCX file only')
      return
    }

    setResumeFile(file)
    setAnalyzing(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const { data } = await axios.post('/api/resume/analyze-ats', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setAtsScore(data)
      toast.success('Resume analyzed successfully!')
    } catch (error) {
      toast.error('Failed to analyze resume')
      console.error(error)
    } finally {
      setAnalyzing(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-600/20 border-green-600/30'
    if (score >= 60) return 'bg-yellow-600/20 border-yellow-600/30'
    return 'bg-red-600/20 border-red-600/30'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gradient">Student Dashboard</h1>
        <button
          onClick={() => setShowPasswordModal(true)}
          className="btn-outline flex items-center space-x-2"
        >
          <Lock className="w-5 h-5" />
          <span>Change Password</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-gradient-royal text-white shadow-royal'
              : 'bg-royal-900/30 text-gray-400 hover:bg-royal-900/50'
          }`}
        >
          <BarChart3 className="w-5 h-5 inline mr-2" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('ats-scanner')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
            activeTab === 'ats-scanner'
              ? 'bg-gradient-purple text-white shadow-purple'
              : 'bg-royal-900/30 text-gray-400 hover:bg-royal-900/50'
          }`}
        >
          <FileText className="w-5 h-5 inline mr-2" />
          ATS Resume Scanner
        </button>
        <button
          onClick={() => setActiveTab('assessments')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
            activeTab === 'assessments'
              ? 'bg-gradient-royal text-white shadow-royal'
              : 'bg-royal-900/30 text-gray-400 hover:bg-royal-900/50'
          }`}
        >
          <ClipboardList className="w-5 h-5 inline mr-2" />
          Assessments
        </button>
        <button
          onClick={() => setActiveTab('interviews')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
            activeTab === 'interviews'
              ? 'bg-gradient-purple text-white shadow-purple'
              : 'bg-royal-900/30 text-gray-400 hover:bg-royal-900/50'
          }`}
        >
          <Briefcase className="w-5 h-5 inline mr-2" />
          My Interviews
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="card-hover p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-royal rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="badge-primary">Total</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-100 mb-1">
                {stats?.interviewsCompleted || 0}
              </h3>
              <p className="text-gray-400">Interviews</p>
            </div>

            <div className="card-hover p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="badge-success">Average</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-100 mb-1">
                {stats?.averageScore || 0}%
              </h3>
              <p className="text-gray-400">Score</p>
            </div>

            <div className="card-hover p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-700 rounded-lg flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-white" />
                </div>
                <span className="badge-warning">Pending</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-100 mb-1">
                3
              </h3>
              <p className="text-gray-400">Assessments</p>
            </div>

            <div className="card-hover p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-royal rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="badge-success">Rank</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-100 mb-1">
                Top 15%
              </h3>
              <p className="text-gray-400">Performance</p>
            </div>
          </div>

          {/* Recent Interviews */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-royal-400" />
              Recent Activity
            </h2>

            {recentActivity.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg">No recent activity</p>
                <p className="text-gray-500 text-sm">Complete assessments and interviews to see your progress</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-royal-800">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Score</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((interview) => (
                      <tr key={interview.id} className="border-b border-royal-900/50 hover:bg-royal-900/30 transition-colors">
                        <td className="py-3 px-4">
                          <span className="badge-primary">{interview.interviewType}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-2xl font-bold text-gradient">{interview.score}%</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`badge-${interview.status === 'REVIEWED' ? 'success' : 'warning'}`}>
                            {interview.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">
                          {new Date(interview.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ATS Scanner Tab */}
      {activeTab === 'ats-scanner' && (
        <div className="space-y-8">
          {/* Upload Section */}
          <div className="card p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center mr-4">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-100">ATS Resume Scanner</h2>
                <p className="text-gray-400">Upload your resume for detailed ATS compatibility analysis</p>
              </div>
            </div>

            <div className="border-2 border-dashed border-royal-700/50 rounded-lg p-8 text-center hover:border-royal-600 transition-colors">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.docx"
                onChange={handleResumeUpload}
                className="hidden"
                disabled={analyzing}
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <Upload className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                <p className="text-gray-300 text-lg mb-2">
                  {resumeFile ? resumeFile.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-gray-500 text-sm">
                  PDF or DOCX (Max 10MB)
                </p>
              </label>
            </div>

            {analyzing && (
              <div className="mt-6 flex items-center justify-center">
                <div className="spinner mr-3"></div>
                <span className="text-gray-400">Analyzing your resume...</span>
              </div>
            )}
          </div>

          {/* ATS Score Results */}
          {atsScore && (
            <>
              {/* Overall Score */}
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-gray-100 mb-6">ATS Compatibility Score</h3>
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <svg className="w-48 h-48">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-royal-900"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        className={getScoreColor(atsScore.overallScore)}
                        strokeDasharray={`${(atsScore.overallScore / 100) * 553} 553`}
                        transform="rotate(-90 96 96)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-5xl font-bold ${getScoreColor(atsScore.overallScore)}`}>
                        {atsScore.overallScore}
                      </span>
                      <span className="text-gray-400 text-sm">out of 100</span>
                    </div>
                  </div>
                </div>
                <div className={`p-4 rounded-lg border ${getScoreBg(atsScore.overallScore)} text-center`}>
                  <p className="text-gray-300">
                    {atsScore.overallScore >= 80 ? '✅ Excellent! Your resume is highly ATS-compatible' :
                     atsScore.overallScore >= 60 ? '⚠️ Good, but there\'s room for improvement' :
                     '❌ Needs improvement to pass ATS systems'}
                  </p>
                </div>
              </div>

              {/* Detailed Scores */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-100">Format Score</h4>
                    <span className={`text-2xl font-bold ${getScoreColor(atsScore.formatScore || 75)}`}>
                      {atsScore.formatScore || 75}%
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">Clean formatting and structure</p>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-100">Keyword Score</h4>
                    <span className={`text-2xl font-bold ${getScoreColor(atsScore.keywordScore || 68)}`}>
                      {atsScore.keywordScore || 68}%
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">Relevant keywords and skills</p>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-100">Content Score</h4>
                    <span className={`text-2xl font-bold ${getScoreColor(atsScore.contentScore || 82)}`}>
                      {atsScore.contentScore || 82}%
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">Quality and completeness</p>
                </div>
              </div>

              {/* Improvement Suggestions */}
              <div className="card p-8">
                <div className="flex items-center mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-100">Improvement Suggestions</h3>
                </div>
                <div className="space-y-4">
                  {(atsScore.suggestions || [
                    { type: 'critical', text: 'Add more technical skills relevant to the job description' },
                    { type: 'warning', text: 'Include quantifiable achievements with numbers and metrics' },
                    { type: 'info', text: 'Use standard section headings like "Work Experience" and "Education"' },
                    { type: 'info', text: 'Remove graphics, tables, and complex formatting' },
                    { type: 'warning', text: 'Add action verbs at the beginning of bullet points' }
                  ]).map((suggestion, index) => (
                    <div
                      key={index}
                      className={`flex items-start p-4 rounded-lg border ${
                        suggestion.type === 'critical' ? 'bg-red-600/20 border-red-600/30' :
                        suggestion.type === 'warning' ? 'bg-yellow-600/20 border-yellow-600/30' :
                        'bg-blue-600/20 border-blue-600/30'
                      }`}
                    >
                      {suggestion.type === 'critical' ? <XCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" /> :
                       suggestion.type === 'warning' ? <AlertCircle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" /> :
                       <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />}
                      <div>
                        <p className="text-gray-300">{suggestion.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-gray-100 mb-6">Recommended Keywords to Add</h3>
                <div className="flex flex-wrap gap-3">
                  {(atsScore.missingKeywords || [
                    'JavaScript', 'React', 'Node.js', 'AWS', 'Docker', 
                    'CI/CD', 'Agile', 'REST API', 'MongoDB', 'Git'
                  ]).map((keyword, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-royal-900/50 border border-royal-700/30 rounded-full text-royal-300 hover:bg-royal-900/70 transition-colors cursor-pointer"
                    >
                      + {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Assessments Tab */}
      {activeTab === 'assessments' && (
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">My Assessments</h2>
          <div className="space-y-4">
            {/* Sample Assessment */}
            <div className="border border-royal-700/30 rounded-lg p-6 hover:border-royal-600/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">Frontend Developer Assessment</h3>
                  <p className="text-gray-400">25 questions · 60 minutes · Intermediate</p>
                </div>
                <span className="badge-warning">Pending</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>📅 Due: Jun 25, 2026</span>
                  <span>⏱️ Time limit: 60 min</span>
                </div>
                <button className="btn-primary">Start Assessment</button>
              </div>
            </div>

            <div className="border border-royal-700/30 rounded-lg p-6 hover:border-royal-600/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">Technical Coding Challenge</h3>
                  <p className="text-gray-400">5 problems · 90 minutes · Advanced</p>
                </div>
                <span className="badge-success">Completed</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>✅ Completed: Jun 15, 2026</span>
                  <span className="text-gradient font-bold text-xl">Score: 85%</span>
                </div>
                <button className="btn-outline">View Results</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interviews Tab */}
      {activeTab === 'interviews' && (
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Interview Schedule & History</h2>
          <div className="space-y-6">
            {/* Upcoming Interview */}
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Upcoming Interviews</h3>
              <div className="border-l-4 border-royal-500 bg-royal-900/30 rounded-r-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-100 mb-2">Technical Interview - Round 2</h4>
                    <div className="space-y-2 text-gray-400">
                      <p>📅 <strong>Date:</strong> June 22, 2026 at 2:00 PM</p>
                      <p>👤 <strong>Interviewer:</strong> Sarah Johnson (Senior Engineer)</p>
                      <p>⏱️ <strong>Duration:</strong> 45 minutes</p>
                      <p>📍 <strong>Mode:</strong> Video Call (Zoom link will be shared)</p>
                    </div>
                  </div>
                  <button className="btn-primary">Join Interview</button>
                </div>
              </div>
            </div>

            {/* Past Interviews */}
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Past Interviews</h3>
              <div className="space-y-4">
                <div className="border border-royal-700/30 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-100 mb-2">Initial Screening</h4>
                      <p className="text-gray-400 mb-2">June 10, 2026</p>
                      <span className="badge-success">Passed</span>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gradient mb-1">92%</div>
                      <p className="text-sm text-gray-400">Score</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={() => {
          toast.success('Password changed successfully!')
        }}
      />
    </div>
  )
}
