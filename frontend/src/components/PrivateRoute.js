import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/authcontext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Get the current user from the auth context

  return currentUser ? children : <Navigate to="/" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
