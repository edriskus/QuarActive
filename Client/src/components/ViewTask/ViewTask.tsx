import React from "react";
import { Task } from "../../types/Task";
import { Typography, Hidden, Box } from "@material-ui/core";
import TaskActions from "../TaskActions/TaskActions";
import StatusBlob from "../StatusBlob/StatusBlob";
import TaskSteps from "../TaskSteps/TaskSteps";
import { useLocale, local } from "../../utils/Translation";
import { useTranslation } from "react-i18next";

interface Props {
  task: Task;
  onClose: () => void;
}

export default function ViewTask({ task, onClose }: Props) {
  const { locale } = useLocale();
  const { t } = useTranslation();
  const title = local(task.title, locale);
  return (
    <>
      <TaskActions onClose={onClose} />
      <Hidden smDown={true}>
        <Box display="flex" justifyContent="center" width="100%">
          <img src={task.cover} height={250} alt={title} />
        </Box>
      </Hidden>
      <Typography variant="h3" color="primary" gutterBottom={true}>
        {title}
      </Typography>
      <Typography variant="body1">{local(task.description, locale)}</Typography>
      <Box position="absolute" top={0} right={0}>
        <StatusBlob
          size={"120px"}
          placementX="right"
          placementY="top"
          margin={-4}
        >
          <Typography variant="button" color="inherit">
            {t(`difficulty.${task.difficulty}`)}
          </Typography>
        </StatusBlob>
      </Box>
      <TaskSteps task={task} />
    </>
  );
}
