import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If user is authenticated but not authorized, redirect to their potential dashboard or unauthorized page
    // For now, redirecting to home or login might be safer, or a dedicated "Unauthorized" page.
    // Let's redirect to home for now.
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
