import { Task, TaskStatus } from "../types/Task";

export function sortByStatus(tasks: Task[]) {
  return tasks.sort((a, b) =>
    a.status === TaskStatus.done ? 1 : b.status === TaskStatus.done ? -1 : 0
  );
}

export function resolveTaskImage(task: Task): string {
  return (task.cover ?? "").replace(".svg", ".png");
}
