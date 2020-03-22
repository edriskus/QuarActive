import React from "react";
import { Task, CheckpointStatus, TaskStatus } from "../../types/Task";
import {
  Typography,
  Hidden,
  Box,
  useTheme,
  useMediaQuery
} from "@material-ui/core";
import TaskActions from "../TaskActions/TaskActions";
import StatusBlob from "../StatusBlob/StatusBlob";
import TaskSteps from "../TaskSteps/TaskSteps";
import { useLocale, local } from "../../utils/Translation";
import Difficulty from "../Difficulty/Difficulty";
import { useStyles } from "./ViewTask.styles";
import { resolveTaskImage } from "../../utils/Task";

interface Props {
  task: Task;
  onClose: () => void;
}

export default function ViewTask({ task, onClose }: Props) {
  const { locale } = useLocale();
  const title = local(task.title, locale);

  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("sm"));

  const showDescription =
    task.status !== TaskStatus.done &&
    task.checkpoints[(task.checkpoints.length || 1) - 1]?.status !==
      CheckpointStatus.done;
  return (
    <>
      <Box position={isMd ? "relative" : "fixed"}>
        <TaskActions onClose={onClose} />
      </Box>
      <Hidden smDown={true}>
        <Box display="flex" justifyContent="center" width="100%">
          <img src={resolveTaskImage(task)} height={250} alt={title} />
        </Box>
      </Hidden>
      <Typography
        variant="h3"
        color="primary"
        gutterBottom={true}
        className={classes.mwTop}
      >
        {title}
      </Typography>
      {showDescription && (
        <Typography variant="body1" className={classes.mwTop}>
          {local(task.description, locale)}
        </Typography>
      )}
      <Box position="absolute" top={0} right={0}>
        <StatusBlob
          size={"120px"}
          placementX="right"
          placementY="top"
          margin={-4}
        >
          <Difficulty difficulty={task.difficulty} status={task.status} />
        </StatusBlob>
      </Box>
      <TaskSteps task={task} />
    </>
  );
}
