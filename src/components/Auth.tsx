import React from "react";
import { Navigate, useLocation } from "react-router-dom";

type TAuthContext = {
  user: string;
  login: (userName: string) => void;
  logout: (callback: () => void) => void;
};
export type TUseAuthReturn = {
  user: string;
  login: (userName: string) => void;
  logout: (callback: () => void) => void;
};
export const authContext = React.createContext<TAuthContext | null>(null);

export const useAuth = (): TUseAuthReturn => {
  const [user, setUser] = React.useState(
    () => localStorage.getItem("cellular-automaton.user") || ""
  );
  return {
    user,
    login: (userName: string) => {
      !!userName && localStorage.setItem("cellular-automaton.user", userName);
      !!userName && setUser(userName);
    },
    logout: (callback: () => void) => {
      localStorage.removeItem("cellular-automaton.user");
      setUser("");
      callback();
    },
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const AuthConsumer = () => {
  return React.useContext(authContext);
};

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const location = useLocation();
  console.log(`useAuth: ${user} Location: ${location}`);
  if (!user) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }
  return children;
};
