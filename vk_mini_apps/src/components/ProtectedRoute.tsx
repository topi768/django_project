import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth";

interface ProtectedRouteProps {
    isAuth: boolean;
    component: JSX.Element;
  }
  
  const ProtectedRoute = ({ isAuth, component }: ProtectedRouteProps) => {
    return isAuth ? component : <Navigate to="/register" replace />;
  };
  
  export default ProtectedRoute;