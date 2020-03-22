import { Task, TaskStatus, Checkpoint } from "../types/Task";

export function sortByStatus(tasks: Task[]) {
  return tasks.sort((a, b) =>
    a.status === TaskStatus.done ? 1 : b.status === TaskStatus.done ? -1 : 0
  );
}

export function sortByOrder(checkpoints: Checkpoint[]) {
  return checkpoints.sort((a, b) =>
    a.order < b.order ? -1 : a.order > b.order ? 1 : 0
  );
}

export function resolveTaskImage(task: Task): string {
  return (task.cover ?? "").replace(".svg", ".png");
}
