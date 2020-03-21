import ApolloClient from "apollo-boost";
import { AUTH_KEY } from "./Auth";
import { Auth } from "../types/Auth";

export const client = new ApolloClient({
  uri: "https://quaractive.herokuapp.com/",
  request: operation => {
    let token;
    try {
      const auth = JSON.parse(localStorage.getItem(AUTH_KEY) ?? "") as Auth;
      token = auth?.emulated ? undefined : auth?.token;
    } catch (e) {
      // Do nothing
    }
    const headers: any = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    operation.setContext({
      headers
    });
  }
});
