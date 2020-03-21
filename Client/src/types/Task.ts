import { TranslatedString } from "./Translation";

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
  title: TranslatedString;
  cover: string;
  description: TranslatedString; // In markdown
  difficulty: Difficulty;
  checkpoints: Checkpoint[];
  status: TaskStatus;
}

export interface Checkpoint {
  id: string;
  title: TranslatedString;
  description: TranslatedString; // In markdown
  status: CheckpointStatus;
}
