import { gql } from "apollo-boost";

export const getTasks = gql`
  query getTasks($traits: [PersonalityTraitEnum!], $types: [UserType!]) {
    tasks(traits: $traits, types: $types) {
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
        order
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

export const changeTask = gql`
  mutation changeTask(
    $taskId: String!
    $title: TranslationInput!
    $description: TranslationInput!
    $cover: String!
    $healthTip: TranslationInput!
  ) {
    changeCover(amount: $cover, taskId: $taskId) {
      id
    }
    changeTitle(title: $title, taskId: $taskId) {
      id
    }
    changeDescription(title: $description, taskId: $taskId) {
      id
    }
    changeHealthTip(title: $healthTip, taskId: $taskId) {
      id
    }
  }
`;

export const getTask = gql`
  query getTask($taskId: String!) {
    task(taskId: $taskId) {
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
        order
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
      order
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
        order
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
