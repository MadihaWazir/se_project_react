import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Children, isLoggedIn }) => {
  return isLoggedIn ? Children : Navigate("/", { replace: true });
};

export default ProtectedRoute;
