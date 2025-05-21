import { useContext, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FaSignOutAlt, FaBars, FaUser } from "react-icons/fa";
import NavMenu from "./NavMenu";
import "./Header.css";

function Header() {
  const { user, userRoles, handleLogout } = useAuth();

  if (!user) return null;

  const adminLinks = [
    { name: "Gestionar Espacios", path: "/espacios" },
    { name: "Gestionar Eventos", path: "/eventos" },
  ];

  const userLinks = [
    { name: "Ver Eventos", path: "/listado-eventos" },
    { name: "Mis Reservas", path: "/reservas" },
  ];

  const headerTitle = userRoles.isAdmin
    ? `Gestor - ${user.idUsuario}`
    : `Usuario - ${user.idUsuario}`;

  return (
    <header className="app-header">
      <section className="dropdown">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FaBars />
        </button>
        <ul className="dropdown-menu">
          <NavMenu links={userRoles.isAdmin ? adminLinks : userLinks} />
        </ul>
      </section>

      <section className="fw-bold d-flex align-items-center gap-2">
        <FaUser className="user-icon" />
        <span>{headerTitle}</span>
      </section>

      <section className="main-nav">
        <NavMenu links={userRoles.isAdmin ? adminLinks : userLinks} />
      </section>

      <button
        className="btn btn-danger d-flex align-items-center justify-content-center gap-2"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        <span className="cerrar-sesion">Cerrar sesión</span>
      </button>
    </header>
  );
}

export default Header;
