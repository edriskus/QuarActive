import React, { useCallback } from "react";
import { Task } from "../../types/Task";
import { Container } from "@material-ui/core";
import TaskCard from "../../components/TaskCard/TaskCard";
import { useQuery } from "@apollo/react-hooks";
import { getTask } from "../../graphql/Task";
import { useParams, useHistory } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";

export default function SingleTask() {
  const params = useParams<{ taskId: string }>();
  const { push } = useHistory();
  const { data } = useQuery<{ task: Task }>(getTask, {
    variables: {
      taskId: params.taskId
    }
  });
  const featuredTask = data?.task;

  const handleClose = useCallback(() => {
    push("/");
  }, [push]);

  return (
    <Container maxWidth="md">
      {!!featuredTask ? (
        <TaskCard
          task={featuredTask}
          key={featuredTask.id}
          onOpen={() => null}
          onClose={handleClose}
          open={true}
        />
      ) : (
        <Skeleton variant="rect" width="100%" height={200} />
      )}
    </Container>
  );
}
