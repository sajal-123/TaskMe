import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = (): boolean => {
  // Replace this with your actual authentication logic
  return localStorage.getItem("authToken") !== null;
};

interface ProtectedRouteProps {
  children: React.ReactNode; // Expecting child components
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
