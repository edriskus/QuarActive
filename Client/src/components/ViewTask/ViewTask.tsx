import React from "react";
import { Task } from "../../types/Task";
import { Typography, Hidden, Box } from "@material-ui/core";
import TaskActions from "../TaskActions/TaskActions";
import StatusBlob from "../StatusBlob/StatusBlob";
import TaskSteps from "../TaskSteps/TaskSteps";

interface Props {
  task: Task;
  onClose: () => void;
}

export default function ViewTask({ task, onClose }: Props) {
  return (
    <>
      <TaskActions onClose={onClose} />
      <Hidden smDown={true}>
        <Box display="flex" justifyContent="center" width="100%">
          <img src={task.cover} height={250} alt={task.title} />
        </Box>
      </Hidden>
      <Typography variant="h3" color="primary" gutterBottom={true}>
        {task.title}
      </Typography>
      <Typography variant="body1">{task.description}</Typography>
      <Box position="absolute" top={0} right={0}>
        <StatusBlob
          size={"120px"}
          placementX="right"
          placementY="top"
          margin={-4}
        >
          <Typography variant="button" color="inherit">
            {task.difficulty}
          </Typography>
        </StatusBlob>
      </Box>
      <TaskSteps task={task} />
    </>
  );
}
