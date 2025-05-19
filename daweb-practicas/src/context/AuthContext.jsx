import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES, fetchWithAuth } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
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
      navigate("/gestor");
    } else {
      navigate("/listado-eventos");
    }
  };

  const handleLogout = async () => {
    await fetchWithAuth(API_ROUTES.LOGOUT, { method: "POST" });
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, userRoles, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
