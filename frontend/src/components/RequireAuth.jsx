import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Si no hay token, manda al login
    return <Navigate to="/admin/login" replace />;
  }

  // Si hay token, muestra el contenido protegido
  return children;
};

export default RequireAuth;
