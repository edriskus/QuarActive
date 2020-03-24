import { useCallback } from "react";
import { Task, CheckpointStatus, Checkpoint, TaskStatus } from "../types/Task";
import { useMutation } from "@apollo/react-hooks";
import {
  changeCheckpointStatus,
  getTasks,
  changeTaskStatus
} from "../graphql/Task";
import { getCurrentUser } from "../graphql/Auth";

/**
 * Sort By Status
 */
export function sortByStatus(tasks: Task[]) {
  return tasks.sort((a, b) =>
    a.status === TaskStatus.done ? 1 : b.status === TaskStatus.done ? -1 : 0
  );
}

/**
 * Sort By Order
 */
export function sortByOrder(checkpoints: Checkpoint[]) {
  return checkpoints.sort((a, b) =>
    a.order < b.order ? -1 : a.order > b.order ? 1 : 0
  );
}

/**
 * Resolve Task Image
 */
export function resolveTaskImage(task: Task): string {
  return (task.cover ?? "").replace(".svg", ".png");
}

/**
 * Use Complete Checkpoint
 */
export function useCompleteCheckpoint(
  task: Task,
  checkpoints: Checkpoint[],
  step: Checkpoint | undefined,
  emulated: boolean,
  lastCompleteStep: number,
  activeStep: number,
  setActiveStep: (step: number) => void
) {
  const [doChangeCheckpoint, { loading }] = useMutation(
    changeCheckpointStatus,
    {
      update: (cache, data: any) => {
        const cached = cache.readQuery<{ tasks: Task[] }>({ query: getTasks });
        const found = (cached?.tasks ?? []).find(({ id }) => id === task.id);
        const checkpoint = (found?.checkpoints ?? []).find(
          ({ id }) => id === data?.changeCheckpointStatus?.id
        );
        if (checkpoint) {
          checkpoint.status = CheckpointStatus.done;
        }
        cache.writeQuery({
          query: getTasks,
          data: cached
        });
      }
    }
  );

  const [doChangeTask] = useMutation(changeTaskStatus, {
    update: cache => {
      const cached = cache.readQuery<{ tasks: Task[] }>({ query: getTasks });
      const found = (cached?.tasks ?? []).find(({ id }) => id === task.id);
      if (found) {
        found.status = TaskStatus.done;
      }
      cache.writeQuery({
        query: getTasks,
        data: cached
      });
    },
    refetchQueries: [{ query: getCurrentUser }]
  });

  const handleComplete = useCallback(() => {
    if (!emulated && !task.offline) {
      doChangeTask({
        variables: {
          status: TaskStatus.done,
          taskId: task.id
        }
      });
    } else {
      setActiveStep(activeStep + 1);
    }
  }, [
    activeStep,
    doChangeTask,
    emulated,
    setActiveStep,
    task.id,
    task.offline
  ]);

  const handleNext = useCallback(() => {
    if (activeStep <= lastCompleteStep) {
      setActiveStep(activeStep + 1);
    } else {
      if (!emulated && !task.offline) {
        doChangeCheckpoint({
          variables: {
            status: CheckpointStatus.done,
            checkpointId: step?.id
          }
        });
      } else {
        setActiveStep(activeStep + 1);
      }
      if (activeStep === checkpoints.length - 1 && !emulated && !task.offline) {
        doChangeTask({
          variables: {
            status: TaskStatus.done,
            taskId: task.id
          }
        });
      }
    }
  }, [
    activeStep,
    lastCompleteStep,
    setActiveStep,
    emulated,
    checkpoints.length,
    doChangeCheckpoint,
    step,
    doChangeTask,
    task.id,
    task.offline
  ]);
  return {
    loading,
    emulated,
    handleComplete,
    handleNext
  };
}
