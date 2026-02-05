import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { loginUser, validateToken } from "@api/item";
import type { LoginCredentials } from "@routes/public/login-page/components/LoginForm";

type AuthContextType = {
  token: string | null;
  login: (creds: LoginCredentials) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return authContext;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const login = async ({ username, password }: LoginCredentials) => {
    const data = await loginUser(username, password);
    localStorage.setItem("token", data!.token);
    setToken(data!.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const checkToken = async () => {
    if (!token) {
      return;
    }
    try {
      await validateToken(token);
    } catch {
      logout();
    }
  };

  useEffect(() => {
    if (token) {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      checkToken();
    }
  }, []);

  /*
   * Revalidate the token on an interval and log out if it expires.
   */
  useEffect(() => {
    if (!token) {
      return;
    }

    const id = setInterval(() => {
      checkToken();
    }, 3_600_000);

    return () => clearInterval(id);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
