import React, { useContext, useState, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import toast from 'react-hot-toast';
import {
  FaUsers,
  FaClipboardList,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSearch,
  FaStar,
  FaCheckCircle,
  FaClock,
  FaBriefcase,
  FaCode,
  FaFileAlt,
} from 'react-icons/fa';
import Navbar from './Navbar';
import { context } from '../context/Context';

const API_BASE = 'http://localhost:5000';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
});

const getScoreColor = (score) => {
  if (score >= 85) return '#10b981'; // emerald
  if (score >= 70) return '#2563EB'; // blue
  if (score >= 55) return '#f59e0b'; // amber
  return '#ef4444'; // red
};

const getStatusStyle = (status) =>
  status === 'reviewed'
    ? {
        background: 'rgba(16,185,129,0.15)',
        color: '#10b981',
        border: '1px solid rgba(16,185,129,0.3)',
      }
    : {
        background: 'rgba(245,158,11,0.15)',
        color: '#f59e0b',
        border: '1px solid rgba(245,158,11,0.3)',
      };

const getStatusLabel = (status) =>
  status === 'reviewed' ? 'Reviewed' : 'Pending Review';

const getDifficultyStyle = (diff) => {
  const map = {
    Easy: { background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' },
    Medium: { background: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.25)' },
    Hard: { background: 'rgba(239,68,68,0.12)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.25)' },
  };
  return map[diff] || map.Medium;
};

const getCategoryStyle = (cat) => {
  const lower = cat.toLowerCase();
  return lower === 'hr'
    ? { background: 'rgba(192,38,211,0.12)', color: '#e879f9', border: '1px solid rgba(192,38,211,0.25)' }
    : { background: 'rgba(37,99,235,0.12)', color: '#60a5fa', border: '1px solid rgba(37,99,235,0.25)' };
};

const getCategoryLabel = (cat) => {
  const lower = cat.toLowerCase();
  return lower === 'hr' ? 'HR' : 'Technical';
};

const getInterviewTypeLabel = (type) => {
  const lower = type.toLowerCase();
  return lower === 'hr' ? 'HR Interview' : 'Technical Interview';
};

// ─── Modal wrapper ────────────────────────────────────────────────────────────
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1040 0%, #0d1b2a 100%)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '20px',
          padding: '32px',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', margin: 0 }}>{title}</h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px' }}
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// ─── Badge ────────────────────────────────────────────────────────────────────
const Badge = ({ children, style }) => (
  <span
    style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: '999px',
      fontSize: '11px',
      fontWeight: '600',
      ...style,
    }}
  >
    {children}
  </span>
);

// ─── Score ring ───────────────────────────────────────────────────────────────
const ScoreRing = ({ score }) => {
  const color = getScoreColor(score);
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
        <circle
          cx="45" cy="45" r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
        <text x="45" y="50" textAnchor="middle" fill={color} fontSize="18" fontWeight="700">
          {score}
        </text>
      </svg>
      <span style={{ color: '#9ca3af', fontSize: '11px' }}>/ 100</span>
    </div>
  );
};

// ─── Candidate detail modal content ──────────────────────────────────────────
const CandidateDetail = ({ candidate }) => (
  <div>
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap' }}>
      <ScoreRing score={candidate.score} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
          <Badge style={getCategoryStyle(candidate.interview_type)}>
            {getInterviewTypeLabel(candidate.interview_type)}
          </Badge>
          <Badge style={getStatusStyle(candidate.status)}>{getStatusLabel(candidate.status)}</Badge>
        </div>
        <p style={{ color: '#d1d5db', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
          {candidate.feedback_summary || 'No feedback summary available.'}
        </p>
      </div>
    </div>
  </div>
);

// ─── Add/Edit Question form ───────────────────────────────────────────────────
const QuestionForm = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState(
    initial || { text: '', category: 'HR', difficulty: 'Medium' }
  );
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    padding: '10px 14px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  };
  const labelStyle = {
    display: 'block',
    color: '#9ca3af',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '6px',
  };

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSave(form); }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <div>
        <label style={labelStyle}>Question Text</label>
        <textarea
          name="text"
          value={form.text}
          onChange={handle}
          required
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="Enter the interview question..."
        />
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Category</label>
          <select name="category" value={form.category} onChange={handle} style={inputStyle}>
            <option value="HR">HR</option>
            <option value="Technical">Technical</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Difficulty</label>
          <select name="difficulty" value={form.difficulty} onChange={handle} style={inputStyle}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '4px' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'transparent',
            color: '#9ca3af',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            padding: '10px 24px',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Save Question
        </button>
      </div>
    </form>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const HrDashboard = () => {
  const { userName } = useContext(context);
  const [activeTab, setActiveTab] = useState('candidates'); // 'candidates' | 'questions'
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [questionFilter, setQuestionFilter] = useState('All');
  const [questionModal, setQuestionModal] = useState(null); // null | 'add' | { editing: question }
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Real data state
  const [candidates, setCandidates] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  const displayName = userName
    ? userName.charAt(0).toUpperCase() + userName.slice(1)
    : 'Interviewer';

  // ── Data fetching ─────────────────────────────────────────────────────────
  const fetchCandidates = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/hr/candidates`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error('Failed to fetch candidates');
      const data = await res.json();
      setCandidates(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load candidate data.');
    } finally {
      setLoadingCandidates(false);
    }
  }, []);

  const fetchQuestions = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/hr/questions`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error('Failed to fetch questions');
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load questions.');
    } finally {
      setLoadingQuestions(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates();
    fetchQuestions();
  }, [fetchCandidates, fetchQuestions]);

  // ── Candidate Results helpers ─────────────────────────────────────────────
  const filteredCandidates = candidates.filter((c) =>
    (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.interview_type || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Status toggle ─────────────────────────────────────────────────────────
  const handleStatusToggle = async (interviewId, currentStatus) => {
    const newStatus = currentStatus === 'reviewed' ? 'pending_review' : 'reviewed';
    try {
      const res = await fetch(`${API_BASE}/api/hr/candidates/${interviewId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      toast.success(`Status updated to ${getStatusLabel(newStatus)}`);
      fetchCandidates(); // Refetch to confirm persistence
    } catch (err) {
      console.error(err);
      toast.error('Failed to update candidate status.');
    }
  };

  // ── Question Bank helpers ─────────────────────────────────────────────────
  const filteredQuestions = questions.filter(
    (q) => questionFilter === 'All' || getCategoryLabel(q.category) === questionFilter
  );

  const handleSaveQuestion = async (form) => {
    try {
      if (questionModal === 'add') {
        // Create
        const res = await fetch(`${API_BASE}/api/hr/questions`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('Failed to create question');
        toast.success('Question created!');
      } else if (questionModal?.editing) {
        // Update
        const res = await fetch(`${API_BASE}/api/hr/questions/${questionModal.editing.id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('Failed to update question');
        toast.success('Question updated!');
      }
      setQuestionModal(null);
      fetchQuestions(); // Refetch to confirm persistence
    } catch (err) {
      console.error(err);
      toast.error('Failed to save question.');
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/hr/questions/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error('Failed to delete question');
      toast.success('Question deleted.');
      setDeleteConfirm(null);
      fetchQuestions(); // Refetch to confirm persistence
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete question.');
    }
  };

  // ── Styles ────────────────────────────────────────────────────────────────
  const cardStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    overflow: 'hidden',
  };

  const tabBtnStyle = (tab) => ({
    padding: '10px 24px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    background: activeTab === tab
      ? 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)'
      : 'rgba(255,255,255,0.06)',
    color: activeTab === tab ? '#fff' : '#9ca3af',
  });

  // ── Skeleton row helper ───────────────────────────────────────────────────
  const SkeletonRow = () => (
    <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <Skeleton
        height={20}
        baseColor="rgba(255,255,255,0.06)"
        highlightColor="rgba(255,255,255,0.12)"
      />
    </div>
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0c29 50%, #0a0f1a 100%)' }}
    >
      <Navbar />

      {/* ── Header bar ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '20px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <FaBriefcase style={{ color: '#C026D3', fontSize: '18px' }} />
              <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', margin: 0 }}>
                Interviewer Dashboard
              </h1>
            </div>
            <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>
              Signed in as <span style={{ color: '#C026D3', fontWeight: '600' }}>{displayName}</span>
            </p>
          </div>

          {/* Tab switcher */}
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.04)', padding: '4px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              style={tabBtnStyle('candidates')}
              onClick={() => setActiveTab('candidates')}
            >
              <FaUsers style={{ display: 'inline', marginRight: '6px' }} />
              Candidate Results
            </button>
            <button
              style={tabBtnStyle('questions')}
              onClick={() => setActiveTab('questions')}
            >
              <FaClipboardList style={{ display: 'inline', marginRight: '6px' }} />
              Question Bank
            </button>
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto" style={{ padding: '28px 24px' }}>

        {/* ═══════════════════ CANDIDATE RESULTS TAB ═══════════════════ */}
        {activeTab === 'candidates' && (
          <div>
            {/* Summary stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {loadingCandidates ? (
                [1, 2, 3, 4].map((i) => (
                  <div key={i} style={{ ...cardStyle, padding: '16px 20px' }}>
                    <Skeleton height={40} baseColor="rgba(255,255,255,0.06)" highlightColor="rgba(255,255,255,0.12)" />
                  </div>
                ))
              ) : (
                [
                  { label: 'Total Candidates', value: candidates.length, icon: <FaUsers />, color: '#2563EB' },
                  { label: 'Reviewed', value: candidates.filter(c => c.status === 'reviewed').length, icon: <FaCheckCircle />, color: '#10b981' },
                  { label: 'Pending Review', value: candidates.filter(c => c.status === 'pending_review').length, icon: <FaClock />, color: '#f59e0b' },
                  { label: 'Avg. Score', value: candidates.length > 0 ? Math.round(candidates.reduce((a, c) => a + c.score, 0) / candidates.length) : 0, icon: <FaStar />, color: '#C026D3' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{ ...cardStyle, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: `${stat.color}22`,
                        border: `1px solid ${stat.color}44`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: stat.color,
                        fontSize: '16px',
                        flexShrink: 0,
                      }}
                    >
                      {stat.icon}
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontSize: '22px', fontWeight: '700', lineHeight: 1 }}>
                        {stat.value}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '11px', marginTop: '3px' }}>{stat.label}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Search bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '10px 16px',
                marginBottom: '16px',
              }}
            >
              <FaSearch style={{ color: '#6b7280', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search by candidate name or interview type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: '14px',
                  width: '100%',
                }}
              />
            </div>

            {/* Candidates table */}
            <div style={cardStyle}>
              {/* Table header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.5fr 1fr 80px 120px 100px',
                  gap: '12px',
                  padding: '12px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                {['Candidate', 'Interview Type', 'Date', 'Score', 'Status', 'Action'].map((h) => (
                  <span key={h} style={{ color: '#6b7280', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {h}
                  </span>
                ))}
              </div>

              {loadingCandidates ? (
                [1, 2, 3].map((i) => <SkeletonRow key={i} />)
              ) : filteredCandidates.length === 0 ? (
                <div style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
                  No candidates match your search.
                </div>
              ) : (
                filteredCandidates.map((candidate, idx) => (
                  <div
                    key={candidate.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1.5fr 1fr 80px 120px 100px',
                      gap: '12px',
                      padding: '16px 20px',
                      alignItems: 'center',
                      borderBottom: idx < filteredCandidates.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      transition: 'background 0.2s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    {/* Name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: '13px',
                          fontWeight: '700',
                          flexShrink: 0,
                        }}
                      >
                        {(candidate.name || '?').charAt(0)}
                      </div>
                      <span style={{ color: '#e5e7eb', fontWeight: '600', fontSize: '14px' }}>
                        {candidate.name}
                      </span>
                    </div>

                    {/* Type */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {candidate.interview_type === 'hr' ? (
                        <FaBriefcase style={{ color: '#C026D3', fontSize: '12px' }} />
                      ) : (
                        <FaCode style={{ color: '#2563EB', fontSize: '12px' }} />
                      )}
                      <span style={{ color: '#9ca3af', fontSize: '13px' }}>
                        {getInterviewTypeLabel(candidate.interview_type)}
                      </span>
                    </div>

                    {/* Date */}
                    <span style={{ color: '#6b7280', fontSize: '12px' }}>
                      {new Date(candidate.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>

                    {/* Score */}
                    <span
                      style={{
                        color: getScoreColor(candidate.score),
                        fontWeight: '700',
                        fontSize: '16px',
                      }}
                    >
                      {candidate.score}
                    </span>

                    {/* Status Badge — clickable to toggle */}
                    <button
                      onClick={() => handleStatusToggle(candidate.id, candidate.status)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                      }}
                      title="Click to toggle status"
                    >
                      <Badge style={getStatusStyle(candidate.status)}>
                        {getStatusLabel(candidate.status)}
                      </Badge>
                    </button>

                    {/* Action */}
                    <button
                      onClick={() => setSelectedCandidate(candidate)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 14px',
                        borderRadius: '8px',
                        border: '1px solid rgba(37,99,235,0.4)',
                        background: 'rgba(37,99,235,0.1)',
                        color: '#60a5fa',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.25)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.1)'; }}
                    >
                      <FaEye style={{ fontSize: '11px' }} />
                      Details
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════ QUESTION BANK TAB ═══════════════════════ */}
        {activeTab === 'questions' && (
          <div>
            {/* Toolbar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              {/* Category filter chips */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {['All', 'HR', 'Technical'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setQuestionFilter(cat)}
                    style={{
                      padding: '7px 18px',
                      borderRadius: '999px',
                      border: questionFilter === cat
                        ? '1px solid rgba(37,99,235,0.6)'
                        : '1px solid rgba(255,255,255,0.1)',
                      background: questionFilter === cat
                        ? 'rgba(37,99,235,0.2)'
                        : 'rgba(255,255,255,0.04)',
                      color: questionFilter === cat ? '#60a5fa' : '#6b7280',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {cat === 'HR' && <FaBriefcase style={{ fontSize: '10px' }} />}
                    {cat === 'Technical' && <FaCode style={{ fontSize: '10px' }} />}
                    {cat === 'All' && <FaClipboardList style={{ fontSize: '10px' }} />}
                    {cat}
                    <span
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '1px 6px',
                        borderRadius: '999px',
                        fontSize: '10px',
                      }}
                    >
                      {cat === 'All'
                        ? questions.length
                        : questions.filter(q => getCategoryLabel(q.category) === cat).length}
                    </span>
                  </button>
                ))}
              </div>

              {/* Add button */}
              <button
                onClick={() => setQuestionModal('add')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                <FaPlus style={{ fontSize: '11px' }} />
                Add New Question
              </button>
            </div>

            {/* Questions list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {loadingQuestions ? (
                [1, 2, 3].map((i) => (
                  <div key={i} style={{ ...cardStyle, padding: '16px 20px' }}>
                    <Skeleton height={20} baseColor="rgba(255,255,255,0.06)" highlightColor="rgba(255,255,255,0.12)" />
                  </div>
                ))
              ) : filteredQuestions.length === 0 ? (
                <div
                  style={{ ...cardStyle, padding: '48px', textAlign: 'center', color: '#6b7280' }}
                >
                  No questions in this category yet. Add one using the button above.
                </div>
              ) : (
                filteredQuestions.map((q) => (
                  <div
                    key={q.id}
                    style={{
                      ...cardStyle,
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.055)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                  >
                    <FaFileAlt style={{ color: '#4b5563', fontSize: '14px', flexShrink: 0 }} />

                    <p style={{ flex: 1, color: '#e5e7eb', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
                      {q.text}
                    </p>

                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
                      <Badge style={getCategoryStyle(q.category)}>{getCategoryLabel(q.category)}</Badge>
                      <Badge style={getDifficultyStyle(q.difficulty)}>{q.difficulty}</Badge>
                    </div>

                    {/* Edit / Delete */}
                    <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                      <button
                        onClick={() => setQuestionModal({ editing: q })}
                        style={{
                          padding: '7px 12px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.1)',
                          background: 'rgba(255,255,255,0.05)',
                          color: '#9ca3af',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#9ca3af'; }}
                        title="Edit"
                      >
                        <FaEdit style={{ fontSize: '12px' }} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(q.id)}
                        style={{
                          padding: '7px 12px',
                          borderRadius: '8px',
                          border: '1px solid rgba(239,68,68,0.2)',
                          background: 'rgba(239,68,68,0.08)',
                          color: '#ef4444',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
                        title="Delete"
                      >
                        <FaTrash style={{ fontSize: '12px' }} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Modals ───────────────────────────────────────────────────────── */}

      {/* Candidate detail modal */}
      <Modal
        open={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        title={selectedCandidate ? `${selectedCandidate.name} — Interview Review` : ''}
      >
        {selectedCandidate && <CandidateDetail candidate={selectedCandidate} />}
      </Modal>

      {/* Add/Edit question modal */}
      <Modal
        open={!!questionModal}
        onClose={() => setQuestionModal(null)}
        title={questionModal === 'add' ? 'Add New Question' : 'Edit Question'}
      >
        {questionModal && (
          <QuestionForm
            initial={questionModal?.editing || null}
            onSave={handleSaveQuestion}
            onCancel={() => setQuestionModal(null)}
          />
        )}
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Question"
      >
        <p style={{ color: '#d1d5db', marginBottom: '24px' }}>
          Are you sure you want to delete this question? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setDeleteConfirm(null)}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent',
              color: '#9ca3af',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteQuestion(deleteConfirm)}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HrDashboard;
