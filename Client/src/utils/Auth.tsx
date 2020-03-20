import React, { useContext, useEffect } from "react";
import { createContext, FC, useState } from "react";
import { AuthBundle, Auth } from "../types/Auth";
import { useStorage } from "./Storage";

const AUTH_KEY = "QuarActive--Auth";

const AuthContext = createContext<AuthBundle>({
  setAuth: () => null,
  clearAuth: () => null
});

export const AuthProvider: FC = ({ children }) => {
  const [getLocal, setLocal] = useStorage<Auth | undefined>(AUTH_KEY);
  const [auth, setAuth] = useState<Auth | undefined>(getLocal() ?? undefined);
  const bundle: AuthBundle = {
    setAuth: (auth: Auth) => setAuth(auth),
    clearAuth: () => setAuth(undefined),
    auth
  };

  useEffect(() => {
    setLocal(auth);
    // eslint-disable-next-line
  }, [auth]);

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
