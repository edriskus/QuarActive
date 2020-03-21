import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Task } from "../../types/Task";

interface Props {
  task: Task;
}

export default function TaskSteps({ task }: Props) {
  return (
    <Box marginTop={2}>
      <Typography align="justify">{task.description}</Typography>
    </Box>
  );
}
