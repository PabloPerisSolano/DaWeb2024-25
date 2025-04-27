import { useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import NavUser from "./NavUser";
import NavAdmin from "./NavAdmin";
import { FaSignOutAlt } from "react-icons/fa";
import { Button } from "../Button/Button";
import "./Header.css";

function Header() {
  const { user, handleLogout } = useAuth();

  if (!user) return null;

  const userRoles = {
    isAdmin:
      user?.roles.includes("GESTOR_EVENTOS") &&
      user?.roles.includes("PROPIETARIO_ESPACIOS"),
    isUser: user?.roles.includes("USUARIO"),
  };

  const headerTitle = userRoles.isAdmin
    ? `Gestor - ${user.idUsuario}`
    : `Usuario - ${user.idUsuario}`;

  return (
    <header className="app-header">
      <div className="logo">
        <h1>{headerTitle}</h1>
      </div>

      <nav className="main-nav">
        {userRoles.isAdmin ? (
          <NavAdmin />
        ) : userRoles.isUser ? (
          <NavUser />
        ) : (
          <span>No tienes permisos para acceder</span>
        )}
      </nav>

      {/* <Button
        icon={<FaSignOutAlt />}
        variant="danger"
        onClick={handleLogout}
        aria-label="Cerrar sesión"
        className="logout-btn"
      >
        Cerrar sesión
      </Button> */}
      <button
        className="btn btn-danger d-flex align-items-center gap-2"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        Cerrar sesión
      </button>
    </header>
  );
}

export default Header;
