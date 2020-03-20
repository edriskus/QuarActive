import React, { useContext } from "react";
import { createContext, FC, useState } from "react";
import { AuthBundle, Auth } from "../types/Auth";

const AuthContext = createContext<AuthBundle>({
  setAuth: () => null,
  clearAuth: () => null
});

export const AuthProvider: FC = ({ children }) => {
  const [auth, setAuth] = useState<Auth | undefined>();
  const bundle: AuthBundle = {
    setAuth: (auth: Auth) => setAuth(auth),
    clearAuth: () => setAuth(undefined),
    auth
  };
  return <AuthContext.Provider value={bundle}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useToken = () => {
  const { auth } = useAuth();
  return auth?.token;
};

export const useBalance = () => {
  const { auth } = useAuth();
  return auth?.user?.balance;
};
