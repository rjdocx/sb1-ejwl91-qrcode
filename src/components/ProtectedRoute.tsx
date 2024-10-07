import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  // TODO: Implement actual authentication and role checking logic
  const isAuthenticated = true; // Placeholder
  const userRole = role; // Placeholder

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;