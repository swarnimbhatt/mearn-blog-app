// src/components/ProtectedRoute.js
import { useContext } from 'react';
import { UserContext } from './UserContext';

import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const { userInfo } = useContext(UserContext);
  return userInfo ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;

