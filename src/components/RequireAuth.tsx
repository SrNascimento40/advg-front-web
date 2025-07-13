import { Navigate, useLocation } from 'react-router-dom';

import React from 'react';

export function RequireAuth({ children }: { children: React.ReactElement }) {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
