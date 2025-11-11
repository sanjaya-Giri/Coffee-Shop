import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if admin token exists (you can also use context or redux later)
  const token = localStorage.getItem("adminToken");

  // If not logged in, redirect to login page
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // If logged in, allow access
  return children;
};

export default ProtectedRoute;
