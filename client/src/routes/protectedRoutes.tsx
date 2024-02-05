import { useAuth } from "context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
