import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  console.log("currentUser", currentUser);  
    console.log("loading", loading);
//   const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/" replace="true" />;
  }

  return children;
};

export default ProtectedRoute;