import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { isConnected, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!isConnected) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};
