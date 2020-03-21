import React from "react";
import { Slide, Card, Box } from "@material-ui/core";
import FlatInfo from "../FlatInfo/FlatInfo";
import { Task } from "../../types/Task";
import { useStyles } from "./OverCard.styles";
import TaskActions from "../TaskActions/TaskActions";
import TaskSteps from "../TaskSteps/TaskSteps";

interface Props {
  task: Task;
  open: boolean;
  onClose: () => void;
}

export default function OverCard({ task, open, onClose }: Props) {
  const { wrapper, card, cardContent } = useStyles();
  return (
    <Slide direction="up" in={open} timeout={{ enter: 400, exit: 400 }}>
      <Box className={wrapper}>
        <Card className={card} elevation={4}>
          <Box className={cardContent}>
            <Box paddingTop={1} paddingX={1} color="textPrimary">
              <TaskActions onClose={onClose} />
            </Box>
            <Box paddingBottom={3} paddingX={3}>
              <FlatInfo task={task} titleVariant="h3" />
              <TaskSteps task={task} />
            </Box>
          </Box>
        </Card>
      </Box>
    </Slide>
  );
}
