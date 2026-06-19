import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { context } from '../context/Context';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isLoggedIn, userRole } = useContext(context);

  // Not logged in - redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Role-based access: if allowedRoles specified and user's role not in it
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to correct dashboard for their role
    if (userRole === 'student') {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/hr-dashboard" replace />;
    }
  }

  // Authorized - render the protected component
  return children;
};

export default ProtectedRoute;
