import React, { useContext, useEffect } from "react";
import { createContext, FC, useState } from "react";
import { AuthBundle, Auth, UserType, User } from "../types/Auth";
import { useStorage } from "./Storage";
import { getCurrentUser } from "../graphql/Auth";
import { useLazyQuery, useApolloClient } from "@apollo/react-hooks";
import { PersonalityTraitType } from "../types/Persona";

export const AUTH_KEY = "QuarActive--Auth";

const AuthContext = createContext<AuthBundle>({
  setAuth: () => null,
  clearAuth: () => null
});

export const AuthProvider: FC = ({ children }) => {
  const [getLocal, setLocal] = useStorage<Auth | undefined>(AUTH_KEY);
  const client = useApolloClient();
  const [auth, setAuth] = useState<Auth | undefined>(getLocal() ?? undefined);
  const [doGetUser, { data: userData }] = useLazyQuery<{
    getCurrentUser: User;
  }>(getCurrentUser, {
    fetchPolicy: "network-only"
  });

  const bundle: AuthBundle = {
    setAuth: (auth: Auth) => setAuth(auth),
    clearAuth: () => setAuth(undefined),
    auth
  };

  useEffect(() => {
    setLocal(auth);
    // eslint-disable-next-line
  }, [auth]);

  useEffect(() => {
    if (userData?.getCurrentUser && auth) {
      setAuth({
        ...auth,
        user: userData?.getCurrentUser
      });
    }
    // eslint-disable-next-line
  }, [userData])

  useEffect(() => {
    if (auth?.token && !auth?.emulated) {
      doGetUser();
    }
    client.resetStore();
    // eslint-disable-next-line
  }, [auth?.token])

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

export const emulateAuth = (
  type: UserType,
  personalityTraits: PersonalityTraitType[]
): Auth => ({
  token: "anonymous",
  emulated: true,
  user: {
    id: "anonymous",
    email: "anonymous@quaractive.com",
    type,
    personalityTraits,
    displayName: "Anonymous"
  }
});
