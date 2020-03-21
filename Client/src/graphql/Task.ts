import { gql } from "apollo-boost";

export const getTasks = gql`
  query getTasks {
    tasks {
      id
      title {
        lt
        en
      }
      description {
        lt
        en
      }
      amount
      cover
      difficulty
      status
      checkpoints {
        id
        title {
          lt
          en
        }
        description {
          lt
          en
        }
        status
      }
    }
  }
`;

export const changeCheckpointStatus = gql`
  mutation changeCheckpointStatus(
    $status: TaskStatus!
    $checkpointId: String!
  ) {
    changeCheckpointStatus(status: $status, checkpointId: $checkpointId) {
      id
      title {
        lt
        en
      }
      description {
        lt
        en
      }
      status
    }
  }
`;

export const changeTaskStatus = gql`
  mutation changeTaskStatus($status: TaskStatus!, $taskId: String!) {
    changeTaskStatus(status: $status, taskId: $taskId) {
      id
      title {
        lt
        en
      }
      description {
        lt
        en
      }
      amount
      cover
      difficulty
      status
      checkpoints {
        id
        title {
          lt
          en
        }
        description {
          lt
          en
        }
        status
      }
    }
  }
`;
