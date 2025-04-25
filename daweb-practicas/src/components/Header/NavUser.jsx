import { NavLink } from "react-router-dom";

function NavUser() {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/eventos" activeClassName="active">
          Eventos
        </NavLink>
      </li>
      <li>
        <NavLink to="/mis-reservas" activeClassName="active">
          Mis Reservas
        </NavLink>
      </li>
    </ul>
  );
}

export default NavUser;
