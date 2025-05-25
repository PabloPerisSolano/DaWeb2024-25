import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "@/constants/apiEndpoints";
import { ROUTES } from "@/constants/routes";
import { AuthContext } from "@/context/AuthContext";
import { useAuthFetch } from "@/hooks/useAuthFetch";

export const AuthProvider = ({ children }) => {
  const fetchWithAuth = useAuthFetch();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const userRoles = {
    isAdmin:
      user?.roles.includes("GESTOR_EVENTOS") &&
      user?.roles.includes("PROPIETARIO_ESPACIOS"),
    isUser: user?.roles.includes("USUARIO"),
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    if (
      userData.roles.includes("GESTOR_EVENTOS") &&
      userData.roles.includes("PROPIETARIO_ESPACIOS")
    ) {
      navigate(ROUTES.ESPACIOS);
    } else {
      navigate(ROUTES.LISTADO_EVENTOS);
    }
  };

  const handleLogout = async () => {
    await fetchWithAuth(API_ROUTES.LOGOUT, { method: "POST" });
    localStorage.removeItem("user");
    navigate(ROUTES.LOGIN);
  };

  return (
    <AuthContext.Provider
      value={{ user, userRoles, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
