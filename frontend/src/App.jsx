import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import Hr from './components/Hr';
import Resume from './components/Resume';
import ContactUs from './components/ContactUs';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResumeResult from './components/ResumeResult';
import Technical from './components/Technical';
import StudentDashboard from './components/StudentDashboard';
import HrDashboard from './components/HrDashboard';
import ProtectedRoute from './components/ProtectedRoute';

import "regenerator-runtime/runtime";
import CandidateFeedbackUI from './components/Feedback';

const App = () => {
  // Google OAuth Client ID - should be moved to environment variable
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id-here.apps.googleusercontent.com";
  
  const router = createBrowserRouter([
    // ── Public routes — accessible regardless of auth state ──────────────
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/aboutus',
      element: <AboutUs />,
    },
    {
      path: '/contactus',
      element: <ContactUs />,
    },

    // ── Student-only protected routes ─────────────────────────────────────
    // If not logged in → redirects to /login
    // If logged in as 'hr' → redirects to /hr-dashboard
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute allowedRoles={['student']}>
          <StudentDashboard />
        </ProtectedRoute>
      ),
    },

    // ── HR-only protected routes ──────────────────────────────────────────
    // If not logged in → redirects to /login
    // If logged in as 'student' → redirects to /dashboard
    {
      path: '/hr-dashboard',
      element: (
        <ProtectedRoute allowedRoles={['hr']}>
          <HrDashboard />
        </ProtectedRoute>
      ),
    },

    // ── Interview/tool routes — any logged-in user ────────────────────────
    // If not logged in → redirects to /login
    {
      path: '/hr',
      element: (
        <ProtectedRoute>
          <Hr />
        </ProtectedRoute>
      ),
    },
    {
      path: '/technical',
      element: (
        <ProtectedRoute>
          <Technical />
        </ProtectedRoute>
      ),
    },
    {
      path: '/resume',
      element: (
        <ProtectedRoute>
          <Resume />
        </ProtectedRoute>
      ),
    },
    {
      path: '/resume/result',
      element: (
        <ProtectedRoute>
          <ResumeResult />
        </ProtectedRoute>
      ),
    },

    // ── Utility / dev routes ──────────────────────────────────────────────
    {
      path: '/test',
      element: <CandidateFeedbackUI />,
    },
  ]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
};

export default App;
