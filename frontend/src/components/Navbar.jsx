import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-final.png';
import { context } from '../context/Context';
import { FaChevronDown, FaSignOutAlt, FaTachometerAlt, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { isLoggedIn, userName, userRole, logout } = useContext(context);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const getDashboardPath = () => (userRole === 'hr' ? '/hr-dashboard' : '/dashboard');

  const displayName = userName
    ? userName.charAt(0).toUpperCase() + userName.slice(1)
    : 'User';

  // ── Nav links (common) ──────────────────────────────────────────────────
  const navLink = (href, label) => (
    <a
      href={href}
      className="relative font-semibold text-base text-white hover:text-purple-300 transition duration-300 group"
    >
      {label}
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full" />
    </a>
  );

  return (
    <header className="sticky top-0 left-0 w-full p-4 shadow-lg flex justify-between items-center z-50 glass">
      {/* Logo */}
      <a href="/" className="text-2xl font-bold transition-transform hover:scale-105">
        <img src={logo} alt="Logo" className="w-[200px] md:w-[250px]" />
      </a>

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:flex space-x-8 items-center">
        {navLink('/home', 'Home')}
        {navLink('/technical', 'Technical')}
        {navLink('/hr', 'HR Interview')}
        {navLink('/resume', 'Resume ATS')}
        {localStorage.getItem('resumeresult') && navLink('/resume/result', 'Resume Report')}
        {navLink('/contactus', 'Contact')}

        {/* ── Auth zone ── */}
        {isLoggedIn ? (
          /* Logged-in: user avatar + dropdown */
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            >
              {/* Avatar circle */}
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: userRole === 'hr'
                    ? 'linear-gradient(135deg, #C026D3, #7C3AED)'
                    : 'linear-gradient(135deg, #2563EB, #7C3AED)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                {displayName.charAt(0)}
              </div>
              <span>{displayName}</span>
              <FaChevronDown
                style={{
                  fontSize: '10px',
                  transition: 'transform 0.2s ease',
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 10px)',
                  right: 0,
                  minWidth: '200px',
                  background: 'rgba(15, 12, 41, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  zIndex: 100,
                }}
              >
                {/* Role badge */}
                <div
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Signed in as</div>
                  <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{displayName}</div>
                  <div
                    style={{
                      display: 'inline-block',
                      marginTop: '4px',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontSize: '10px',
                      fontWeight: '600',
                      background: userRole === 'hr'
                        ? 'rgba(192,38,211,0.2)'
                        : 'rgba(37,99,235,0.2)',
                      color: userRole === 'hr' ? '#e879f9' : '#60a5fa',
                      border: userRole === 'hr'
                        ? '1px solid rgba(192,38,211,0.3)'
                        : '1px solid rgba(37,99,235,0.3)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {userRole === 'hr' ? 'HR / Interviewer' : 'Student'}
                  </div>
                </div>

                {/* Dashboard link */}
                <button
                  onClick={() => { navigate(getDashboardPath()); setIsDropdownOpen(false); }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'none',
                    border: 'none',
                    color: '#e5e7eb',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textAlign: 'left',
                    transition: 'background 0.15s ease',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                >
                  <FaTachometerAlt style={{ color: '#7C3AED', fontSize: '13px' }} />
                  Dashboard
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textAlign: 'left',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                >
                  <FaSignOutAlt style={{ fontSize: '13px' }} />
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Logged-out: Login button (unchanged from original) */
          <a
            href="/login"
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Login
          </a>
        )}
      </nav>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden p-2 focus:outline-none text-white hover:text-purple-300 transition"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full glass lg:hidden shadow-xl">
          <nav className="flex flex-col space-y-4 p-6">
            <a href="/home" className="text-white hover:text-purple-300 font-semibold transition duration-300">Home</a>
            <a href="/technical" className="text-white hover:text-purple-300 font-semibold transition duration-300">Technical</a>
            <a href="/hr" className="text-white hover:text-purple-300 font-semibold transition duration-300">HR Interview</a>
            <a href="/resume" className="text-white hover:text-purple-300 font-semibold transition duration-300">Resume ATS</a>
            {localStorage.getItem('resumeresult') && (
              <a href="/resume/result" target="_blank" className="text-white hover:text-purple-300 font-semibold transition duration-300">Resume Report</a>
            )}
            <a href="/contactus" className="text-white hover:text-purple-300 font-semibold transition duration-300">Contact</a>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => { navigate(getDashboardPath()); setIsMenuOpen(false); }}
                  className="text-white hover:text-purple-300 font-semibold transition duration-300 text-left flex items-center gap-2"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <FaTachometerAlt style={{ fontSize: '13px' }} />
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 font-semibold transition duration-300 text-left flex items-center gap-2"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <FaSignOutAlt style={{ fontSize: '13px' }} />
                  Log Out ({displayName})
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 text-center"
              >
                Login
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
