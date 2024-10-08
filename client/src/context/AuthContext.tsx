import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  loginContext: (token: string) => void;
  logoutContext: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const initialData = window.localStorage.getItem("token") || null;
  const [token, setToken] = useState(initialData);

  const navigate = useNavigate();

  const loginContext = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    navigate("/products");
  };

  const logoutContext = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const values = {
    token,
    setToken,
    loginContext,
    logoutContext,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
