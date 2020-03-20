import { gql } from "apollo-boost";

export const getTasks = gql`
  query getTasks {
    tasks {
      title
    }
  }
`;
