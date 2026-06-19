import React, { useState, useContext } from 'react';
import { FaUser, FaLock, FaEnvelope, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { context } from '../context/Context';

const Login = () => {
  const [action, setAction] = useState('');
  const [selectedRole, setSelectedRole] = useState('student'); // 'student' or 'hr'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(context);
  const navigate = useNavigate();

  const registerLink = () => {
    setAction(' active');
  };

  const loginLink = () => {
    setAction('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Shared authentication success handler
  const handleAuthSuccess = (userData, token) => {
    // Store token if provided
    if (token) {
      localStorage.setItem('access_token', token);
    }
    
    // Update context with user data
    login(userData.name, userData.role);
    
    // Redirect based on role
    if (userData.role === 'student') {
      navigate('/dashboard');
    } else {
      navigate('/hr-dashboard');
    }
  };

  // Google OAuth success handler
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          credential: credentialResponse.credential,
          role: selectedRole
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        handleAuthSuccess(data.user, data.access_token);
      } else {
        alert(data.error || 'Google login failed. Please try again.');
      }
    } catch (error) {
      alert('Google login failed. Please check your connection.');
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth error handler
  const handleGoogleError = () => {
    alert('Google login was cancelled or failed.');
  };

  const handleSubmit = async (e, isRegister = false) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const requestData = isRegister ? {
        email: formData.email,
        password: formData.password,
        name: formData.username,
        role: selectedRole
      } : {
        email: formData.email,
        password: formData.password
      };
      
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        handleAuthSuccess(data.user, data.access_token);
      } else {
        alert(data.error || 'Authentication failed. Please try again.');
      }
    } catch (error) {
      alert('Authentication failed. Please check your connection.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const roleButtonStyle = (role) => ({
    flex: 1,
    padding: '10px 20px',
    background: selectedRole === role ? '#2563EB' : 'white',
    color: selectedRole === role ? 'white' : '#333',
    border: '2px solid #2563EB',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
  });

  return (
    <div className={`wrapper${action}`} style={{
      marginTop: '70px',
      marginLeft: '400px',
      position: 'relative',
      width: '420px',
      height: action ? '580px' : '530px',
      background: 'transparent',
      border: '2px solid rgba(255,255,255, .1)',
      backdropFilter: 'blur(30px)',
      borderRadius: '30px',
      boxShadow: '0 0 10px rgba(0,0,0,.5)',
      color: '#fff',
      display: 'flex',
      overflow: 'hidden',
      alignItems: 'center',
      transition: 'height .1s ease',
    }}>
      <div className="form-box login" style={{
        width: '100%',
        padding: '25px 40px',
        translate: action ? '-400px' : '0px',
        transition: action ? 'none' : 'translate .18s ease'
      }}>
        <form className='lform' onSubmit={(e) => handleSubmit(e, false)}>
          <h1 style={{
            fontSize: '36px',
            textAlign: 'center',
            color: 'black',
            marginBottom: '10px'
          }}>Login</h1>
          
          {/* Role Selector */}
          <div style={{
            marginBottom: '20px',
          }}>
            <p style={{
              fontSize: '14px',
              color: '#333',
              marginBottom: '8px',
              fontWeight: '600'
            }}>I am a:</p>
            <div style={{
              display: 'flex',
              gap: '10px',
            }}>
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                style={roleButtonStyle('student')}
              >
                <FaGraduationCap />
                Student
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('hr')}
                style={roleButtonStyle('hr')}
              >
                <FaBriefcase />
                HR / Interviewer
              </button>
            </div>
          </div>

          <div className='input-box' style={{
            position: 'relative',
            width: '100%',
            height: '50px',
            borderRadius: '40px',
            margin: '20px 0',
            background: 'white',
            border: '2px solid black'
          }}>
            <input 
              type='email' 
              name='email'
              placeholder='Email' 
              value={formData.email}
              onChange={handleChange}
              required 
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: 'black',
                padding: '20px 45px 20px 20px',
                borderRadius: '40px'
              }} 
            />
            <FaEnvelope className='icon' style={{
              position: 'absolute',
              right: '20px',
              top: '0',
              translate: '0 15px',
              fontSize: '16px',
              color: 'black'
            }} />
          </div>
          <div className='input-box' style={{
            position: 'relative',
            width: '100%',
            height: '50px',
            borderRadius: '40px',
            margin: '20px 0',
            background: 'white',
            border: '2px solid black'
          }}>
            <input 
              type='password' 
              name='password'
              placeholder='Password' 
              value={formData.password}
              onChange={handleChange}
              required 
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: 'black',
                padding: '20px 45px 20px 20px',
                borderRadius: '40px'
              }} 
            />
            <FaLock className='icon' style={{
              position: 'absolute',
              right: '20px',
              top: '0',
              translate: '0 15px',
              fontSize: '16px',
              color: 'black'
            }} />
          </div>
          <div className='forgot' style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '14.5px'
          }}>
            <a href='#' style={{ color: 'black' }}>forgot password?</a>
          </div>
          <button type='submit' disabled={isLoading} style={{
            marginTop: '20px',
            width: '100%',
            height: '45px',
            background: selectedRole === 'student' ? '#2563EB' : '#C026D3',
            border: 'none',
            outline: 'none',
            borderRadius: '40px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            color: '#fff',
            fontWeight: '700',
            opacity: isLoading ? 0.7 : 1,
          }}>{isLoading ? 'Logging in...' : 'Login'}</button>
          
          {/* Google OAuth Button */}
          <div style={{ margin: '20px 0' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '20px 0',
              color: '#666'
            }}>
              <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
              <span style={{ margin: '0 15px', fontSize: '14px' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
            </div>
            
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false}
              size="large"
              theme="outline"
              text="signin_with"
              width={340}
            />
          </div>
          <div className='register-link' style={{
            fontSize: '14.5px',
            textAlign: 'center',
            margin: '20px 0 15px',
            color: 'black'
          }}>
            <p>Don't have an account? <a href='#' onClick={registerLink} style={{ color: 'black' }}>Register</a></p>
          </div>
        </form>
      </div>

      <div className='form-box register' style={{
        width: '100%',
        padding: '25px 40px',
        position: 'absolute',
        translate: action ? '0px' : '400px',
        transition: action ? 'translate .18s ease' : 'none'
      }}>
        <form className='lform' onSubmit={(e) => handleSubmit(e, true)}>
          <h1 style={{
            fontSize: '36px',
            textAlign: 'center',
            color: 'black',
            marginBottom: '10px'
          }}>Registration</h1>
          
          {/* Role Selector */}
          <div style={{
            marginBottom: '20px',
          }}>
            <p style={{
              fontSize: '14px',
              color: '#333',
              marginBottom: '8px',
              fontWeight: '600'
            }}>I am a:</p>
            <div style={{
              display: 'flex',
              gap: '10px',
            }}>
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                style={roleButtonStyle('student')}
              >
                <FaGraduationCap />
                Student
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('hr')}
                style={roleButtonStyle('hr')}
              >
                <FaBriefcase />
                HR / Interviewer
              </button>
            </div>
          </div>

          <div className='input-box' style={{
            position: 'relative',
            width: '100%',
            height: '50px',
            borderRadius: '40px',
            margin: '20px 0',
            background: 'white',
            border: '2px solid black'
          }}>
            <input 
              type='text' 
              name='username'
              placeholder='Username' 
              value={formData.username}
              onChange={handleChange}
              required 
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: 'black',
                padding: '20px 45px 20px 20px',
                borderRadius: '40px'
              }} 
            />
            <FaUser className='icon' style={{
              position: 'absolute',
              right: '20px',
              top: '0',
              translate: '0 15px',
              fontSize: '16px',
              color: 'black'
            }} />
          </div>
          <div className='input-box' style={{
            position: 'relative',
            width: '100%',
            height: '50px',
            borderRadius: '40px',
            margin: '20px 0',
            background: 'white',
            border: '2px solid black'
          }}>
            <input 
              type='email' 
              name='email'
              placeholder='Email' 
              value={formData.email}
              onChange={handleChange}
              required 
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: 'black',
                padding: '20px 45px 20px 20px',
                borderRadius: '40px'
              }} 
            />
            <FaEnvelope className='icon' style={{
              position: 'absolute',
              right: '20px',
              top: '0',
              translate: '0 15px',
              fontSize: '16px',
              color: 'black'
            }} />
          </div>
          <div className='input-box' style={{
            position: 'relative',
            width: '100%',
            height: '50px',
            borderRadius: '40px',
            margin: '20px 0',
            background: 'white',
            border: '2px solid black'
          }}>
            <input 
              type='password' 
              name='password'
              placeholder='Password' 
              value={formData.password}
              onChange={handleChange}
              required 
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: 'black',
                padding: '20px 45px 20px 20px',
                borderRadius: '40px'
              }} 
            />
            <FaLock className='icon' style={{
              position: 'absolute',
              right: '20px',
              top: '0',
              translate: '0 15px',
              fontSize: '16px',
              color: 'black'
            }} />
          </div>
          <button type='submit' disabled={isLoading} style={{
            marginTop: '20px',
            width: '100%',
            height: '45px',
            background: selectedRole === 'student' ? '#2563EB' : '#C026D3',
            border: 'none',
            outline: 'none',
            borderRadius: '40px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            color: '#fff',
            fontWeight: '700',
            opacity: isLoading ? 0.7 : 1,
          }}>{isLoading ? 'Registering...' : 'Register'}</button>
          
          {/* Google OAuth Button */}
          <div style={{ margin: '20px 0' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '20px 0',
              color: '#666'
            }}>
              <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
              <span style={{ margin: '0 15px', fontSize: '14px' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
            </div>
            
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false}
              size="large"
              theme="outline" 
              text="signup_with"
              width={340}
            />
          </div>
          <div className='register-link' style={{
            fontSize: '14.5px',
            textAlign: 'center',
            margin: '20px 0 15px',
            color: 'black'
          }}>
            <p>Already have an account? <a href='#' onClick={loginLink} style={{ color: 'black' }}>Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
