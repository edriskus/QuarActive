import React, { useCallback, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  StepLabel,
  Step,
  Stepper,
  IconButton,
  CircularProgress
} from "@material-ui/core";
import { Task, CheckpointStatus, TaskStatus } from "../../types/Task";
import { useStyles } from "./TaskSteps.styles";
import { ArrowForward, Share, FavoriteBorder } from "@material-ui/icons";
import { useLocale, local } from "../../utils/Translation";
import { useMutation } from "@apollo/react-hooks";
import {
  changeCheckpointStatus,
  getTasks,
  changeTaskStatus
} from "../../graphql/Task";
import { getCurrentUser } from "../../graphql/Auth";
import { useTranslation } from "react-i18next";
import DifficultyAmount from "../DifficultyAmount/DifficultyAmount";
import { ReactComponent as Balloons } from "../../illustrations/Balloons.svg";

interface Props {
  task: Task;
}

export default function TaskSteps({ task }: Props) {
  const lastCompleteStep = task.checkpoints.reduce(
    (prev, current, i) => (current.status === CheckpointStatus.done ? i : prev),
    -1
  );
  const [activeStep, setActiveStep] = useState(lastCompleteStep + 1);
  const { stepperGrid } = useStyles();
  const step = task.checkpoints[activeStep];
  const { locale } = useLocale();
  const { t } = useTranslation();

  useEffect(() => {
    setActiveStep(lastCompleteStep + 1);
  }, [lastCompleteStep]);

  console.log(lastCompleteStep);

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
    update: (cache, data: any) => {
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

  const handleNext = useCallback(() => {
    if (activeStep <= lastCompleteStep) {
      setActiveStep(activeStep + 1);
    } else {
      doChangeCheckpoint({
        variables: {
          status: CheckpointStatus.done,
          checkpointId: step.id
        }
      });
      if (activeStep === task.checkpoints.length - 1) {
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
    doChangeCheckpoint,
    doChangeTask,
    lastCompleteStep,
    step.id,
    task.checkpoints.length,
    task.id
  ]);

  const handleNavigate = useCallback(
    (step: number) => () => {
      if (step <= lastCompleteStep + 1) {
        setActiveStep(step);
      }
    },
    [lastCompleteStep]
  );

  return step ? (
    <Box marginTop={2}>
      <Typography variant="h5" gutterBottom={true} color="primary">
        {local(step.title, locale)}
      </Typography>
      <Typography variant="body2">{local(step.description, locale)}</Typography>
      <Grid container={true} wrap="nowrap" alignItems="center">
        <Grid item={true} xs="auto" className={stepperGrid}>
          <Stepper activeStep={lastCompleteStep + 1} alternativeLabel={true}>
            {task.checkpoints.map((checkpoint, key) => (
              <Step key={key} onClick={handleNavigate(key)}>
                <StepLabel> </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item={true}>
          {loading ? (
            <CircularProgress />
          ) : (
            <IconButton color="primary" onClick={handleNext}>
              <ArrowForward fontSize="large" />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Box>
  ) : lastCompleteStep === task.checkpoints.length - 1 ? (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      flexDirection="column"
      paddingY={3}
    >
      <Typography
        variant="h5"
        gutterBottom={true}
        color="primary"
        align="center"
      >
        {t("task.congratsYouReceived")}
        {" + "}
        <DifficultyAmount difficulty={task.difficulty} />
        {" !"}
      </Typography>
      <Box paddingY={3}>
        <Balloons />
      </Box>
      <Typography variant="h6" color="secondary" align="center">
        {t("task.didYouLike")}
      </Typography>
      <Box>
        <IconButton color="primary">
          <FavoriteBorder />
        </IconButton>
        <IconButton color="primary">
          <Share />
        </IconButton>
      </Box>
    </Box>
  ) : (
    <Box marginTop={2} />
  );
}
