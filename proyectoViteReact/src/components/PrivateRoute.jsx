import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";

export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to={ROUTES.LOGIN} />;
  return children;
};
