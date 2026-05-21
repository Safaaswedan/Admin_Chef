import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn, redirectTo }) => {
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
};

export default ProtectedRoute;