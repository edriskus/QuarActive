import clsx from "clsx";
import React from "react";
import { Slide, Card, Box } from "@material-ui/core";
import { Task } from "../../types/Task";
import { useStyles } from "./OverCard.styles";
import ViewTask from "../ViewTask/ViewTask";

interface Props {
  task: Task;
  open: boolean;
  onClose: () => void;
}

export default function OverCard({ task, open, onClose }: Props) {
  const { wrapper, card, cardContent, overlay, overlayOpen } = useStyles();
  return (
    <Slide direction="up" in={open} timeout={{ enter: 400, exit: 400 }}>
      <Box className={wrapper}>
        <Box
          className={clsx(overlay, {
            [overlayOpen]: open
          })}
        />
        <Card className={card} elevation={4}>
          <Box className={cardContent}>
            <Box paddingBottom={3} paddingX={3}>
              <ViewTask task={task} onClose={onClose} />
            </Box>
          </Box>
        </Card>
      </Box>
    </Slide>
  );
}
