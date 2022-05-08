import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Link from "next/link";

import SignIn from "../../pages/signin/SignIn";

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
  const [user, setUser] = React.useState(
    ""
    // () => localStorage.getItem("cellular-automaton.user") || ""
  );
  useEffect(() => {
    setUser(localStorage.getItem("cellular-automaton.user") || "");
    console.log("Auth useEffect");
  });
  return {
    user,
    login: (userName: string) => {
      console.log("Auth Login");
      !!userName && localStorage.setItem("cellular-automaton.user", userName);
      !!userName && setUser(userName);
    },
    logout: (callback: () => void) => {
      console.log("Auth Logout");
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
  //const location = useLocation();
  if (!user) {
    // return <Navigate to="/login" replace state={{ path: location.pathname }} />;
    return (
      <Link href="/" replace>
        <SignIn />
      </Link>
    );
  }
  return children;
};
