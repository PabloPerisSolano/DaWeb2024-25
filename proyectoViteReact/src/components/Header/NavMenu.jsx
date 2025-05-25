import { NavLink } from "react-router-dom";

export default function NavMenu({ links }) {
  return (
    <ul className="nav">
      {links.map((link) => (
        <li key={link.path} className="nav-item">
          <NavLink to={link.path} className="nav-link">
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
