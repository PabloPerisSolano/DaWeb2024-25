import { NavLink } from "react-router-dom";

function NavAdmin() {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/eventos" activeClassName="active">
          Eventos
        </NavLink>
      </li>
      <li>
        <NavLink to="/espacios" activeClassName="active">
          Espacios
        </NavLink>
      </li>
      <li>
        <NavLink to="/gestion-eventos" activeClassName="active">
          Gestión Eventos
        </NavLink>
      </li>
      <li>
        <NavLink to="/reservas" activeClassName="active">
          Todas las Reservas
        </NavLink>
      </li>
    </ul>
  );
}

export default NavAdmin;
