import clsx from "clsx";
import React from "react";
import { Slide, Card, Box, Grid, Typography } from "@material-ui/core";
import { Task } from "../../types/Task";
import { useStyles } from "./OverCard.styles";
import TaskActions from "../TaskActions/TaskActions";
import TaskSteps from "../TaskSteps/TaskSteps";
import StatusBlob from "../StatusBlob/StatusBlob";

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
              <Grid
                container={true}
                spacing={1}
                justify="space-between"
                alignItems="center"
                wrap="nowrap"
              >
                <Grid item={true} xs="auto">
                  <TaskActions onClose={onClose} />
                  <Typography variant="h3" color="primary" gutterBottom={true}>
                    {task.title}
                  </Typography>
                  <Typography variant="body1">{task.description}</Typography>
                </Grid>
                <Grid item={true} xs="auto">
                  <StatusBlob
                    size={"120px"}
                    placementX="right"
                    placementY="top"
                    margin={-5}
                  >
                    <Typography variant="button" color="inherit">
                      {task.difficulty}
                    </Typography>
                  </StatusBlob>
                </Grid>
              </Grid>
              <TaskSteps task={task} />
            </Box>
          </Box>
        </Card>
      </Box>
    </Slide>
  );
}
