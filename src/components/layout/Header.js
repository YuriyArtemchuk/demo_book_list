import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <nav className="header-container">
        <ul>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/add-book">Add Book</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
