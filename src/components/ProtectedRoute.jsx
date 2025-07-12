// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Jika user belum login, arahkan ke halaman login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Jika user sudah login, izinkan akses
  return children;
};

export default ProtectedRoute;
