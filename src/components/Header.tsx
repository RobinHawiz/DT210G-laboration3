import { useAuth } from "@src/contexts/AuthProvider";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const { token, logout } = useAuth();

  return (
    <header>
      <nav>
        <ul className="mb-4 flex justify-center gap-4 bg-white px-4 py-2 shadow-sm">
          <li>
            <NavLink
              className={({ isActive }) =>
                `hover:text-secondary text-secondary/70 border-b-2 border-transparent text-lg transition-colors duration-200 ${isActive ? "text-secondary! border-blue-500!" : ""}`
              }
              to="/items"
            >
              Item Stock
            </NavLink>
          </li>
          <li className="text-lg">
            {token === null ? (
              <NavLink
                className={({ isActive }) =>
                  `hover:text-secondary text-secondary/70 border-b-2 border-transparent text-lg transition-colors duration-200 ${isActive ? "text-secondary! border-blue-500!" : ""}`
                }
                to="/login"
              >
                Logga in
              </NavLink>
            ) : (
              <button
                className="hover:text-secondary text-secondary/70 [&.active]:text-secondary cursor-pointer border-b-2 border-transparent text-lg transition-colors duration-200 [&.active]:border-blue-500"
                onClick={() => {
                  toast.info("You have successfully logged out");
                  logout();
                }}
              >
                Logga ut
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
