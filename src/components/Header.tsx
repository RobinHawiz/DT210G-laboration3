import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <ul className="mb-4 flex justify-center gap-4 bg-white px-4 py-2 shadow-sm">
          <li>
            <NavLink
              className="hover:text-secondary text-secondary/70 [&.active]:text-secondary border-b-2 border-transparent text-lg transition-colors duration-200 [&.active]:border-blue-500"
              to="/"
            >
              Item Stock
            </NavLink>
          </li>
          <li className="text-lg">
            <NavLink
              className="hover:text-secondary text-secondary/70 [&.active]:text-secondary border-b-2 border-transparent text-lg transition-colors duration-200 [&.active]:border-blue-500"
              to="/login"
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
