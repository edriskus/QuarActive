import React from "react";
import { Dialog, Box } from "@material-ui/core";
import { Task } from "../../types/Task";
import ViewTask from "../ViewTask/ViewTask";

interface Props {
  task: Task;
  open: boolean;
  onClose: () => void;
}

export default function OverDialog({ task, open, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box padding={2} paddingTop={0} position="relative" overflow="hidden">
        <ViewTask task={task} onClose={onClose} />
      </Box>
    </Dialog>
  );
}
