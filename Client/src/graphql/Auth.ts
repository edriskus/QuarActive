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
        type
      }
    }
  }
`;

export const register = gql`
  mutation register($email: String!, $password: String!, $type: UserType!) {
    register(
      data: {
        email: $email
        password: $password
        type: $type
        displayName: "TEST"
      }
    ) {
      token
      user {
        id
        email
        displayName
        balance
        type
      }
    }
  }
`;
