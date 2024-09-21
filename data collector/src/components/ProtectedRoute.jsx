import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for JWT in localStorage

  if (!token) {
    return <Navigate to="/login" />; // If no token, redirect to login
  }

  return children; // If token exists, render the child component
};

export default ProtectedRoute;
