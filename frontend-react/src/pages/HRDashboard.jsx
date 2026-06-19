import { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  Users, Plus, Edit2, Trash2, CheckCircle, Mail,
  BarChart3, Calendar, TrendingUp, Award,
  Filter, Search, Download, Upload
} from 'lucide-react'
import toast from 'react-hot-toast'
import SendInvitationModal from '../components/SendInvitationModal'

export default function HRDashboard() {
  const [candidates, setCandidates] = useState([])
  const [questions, setQuestions] = useState([])
  const [activeTab, setActiveTab] = useState('pipeline')
  const [loading, setLoading] = useState(true)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [showInvitationModal, setShowInvitationModal] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    category: 'TECHNICAL',
    difficulty: 'MEDIUM'
  })

  // Pipeline stages
  const stages = [
    { id: 'applied', name: 'Applied', color: 'bg-gray-600' },
    { id: 'screening', name: 'Resume Screening', color: 'bg-blue-600' },
    { id: 'assessment', name: 'Assessment', color: 'bg-yellow-600' },
    { id: 'interview', name: 'Interview', color: 'bg-purple-600' },
    { id: 'offer', name: 'Offer', color: 'bg-green-600' },
    { id: 'hired', name: 'Hired', color: 'bg-emerald-600' },
  ]

  const [pipeline, setPipeline] = useState({
    applied: [],
    screening: [],
    assessment: [],
    interview: [],
    offer: [],
    hired: []
  })

  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [showATSModal, setShowATSModal] = useState(false)
  const [atsScore, setATSScore] = useState(null)
  const [loadingATS, setLoadingATS] = useState(false)
  const [resumeFile, setResumeFile] = useState(null)
  const [uploadingResume, setUploadingResume] = useState(false)

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    try {
      if (activeTab === 'candidates' || activeTab === 'pipeline') {
        const { data } = await axios.get('/api/hr/candidates')
        setCandidates(data)
        // Organize into pipeline
        organizePipeline(data)
      } else if (activeTab === 'questions') {
        const { data } = await axios.get('/api/hr/questions')
        setQuestions(data)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const organizePipeline = (data) => {
    const organized = {
      applied: [],
      screening: [],
      assessment: [],
      interview: [],
      offer: [],
      hired: []
    }

    data.forEach(candidate => {
      const stage = candidate.stage || 'applied'
      if (organized[stage]) {
        organized[stage].push(candidate)
      }
    })

    setPipeline(organized)
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`/api/hr/candidates/${id}/status`, { status })
      toast.success('Status updated successfully')
      fetchData()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const handleCreateQuestion = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/hr/questions', newQuestion)
      toast.success('Question created successfully')
      setShowQuestionModal(false)
      setNewQuestion({ text: '', category: 'TECHNICAL', difficulty: 'MEDIUM' })
      fetchData()
    } catch (error) {
      toast.error('Failed to create question')
    }
  }

  const handleDeleteQuestion = async (id) => {
    if (!confirm('Are you sure you want to delete this question?')) return
    
    try {
      await axios.delete(`/api/hr/questions/${id}`)
      toast.success('Question deleted successfully')
      fetchData()
    } catch (error) {
      toast.error('Failed to delete question')
    }
  }

  const handleDragStart = (e, candidate, sourceStage) => {
    e.dataTransfer.setData('candidateId', candidate.id)
    e.dataTransfer.setData('sourceStage', sourceStage)
  }

  const handleDrop = async (e, targetStage) => {
    e.preventDefault()
    const candidateId = e.dataTransfer.getData('candidateId')
    const sourceStage = e.dataTransfer.getData('sourceStage')

    if (sourceStage === targetStage) return

    try {
      await axios.put(`/api/hr/candidates/${candidateId}/stage`, { stage: targetStage })
      toast.success(`Moved to ${targetStage}`)
      fetchData()
    } catch (error) {
      toast.error('Failed to move candidate')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleViewATSScore = async (candidate) => {
    setSelectedCandidate(candidate)
    setShowATSModal(true)
    setLoadingATS(false)
    setATSScore(null)
    setResumeFile(null)
  }

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF or DOCX file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    setResumeFile(file)
    setUploadingResume(true)
    setLoadingATS(true)

    try {
      // Upload and analyze resume
      const formData = new FormData()
      formData.append('file', file)

      const response = await axios.post('http://localhost:8081/api/resume/analyze-ats', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setATSScore(response.data)
      toast.success('Resume analyzed successfully!')
    } catch (error) {
      console.error('Error analyzing resume:', error)
      toast.error('Failed to analyze resume')
      
      // Fallback to mock data for demo
      setTimeout(() => {
        setATSScore({
          overallScore: Math.floor(Math.random() * 30) + 70,
          formatScore: Math.floor(Math.random() * 20) + 80,
          keywordScore: Math.floor(Math.random() * 25) + 65,
          contentScore: Math.floor(Math.random() * 20) + 75,
          suggestions: [
            {
              type: 'CRITICAL',
              message: 'Add contact information section with email and phone number'
            },
            {
              type: 'RECOMMENDED',
              message: 'Include more technical skills relevant to the job description'
            },
            {
              type: 'OPTIONAL',
              message: 'Consider adding a professional summary at the top'
            },
            {
              type: 'RECOMMENDED',
              message: 'Quantify achievements with specific metrics and numbers'
            }
          ]
        })
      }, 500)
    } finally {
      setUploadingResume(false)
      setLoadingATS(false)
    }
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
      <h1 className="text-4xl font-bold text-gradient mb-8">HR Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card-hover p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-royal rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="badge-primary">Total</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-100 mb-1">{candidates.length}</h3>
          <p className="text-gray-400">Total Candidates</p>
        </div>

        <div className="card-hover p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="badge-success">Active</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-100 mb-1">
            {pipeline.interview?.length + pipeline.assessment?.length || 0}
          </h3>
          <p className="text-gray-400">In Process</p>
        </div>

        <div className="card-hover p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-700 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="badge-warning">This Month</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-100 mb-1">
            {pipeline.hired?.length || 0}
          </h3>
          <p className="text-gray-400">Hired</p>
        </div>

        <div className="card-hover p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-royal rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="badge-success">Rate</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-100 mb-1">68%</h3>
          <p className="text-gray-400">Success Rate</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
            activeTab === 'pipeline'
              ? 'bg-gradient-royal text-white shadow-royal'
              : 'bg-royal-900/30 text-gray-400 hover:bg-royal-900/50'
          }`}
        >
          <Users className="w-5 h-5 inline mr-2" />
          Candidate Pipeline
        </button>
        <button
          onClick={() => setActiveTab('candidates')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
            activeTab === 'candidates'
              ? 'bg-gradient-purple text-white shadow-purple'
              : 'bg-royal-900/30 text-gray-400 hover:bg-royal-900/50'
          }`}
        >
          <Users className="w-5 h-5 inline mr-2" />
          All Candidates
        </button>
        <button
          onClick={() => setActiveTab('ats-checker')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
            activeTab === 'ats-checker'
              ? 'bg-gradient-royal text-white shadow-royal'
              : 'bg-royal-900/30 text-gray-400 hover:bg-royal-900/50'
          }`}
        >
          <Upload className="w-5 h-5 inline mr-2" />
          ATS Checker
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
            activeTab === 'questions'
              ? 'bg-gradient-royal text-white shadow-royal'
              : 'bg-royal-900/30 text-gray-400 hover:bg-royal-900/50'
          }`}
        >
          Question Bank
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'bg-gradient-purple text-white shadow-purple'
              : 'bg-royal-900/30 text-gray-400 hover:bg-royal-900/50'
          }`}
        >
          <BarChart3 className="w-5 h-5 inline mr-2" />
          Analytics
        </button>
      </div>

      {/* Pipeline Kanban Board */}
      {activeTab === 'pipeline' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-100">Candidate Pipeline</h2>
            <button
              onClick={() => setShowInvitationModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Invite Candidate</span>
            </button>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-4">
            {stages.map(stage => (
              <div
                key={stage.id}
                className="flex-shrink-0 w-80"
                onDrop={(e) => handleDrop(e, stage.id)}
                onDragOver={handleDragOver}
              >
                <div className={`${stage.color} text-white px-4 py-3 rounded-t-lg font-semibold flex justify-between items-center`}>
                  <span>{stage.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-sm">
                    {pipeline[stage.id]?.length || 0}
                  </span>
                </div>
                <div className="bg-royal-900/30 rounded-b-lg p-4 min-h-[500px] space-y-3">
                  {pipeline[stage.id]?.map(candidate => (
                    <div
                      key={candidate.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, candidate, stage.id)}
                      className="card p-4 cursor-move hover:shadow-royal transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-100">{candidate.candidateName}</h4>
                          <p className="text-sm text-gray-400">{candidate.candidateEmail || 'No email'}</p>
                        </div>
                        <span className="badge-primary text-xs">{candidate.interviewType}</span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-2xl font-bold text-gradient">{candidate.score}%</span>
                        {candidate.hasAtsScore && (
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">ATS:</span>
                            <span className={`text-lg font-bold ${
                              candidate.atsScore >= 80 ? 'text-green-400' :
                              candidate.atsScore >= 70 ? 'text-blue-400' :
                              candidate.atsScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {candidate.atsScore}%
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(candidate.createdAt).toLocaleDateString()}
                      </div>
                      {candidate.hasAtsScore && (
                        <div className={`mt-2 px-2 py-1 rounded text-xs font-medium text-center ${
                          candidate.atsScore >= 80 ? 'bg-green-600/20 text-green-400' :
                          candidate.atsScore >= 70 ? 'bg-blue-600/20 text-blue-400' :
                          candidate.atsScore >= 60 ? 'bg-yellow-600/20 text-yellow-400' : 'bg-red-600/20 text-red-400'
                        }`}>
                          {candidate.atsScore >= 80 ? '✅ Excellent Resume' :
                           candidate.atsScore >= 70 ? '👍 Good Resume' :
                           candidate.atsScore >= 60 ? '⚠️ Fair Resume' : '❌ Needs Improvement'}
                        </div>
                      )}
                      <button
                        onClick={() => handleViewATSScore(candidate)}
                        className="w-full mt-3 px-3 py-2 bg-purple-600/20 text-purple-400 rounded hover:bg-purple-600/30 transition-colors text-sm font-medium"
                      >
                        {candidate.hasAtsScore ? 'View ATS Details' : 'Upload & Analyze Resume'}
                      </button>
                    </div>
                  ))}
                  {(!pipeline[stage.id] || pipeline[stage.id].length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No candidates</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Candidates Tab */}
      {activeTab === 'candidates' && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-100">All Candidates</h2>
            <div className="flex space-x-3">
              <button className="btn-outline flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </button>
              <button className="btn-outline flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Export</span>
              </button>
              <button
                onClick={() => setShowInvitationModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Send Invitation</span>
              </button>
            </div>
          </div>

          {candidates.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">No candidates yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-royal-800">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Candidate</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Interview Score</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">ATS Score</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b border-royal-900/50 hover:bg-royal-900/30 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-gray-200 font-medium">{candidate.candidateName}</p>
                          <p className="text-sm text-gray-500">{candidate.candidateEmail}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge-primary">{candidate.interviewType}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xl font-bold text-gradient">{candidate.score}%</span>
                      </td>
                      <td className="py-3 px-4">
                        {candidate.hasAtsScore ? (
                          <div className="flex items-center space-x-2">
                            <span className={`text-xl font-bold ${
                              candidate.atsScore >= 80 ? 'text-green-400' :
                              candidate.atsScore >= 70 ? 'text-blue-400' :
                              candidate.atsScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {candidate.atsScore}%
                            </span>
                            <span className="text-xs">
                              {candidate.atsScore >= 80 ? '✅' :
                               candidate.atsScore >= 70 ? '👍' :
                               candidate.atsScore >= 60 ? '⚠️' : '❌'}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-sm">Not uploaded</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`badge-${candidate.status === 'REVIEWED' ? 'success' : 'warning'}`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">
                        {new Date(candidate.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          {candidate.status !== 'REVIEWED' && (
                            <button
                              onClick={() => handleStatusUpdate(candidate.id, 'REVIEWED')}
                              className="flex items-center space-x-1 px-3 py-1 bg-green-600/20 text-green-400 rounded hover:bg-green-600/30 transition-colors text-sm"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Review</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleViewATSScore(candidate)}
                            className="flex items-center space-x-1 px-3 py-1 bg-purple-600/20 text-purple-400 rounded hover:bg-purple-600/30 transition-colors text-sm"
                          >
                            <BarChart3 className="w-4 h-4" />
                            <span>ATS</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ATS Checker Tab - Standalone Resume Analysis */}
      {activeTab === 'ats-checker' && (
        <div className="max-w-4xl mx-auto">
          <div className="card p-8">
            <div className="text-center mb-8">
              <div className="inline-flex w-16 h-16 bg-gradient-royal rounded-2xl items-center justify-center mb-4 shadow-royal">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gradient mb-2">ATS Resume Checker</h2>
              <p className="text-gray-400">
                Upload any resume to get instant ATS analysis and scoring
              </p>
            </div>

            {/* Upload Section */}
            {!atsScore && !loadingATS && (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-royal-700 rounded-xl p-12 hover:border-royal-500 transition-colors bg-royal-900/20 hover:bg-royal-900/30">
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                    disabled={uploadingResume}
                  />
                  <Upload className="w-20 h-20 mx-auto text-royal-400 mb-6" />
                  <p className="text-gray-200 text-xl font-semibold mb-3 text-center">
                    Upload Resume to Analyze
                  </p>
                  <p className="text-gray-400 text-center mb-2">
                    Click to browse or drag and drop your file here
                  </p>
                  <p className="text-gray-600 text-sm text-center">
                    Supported formats: PDF, DOCX (Max 5MB)
                  </p>
                </div>
              </label>
            )}

            {resumeFile && !atsScore && !loadingATS && (
              <div className="mt-6 p-4 bg-royal-900/30 rounded-lg flex items-center justify-between">
                <div className="flex items-center text-gray-300">
                  <svg className="w-6 h-6 mr-3 text-royal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="font-medium">{resumeFile.name}</p>
                    <p className="text-sm text-gray-500">{(resumeFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button
                  onClick={() => setResumeFile(null)}
                  className="text-red-400 hover:text-red-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Loading State */}
            {loadingATS && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="spinner mb-4"></div>
                <p className="text-gray-400 text-lg">Analyzing resume...</p>
                <p className="text-gray-500 text-sm mt-2">Checking format, keywords, and content quality</p>
              </div>
            )}

            {/* Results Display */}
            {atsScore && !loadingATS && (
              <div className="space-y-6 mt-6">
                {/* Overall Score */}
                <div className="text-center py-8 bg-gradient-royal rounded-xl">
                  <p className="text-gray-200 mb-3 text-lg">Overall ATS Score</p>
                  <div className="text-7xl font-bold text-white mb-3">{atsScore.overallScore}%</div>
                  <p className="text-gray-100 text-lg font-medium">
                    {atsScore.overallScore >= 80 ? '✅ Excellent Match' : 
                     atsScore.overallScore >= 70 ? '👍 Good Match' : 
                     atsScore.overallScore >= 60 ? '⚠️ Fair Match' : '❌ Needs Improvement'}
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="card-hover p-6">
                    <div className="flex justify-center mb-4">
                      <div className="relative w-32 h-32">
                        <svg className="transform -rotate-90 w-32 h-32">
                          <circle cx="64" cy="64" r="52" stroke="#1e293b" strokeWidth="12" fill="none" />
                          <circle
                            cx="64" cy="64" r="52"
                            stroke="url(#gradient1)"
                            strokeWidth="12" fill="none" strokeLinecap="round"
                            strokeDasharray={`${(atsScore.formatScore / 100) * 326.73} 326.73`}
                          />
                          <defs>
                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#4F46E5" />
                              <stop offset="100%" stopColor="#9333EA" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-gray-100">{atsScore.formatScore}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-gray-300 font-medium text-lg">Format & Structure</p>
                    <p className="text-center text-sm text-gray-500 mt-1">Resume formatting quality</p>
                  </div>

                  <div className="card-hover p-6">
                    <div className="flex justify-center mb-4">
                      <div className="relative w-32 h-32">
                        <svg className="transform -rotate-90 w-32 h-32">
                          <circle cx="64" cy="64" r="52" stroke="#1e293b" strokeWidth="12" fill="none" />
                          <circle
                            cx="64" cy="64" r="52"
                            stroke="url(#gradient2)"
                            strokeWidth="12" fill="none" strokeLinecap="round"
                            strokeDasharray={`${(atsScore.keywordScore / 100) * 326.73} 326.73`}
                          />
                          <defs>
                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#9333EA" />
                              <stop offset="100%" stopColor="#D97706" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-gray-100">{atsScore.keywordScore}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-gray-300 font-medium text-lg">Keywords & Skills</p>
                    <p className="text-center text-sm text-gray-500 mt-1">Relevant skills match</p>
                  </div>

                  <div className="card-hover p-6">
                    <div className="flex justify-center mb-4">
                      <div className="relative w-32 h-32">
                        <svg className="transform -rotate-90 w-32 h-32">
                          <circle cx="64" cy="64" r="52" stroke="#1e293b" strokeWidth="12" fill="none" />
                          <circle
                            cx="64" cy="64" r="52"
                            stroke="url(#gradient3)"
                            strokeWidth="12" fill="none" strokeLinecap="round"
                            strokeDasharray={`${(atsScore.contentScore / 100) * 326.73} 326.73`}
                          />
                          <defs>
                            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#D97706" />
                              <stop offset="100%" stopColor="#4F46E5" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-gray-100">{atsScore.contentScore}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-gray-300 font-medium text-lg">Content Quality</p>
                    <p className="text-center text-sm text-gray-500 mt-1">Experience & achievements</p>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="card-hover p-6">
                  <h4 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Improvement Suggestions
                  </h4>
                  <div className="space-y-3">
                    {atsScore.suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className={`flex items-start p-4 rounded-lg border-l-4 ${
                          suggestion.type === 'CRITICAL'
                            ? 'bg-red-900/20 border-red-500'
                            : suggestion.type === 'RECOMMENDED'
                            ? 'bg-yellow-900/20 border-yellow-500'
                            : 'bg-blue-900/20 border-blue-500'
                        }`}
                      >
                        <span className="flex-shrink-0 mr-3 text-2xl">
                          {suggestion.type === 'CRITICAL' ? '🔴' : 
                           suggestion.type === 'RECOMMENDED' ? '🟡' : '🔵'}
                        </span>
                        <div className="flex-1">
                          <p className={`font-semibold mb-1 ${
                            suggestion.type === 'CRITICAL'
                              ? 'text-red-400'
                              : suggestion.type === 'RECOMMENDED'
                              ? 'text-yellow-400'
                              : 'text-blue-400'
                          }`}>
                            {suggestion.type}
                          </p>
                          <p className="text-gray-300">{suggestion.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setATSScore(null)
                      setResumeFile(null)
                    }}
                    className="btn-outline flex items-center space-x-2"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Analyze Another Resume</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Report</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Questions Tab */}
      {activeTab === 'questions' && (
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-100">Question Bank</h2>
            <button
              onClick={() => setShowQuestionModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Question</span>
            </button>
          </div>

          {questions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No questions yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question) => (
                <div key={question.id} className="card-hover p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="badge-primary">{question.category}</span>
                      <span className="badge-warning">{question.difficulty}</span>
                    </div>
                    <p className="text-gray-200">{question.text}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Created by {question.createdByName || 'Unknown'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="ml-4 p-2 text-red-400 hover:bg-red-600/20 rounded transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Hiring Funnel</h2>
            <div className="space-y-4">
              {stages.map((stage, index) => {
                const count = pipeline[stage.id]?.length || 0
                const percentage = candidates.length > 0 ? (count / candidates.length) * 100 : 0
                return (
                  <div key={stage.id}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">{stage.name}</span>
                      <span className="text-gray-400">{count} candidates ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="h-3 bg-royal-900/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${stage.color} transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Time to Hire</h3>
              <div className="text-4xl font-bold text-gradient mb-2">18 days</div>
              <p className="text-sm text-gray-400">Average across all positions</p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Offer Accept Rate</h3>
              <div className="text-4xl font-bold text-gradient mb-2">85%</div>
              <p className="text-sm text-gray-400">Candidates accepted offers</p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Source Quality</h3>
              <div className="text-4xl font-bold text-gradient mb-2">Direct</div>
              <p className="text-sm text-gray-400">Best performing source</p>
            </div>
          </div>
        </div>
      )}

      {/* Create Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gradient mb-6">Create New Question</h3>
            <form onSubmit={handleCreateQuestion} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Question Text</label>
                <textarea
                  value={newQuestion.text}
                  onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                  className="input-field min-h-[120px]"
                  placeholder="Enter your question here..."
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={newQuestion.category}
                    onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="TECHNICAL">Technical</option>
                    <option value="HR">HR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                  <select
                    value={newQuestion.difficulty}
                    onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                    className="input-field"
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button type="submit" className="btn-primary flex-1">Create Question</button>
                <button
                  type="button"
                  onClick={() => setShowQuestionModal(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Send Invitation Modal */}
      <SendInvitationModal
        isOpen={showInvitationModal}
        onClose={() => setShowInvitationModal(false)}
        onSuccess={(data) => {
          toast.success('Invitation sent successfully!')
          fetchData()
        }}
      />

      {/* ATS Score Modal */}
      {showATSModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="card p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gradient mb-2">ATS Resume Analysis</h3>
                <p className="text-gray-400">
                  {selectedCandidate?.candidateName} - {selectedCandidate?.candidateEmail}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowATSModal(false)
                  setATSScore(null)
                  setResumeFile(null)
                }}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Upload Resume Section */}
            {!atsScore && !loadingATS && (
              <div className="mb-6">
                <label className="block text-center">
                  <div className="border-2 border-dashed border-royal-700 rounded-xl p-8 hover:border-royal-500 transition-colors cursor-pointer bg-royal-900/20">
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                      disabled={uploadingResume}
                    />
                    <Upload className="w-16 h-16 mx-auto text-royal-400 mb-4" />
                    <p className="text-gray-300 text-lg font-semibold mb-2">
                      Upload Resume to Analyze
                    </p>
                    <p className="text-gray-500 text-sm">
                      Click to browse or drag and drop
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                      Supported formats: PDF, DOCX (Max 5MB)
                    </p>
                  </div>
                </label>
                {resumeFile && (
                  <div className="mt-4 flex items-center justify-center text-gray-400">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{resumeFile.name}</span>
                  </div>
                )}
              </div>
            )}

            {loadingATS ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="spinner mb-4"></div>
                <p className="text-gray-400">Analyzing resume...</p>
                <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
              </div>
            ) : atsScore ? (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="text-center py-6 bg-gradient-royal rounded-xl">
                  <p className="text-gray-300 mb-2">Overall ATS Score</p>
                  <div className="text-6xl font-bold text-white mb-2">{atsScore.overallScore}%</div>
                  <p className="text-gray-200">
                    {atsScore.overallScore >= 80 ? 'Excellent Match' : 
                     atsScore.overallScore >= 70 ? 'Good Match' : 
                     atsScore.overallScore >= 60 ? 'Fair Match' : 'Needs Improvement'}
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="card-hover p-6">
                    <div className="flex justify-center mb-4">
                      <div className="relative w-32 h-32">
                        <svg className="transform -rotate-90 w-32 h-32">
                          <circle
                            cx="64"
                            cy="64"
                            r="52"
                            stroke="#1e293b"
                            strokeWidth="12"
                            fill="none"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="52"
                            stroke="url(#gradient1)"
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${(atsScore.formatScore / 100) * 326.73} 326.73`}
                          />
                          <defs>
                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#4F46E5" />
                              <stop offset="100%" stopColor="#9333EA" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-gray-100">{atsScore.formatScore}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-gray-300 font-medium">Format & Structure</p>
                    <p className="text-center text-sm text-gray-500 mt-1">Resume formatting quality</p>
                  </div>

                  <div className="card-hover p-6">
                    <div className="flex justify-center mb-4">
                      <div className="relative w-32 h-32">
                        <svg className="transform -rotate-90 w-32 h-32">
                          <circle
                            cx="64"
                            cy="64"
                            r="52"
                            stroke="#1e293b"
                            strokeWidth="12"
                            fill="none"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="52"
                            stroke="url(#gradient2)"
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${(atsScore.keywordScore / 100) * 326.73} 326.73`}
                          />
                          <defs>
                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#9333EA" />
                              <stop offset="100%" stopColor="#D97706" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-gray-100">{atsScore.keywordScore}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-gray-300 font-medium">Keywords & Skills</p>
                    <p className="text-center text-sm text-gray-500 mt-1">Relevant skills match</p>
                  </div>

                  <div className="card-hover p-6">
                    <div className="flex justify-center mb-4">
                      <div className="relative w-32 h-32">
                        <svg className="transform -rotate-90 w-32 h-32">
                          <circle
                            cx="64"
                            cy="64"
                            r="52"
                            stroke="#1e293b"
                            strokeWidth="12"
                            fill="none"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="52"
                            stroke="url(#gradient3)"
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${(atsScore.contentScore / 100) * 326.73} 326.73`}
                          />
                          <defs>
                            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#D97706" />
                              <stop offset="100%" stopColor="#4F46E5" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-gray-100">{atsScore.contentScore}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-gray-300 font-medium">Content Quality</p>
                    <p className="text-center text-sm text-gray-500 mt-1">Experience & achievements</p>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="card-hover p-6">
                  <h4 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Improvement Suggestions
                  </h4>
                  <div className="space-y-3">
                    {atsScore.suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className={`flex items-start p-3 rounded-lg border-l-4 ${
                          suggestion.type === 'CRITICAL'
                            ? 'bg-red-900/20 border-red-500'
                            : suggestion.type === 'RECOMMENDED'
                            ? 'bg-yellow-900/20 border-yellow-500'
                            : 'bg-blue-900/20 border-blue-500'
                        }`}
                      >
                        <span className="flex-shrink-0 mr-3">
                          {suggestion.type === 'CRITICAL' ? '🔴' : 
                           suggestion.type === 'RECOMMENDED' ? '🟡' : '🔵'}
                        </span>
                        <div className="flex-1">
                          <p className={`font-medium mb-1 ${
                            suggestion.type === 'CRITICAL'
                              ? 'text-red-400'
                              : suggestion.type === 'RECOMMENDED'
                              ? 'text-yellow-400'
                              : 'text-blue-400'
                          }`}>
                            {suggestion.type}
                          </p>
                          <p className="text-gray-300">{suggestion.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setShowATSModal(false)
                      setATSScore(null)
                      setResumeFile(null)
                    }}
                    className="btn-primary"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
