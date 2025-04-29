import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../config/apiConfig";

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
    const response = await fetch(API_ROUTES.LOGOUT, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
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
