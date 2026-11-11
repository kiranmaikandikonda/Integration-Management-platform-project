import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader message="Checking admin access..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user.role === "admin"
    ? <Outlet />
    : <Navigate to="/dashboard" replace />;
}

export default AdminRoute;
