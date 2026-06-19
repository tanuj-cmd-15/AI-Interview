import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function OAuth2RedirectHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('OAuth2RedirectHandler mounted');
    
    const token = searchParams.get('token');
    const role = searchParams.get('role');

    console.log('Token:', token ? 'Present' : 'Missing');
    console.log('Role:', role);

    if (token && role) {
      try {
        // Store token
        localStorage.setItem('token', token);
        console.log('Token stored in localStorage');
        
        // Set token in auth context
        if (setToken) {
          setToken(token);
          console.log('Token set in context');
        }

        // Set user in auth context
        const user = { role };
        if (setUser) {
          setUser(user);
          console.log('User set in context:', user);
        }

        // Redirect based on role
        console.log('Redirecting to dashboard...');
        setTimeout(() => {
          if (role === 'STUDENT') {
            navigate('/student/dashboard', { replace: true });
          } else if (role === 'HR') {
            navigate('/hr/dashboard', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        }, 500);
      } catch (err) {
        console.error('Error processing OAuth:', err);
        setError(err.message);
      }
    } else {
      // If no token, redirect to login with error
      console.error('No token or role found');
      setError('OAuth authentication failed - missing token or role');
      setTimeout(() => {
        navigate('/login?error=oauth_failed', { replace: true });
      }, 2000);
    }
  }, [searchParams, navigate, setUser, setToken]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
        <div className="text-center max-w-md p-8 card">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">Authentication Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/login')}
            className="btn-primary"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
      <div className="text-center">
        <div className="spinner mx-auto mb-4"></div>
        <p className="text-gray-300 text-lg">Completing Google Sign-In...</p>
        <p className="text-gray-500 text-sm mt-2">Please wait...</p>
      </div>
    </div>
  );
}
