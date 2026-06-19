import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import toast from 'react-hot-toast';
import {
  FaRobot,
  FaCode,
  FaFileAlt,
  FaHistory,
  FaArrowRight,
  FaStar,
  FaRocket,
  FaGraduationCap,
  FaChartLine,
  FaLightbulb,
  FaCalendarAlt,
  FaBriefcase,
} from 'react-icons/fa';
import Navbar from './Navbar';
import { context } from '../context/Context';

const API_BASE = 'http://localhost:5000';

// ─── Quick-action card data ───────────────────────────────────────────────────
const QUICK_ACTIONS = [
  {
    id: 'hr-interview',
    title: 'HR Interview',
    description: 'Practice behavioral questions with real-time emotion feedback and AI-powered insights.',
    icon: <FaRobot className="text-4xl" />,
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    href: '/hr',
    badge: 'Live AI Feedback',
    badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  },
  {
    id: 'technical-interview',
    title: 'Technical Interview',
    description: 'Tackle coding challenges and system design questions at your own pace.',
    icon: <FaCode className="text-4xl" />,
    gradient: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.25)',
    href: '/technical',
    badge: 'Coding + Theory',
    badgeColor: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  },
  {
    id: 'resume',
    title: 'Resume Analysis',
    description: 'Upload your resume for ATS scoring, keyword gaps, and actionable improvement tips.',
    icon: <FaFileAlt className="text-4xl" />,
    gradient: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    href: '/resume',
    badge: 'ATS Optimized',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  },
];

// ─── Motivational tips ────────────────────────────────────────────────────────
const TIPS = [
  'Confidence is built through practice — start with one interview today.',
  'Review your resume before every interview to stay sharp.',
  'Behavioral questions follow the STAR method: Situation, Task, Action, Result.',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
});

const formatRelativeDate = (isoString) => {
  if (!isoString) return 'No activity yet';
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(isoString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const getScoreColor = (score) => {
  if (score >= 85) return '#10b981';
  if (score >= 70) return '#2563EB';
  if (score >= 55) return '#f59e0b';
  return '#ef4444';
};

// ─── Component ────────────────────────────────────────────────────────────────
const StudentDashboard = () => {
  const { userName } = useContext(context);
  const navigate = useNavigate();
  const [tipIndex] = useState(() => Math.floor(Math.random() * TIPS.length));

  // Real data state
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, activityRes] = await Promise.all([
          fetch(`${API_BASE}/api/student/stats`, { headers: getAuthHeaders() }),
          fetch(`${API_BASE}/api/student/recent-activity`, { headers: getAuthHeaders() }),
        ]);

        if (!statsRes.ok || !activityRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const statsData = await statsRes.json();
        const activityData = await activityRes.json();

        setStats(statsData);
        setRecentActivity(activityData);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        toast.error('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = userName
    ? userName.charAt(0).toUpperCase() + userName.slice(1)
    : 'Candidate';

  // Build the stats strip from real data
  const statsCards = stats
    ? [
        {
          label: 'Interviews Completed',
          value: stats.interviews_completed,
          icon: <FaRocket className="text-purple-400" />,
        },
        {
          label: 'Average Score',
          value: stats.average_score,
          icon: <FaChartLine className="text-emerald-400" />,
        },
        {
          label: 'Last Activity',
          value: stats.last_activity
            ? formatRelativeDate(stats.last_activity)
            : 'None yet',
          icon: <FaCalendarAlt className="text-blue-400" />,
        },
      ]
    : [];

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1a1040 50%, #0d1b2a 100%)' }}
    >
      <Navbar />

      {/* ── Hero Welcome Bar ──────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden px-6 py-14"
        style={{
          background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(192,38,211,0.1) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Ambient glow blobs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(192,38,211,0.15) 0%, transparent 70%)',
            filter: 'blur(50px)',
            transform: 'translate(50%, 50%)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="p-2 rounded-xl"
              style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.3)' }}
            >
              <FaGraduationCap className="text-2xl text-blue-400" />
            </div>
            <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
              Candidate Dashboard
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {getGreeting()},{' '}
            <span className="gradient-text">{displayName}! 👋</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Your AI-powered interview preparation hub. Pick a session below and start
            building the confidence that lands the offer.
          </p>

          {/* Motivational tip pill */}
          <div
            className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full text-sm"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <FaLightbulb className="text-yellow-400 text-xs flex-shrink-0" />
            <span className="text-gray-300">{TIPS[tipIndex]}</span>
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Quick-action cards */}
        <div className="mb-3">
          <h2 className="text-2xl font-bold text-white mb-1">Start a Session</h2>
          <p className="text-gray-500 text-sm">Choose what you want to practice today</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              onClick={() => navigate(action.href)}
              className="group text-left w-full card-hover"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                padding: '28px 24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.boxShadow = `0 20px 60px ${action.glowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon */}
              <div
                className={`inline-flex p-3 rounded-xl mb-5 bg-gradient-to-br ${action.gradient}`}
                style={{ transition: 'transform 0.3s ease' }}
              >
                <span className="text-white">{action.icon}</span>
              </div>

              {/* Badge */}
              <div className="mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${action.badgeColor}`}>
                  {action.badge}
                </span>
              </div>

              {/* Title + desc */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                {action.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{action.description}</p>

              {/* Arrow CTA */}
              <div
                className="flex items-center gap-2 mt-5 text-sm font-semibold"
                style={{ color: '#2563EB' }}
              >
                <span>Get started</span>
                <FaArrowRight
                  className="text-xs transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </button>
          ))}
        </div>

        {/* ── Stats strip ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-14">
          {loading ? (
            // Skeleton loaders
            [1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-2xl p-5 text-center card-hover">
                <Skeleton
                  circle
                  width={32}
                  height={32}
                  baseColor="rgba(255,255,255,0.06)"
                  highlightColor="rgba(255,255,255,0.12)"
                  style={{ marginBottom: '8px' }}
                />
                <Skeleton
                  width={60}
                  height={28}
                  baseColor="rgba(255,255,255,0.06)"
                  highlightColor="rgba(255,255,255,0.12)"
                  style={{ marginBottom: '4px' }}
                />
                <Skeleton
                  width={100}
                  height={14}
                  baseColor="rgba(255,255,255,0.06)"
                  highlightColor="rgba(255,255,255,0.12)"
                />
              </div>
            ))
          ) : (
            statsCards.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-5 text-center card-hover"
              >
                <div className="flex justify-center mb-2 text-xl">{stat.icon}</div>
                <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-gray-500 text-xs">{stat.label}</div>
              </div>
            ))
          )}
        </div>

        {/* ── Recent Activity ───────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <FaHistory className="text-gray-500 text-lg" />
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
          </div>

          {loading ? (
            // Skeleton loaders for activity
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <Skeleton
                    width="70%"
                    height={20}
                    baseColor="rgba(255,255,255,0.06)"
                    highlightColor="rgba(255,255,255,0.12)"
                    style={{ marginBottom: '8px' }}
                  />
                  <Skeleton
                    width="40%"
                    height={14}
                    baseColor="rgba(255,255,255,0.06)"
                    highlightColor="rgba(255,255,255,0.12)"
                  />
                </div>
              ))}
            </div>
          ) : recentActivity.length > 0 ? (
            // Real activity cards
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          background: item.interview_type === 'hr'
                            ? 'rgba(192,38,211,0.15)'
                            : 'rgba(37,99,235,0.15)',
                          border: item.interview_type === 'hr'
                            ? '1px solid rgba(192,38,211,0.3)'
                            : '1px solid rgba(37,99,235,0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {item.interview_type === 'hr'
                          ? <FaBriefcase style={{ color: '#C026D3', fontSize: '14px' }} />
                          : <FaCode style={{ color: '#2563EB', fontSize: '14px' }} />
                        }
                      </div>
                      <div>
                        <div style={{ color: '#e5e7eb', fontWeight: '600', fontSize: '14px' }}>
                          {item.interview_type === 'hr' ? 'HR Interview' : 'Technical Interview'}
                        </div>
                        <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '2px' }}>
                          {formatRelativeDate(item.created_at)}
                          {item.status === 'reviewed' && (
                            <span style={{ color: '#10b981', marginLeft: '8px' }}>✓ Reviewed</span>
                          )}
                          {item.status === 'pending_review' && (
                            <span style={{ color: '#f59e0b', marginLeft: '8px' }}>⏳ Pending</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Score */}
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          color: getScoreColor(item.score),
                          fontWeight: '700',
                          fontSize: '20px',
                          lineHeight: 1,
                        }}
                      >
                        {item.score}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '10px' }}>/ 100</div>
                    </div>
                  </div>

                  {/* Feedback summary */}
                  {item.feedback_summary && (
                    <p style={{
                      color: '#9ca3af',
                      fontSize: '13px',
                      marginTop: '10px',
                      lineHeight: '1.5',
                      paddingLeft: '48px',
                    }}>
                      {item.feedback_summary}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Empty state
            <div
              className="rounded-2xl p-16 text-center"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px dashed rgba(255,255,255,0.12)',
              }}
            >
              <div className="text-6xl mb-5">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-2">No interviews yet</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                Start your first session above and your activity history will appear here —
                including scores, feedback, and progress over time.
              </p>
              <button
                onClick={() => navigate('/hr')}
                className="btn-primary px-6 py-3 rounded-full text-white text-sm font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Start your first interview →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
