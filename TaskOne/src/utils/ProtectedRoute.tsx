import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = (): boolean => {
  return localStorage.getItem("authToken") === null;
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
