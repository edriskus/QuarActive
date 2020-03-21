import ApolloClient from "apollo-boost";
import { AUTH_KEY } from "./Auth";
import { Auth } from "../types/Auth";

export const client = new ApolloClient({
  uri: "https://quaractive.herokuapp.com/",
  request: operation => {
    let token;
    try {
      token = (JSON.parse(localStorage.getItem(AUTH_KEY) ?? "") as Auth)?.token;
    } catch (e) {
      // Do nothing
    }
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : undefined
      }
    });
  }
});
