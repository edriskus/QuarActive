import { gql } from "apollo-boost";

export const login = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        id
        email
        displayName
        balance
      }
    }
  }
`;
