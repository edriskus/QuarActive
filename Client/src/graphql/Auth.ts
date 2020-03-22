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
        personalityTraits
      }
    }
  }
`;

export const register = gql`
  mutation register(
    $email: String!
    $password: String!
    $type: UserType!
    $personalityTraits: [PersonalityTraitEnum!]!
  ) {
    register(
      data: {
        email: $email
        password: $password
        type: $type
        displayName: "TEST"
        personalityTraits: $personalityTraits
      }
    ) {
      token
      user {
        id
        email
        displayName
        balance
        type
        personalityTraits
      }
    }
  }
`;

export const getCurrentUser = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      email
      displayName
      balance
      type
      personalityTraits
    }
  }
`;
