// src/components/PublicRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Si ya está logueado, redirigir a Home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}