import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { user } = useAuth();

  // If there's no user, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If there is a user, render the child component
  return <Outlet />;
};

export default ProtectedRoute;