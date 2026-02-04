import { createContext, useContext, type PropsWithChildren } from "react";
import { loginUser } from "@api/item";
import type { LoginCredentials } from "@routes/public/login-page/components/LoginForm";

type AuthContextType = {
  login: (creds: LoginCredentials) => Promise<void>;
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
  const login = async ({ username, password }: LoginCredentials) => {
    const data = await loginUser(username, password);
    localStorage.setItem("token", data!.token);
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
}
