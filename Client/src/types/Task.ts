export enum TaskStatus {
  inProgress = "inProgress",
  done = "done"
}

export enum CheckpointStatus {
  toDo = "toDo",
  inProgress = "inProgress",
  done = "done"
}

export enum Difficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard"
}

export interface Task {
  id: string;
  title: string;
  cover: string;
  description: string; // In markdown
  difficulty: Difficulty;
  checkpoints: Checkpoint[];
  status: TaskStatus;
}

export interface Checkpoint {
  id: string;
  title: string;
  description: string; // In markdown
  status: CheckpointStatus;
}
