import { TranslatedString } from "./Translation";

export enum TaskStatus {
  toDo = "ToDo",
  inProgress = "InProgress",
  done = "Done"
}

export enum CheckpointStatus {
  toDo = "ToDo",
  inProgress = "InProgress",
  done = "Done"
}

export enum Difficulty {
  easy = "Easy",
  medium = "Medium",
  hard = "Hard"
}

export interface Task {
  id: string;
  title: TranslatedString;
  cover: string;
  description: TranslatedString; // In markdown
  difficulty: Difficulty;
  checkpoints: Checkpoint[];
  status?: TaskStatus;
}

export interface Checkpoint {
  id: string;
  order: number;
  title: TranslatedString;
  description: TranslatedString; // In markdown
  status: CheckpointStatus;
}
