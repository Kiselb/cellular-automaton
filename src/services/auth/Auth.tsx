import React, { useEffect } from "react";

import SignIn from "../../pages/signin/SignIn.page";

type AuthContext = {
  user: string;
  login: (userName: string) => void;
  logout: (callback: () => void) => void;
};
export type UseAuthReturn = {
  user: string;
  login: (userName: string) => void;
  logout: (callback: () => void) => void;
};
export const authContext = React.createContext<AuthContext | null>(null);

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = React.useState("");
  useEffect(() => {
    setUser(localStorage.getItem("cellular-automaton.user") || "");
  });
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
  if (!user) {
    return <SignIn />;
  }
  return children;
};
