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
import {
  Task,
  CheckpointStatus,
  Checkpoint,
  TaskStatus
} from "../../types/Task";
import { useStyles } from "./TaskSteps.styles";
import { ArrowForward, Check } from "@material-ui/icons";
import { useLocale, local } from "../../utils/Translation";
import { useAuth } from "../../utils/Auth";
import ReactMarkdown from "react-markdown";
import { sortByOrder, useCompleteCheckpoint } from "../../utils/Task";
import TaskSuccess from "../TaskSuccess/TaskSuccess";
import TaskFinishRegistration from "../TaskFinishRegistration/TaskFinishRegistration";

interface Props {
  task: Task;
}

export default function TaskSteps({ task }: Props) {
  const checkpoints = sortByOrder(task.checkpoints ?? []);
  const lastCompleteStep =
    task.status === TaskStatus.done
      ? (checkpoints.length || 1) - 1
      : checkpoints.reduce(
          (prev, current, i) =>
            current.status === CheckpointStatus.done ? i : prev,
          -1
        );

  const [activeStep, setActiveStep] = useState(lastCompleteStep + 1);
  const { auth } = useAuth();
  const { stepperGrid } = useStyles();
  const { locale } = useLocale();

  const step = checkpoints[activeStep] as Checkpoint | undefined;
  const shareLink = `https://quaractive.com/${task.id}`;
  const emulated = !!auth?.emulated || !auth?.token;

  const { loading, handleComplete, handleNext } = useCompleteCheckpoint(
    task,
    checkpoints,
    step,
    emulated,
    lastCompleteStep,
    activeStep,
    setActiveStep
  );

  useEffect(() => {
    setActiveStep(lastCompleteStep + 1);
  }, [lastCompleteStep]);

  const handleNavigate = useCallback(
    (step: number) => () => {
      if (step <= (!emulated ? lastCompleteStep + 1 : activeStep)) {
        setActiveStep(step);
      }
    },
    [activeStep, emulated, lastCompleteStep]
  );

  return step ? (
    <Box marginTop={2}>
      <Typography variant="h5" gutterBottom={true} color="primary">
        {local(step.title, locale)}
      </Typography>
      <ReactMarkdown source={local(step.description, locale)} />
      <Grid container={true} wrap="nowrap" alignItems="center">
        <Grid item={true} xs="auto" className={stepperGrid}>
          <Stepper
            activeStep={!emulated ? lastCompleteStep + 1 : activeStep}
            alternativeLabel={true}
          >
            {checkpoints.map((checkpoint, key) => (
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
              {activeStep === checkpoints.length - 1 ? (
                <Check fontSize="large" />
              ) : (
                <ArrowForward fontSize="large" />
              )}
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Box>
  ) : checkpoints.length === 0 && activeStep === 0 ? (
    <Grid container={true} wrap="nowrap" alignItems="center" justify="flex-end">
      <Grid item={true}>
        {loading ? (
          <CircularProgress />
        ) : (
          <IconButton color="primary" onClick={handleComplete}>
            <Check fontSize="large" />
          </IconButton>
        )}
      </Grid>
    </Grid>
  ) : (lastCompleteStep === checkpoints.length - 1 ||
      task.status === TaskStatus.done) &&
    !emulated ? (
    <TaskSuccess difficulty={task.difficulty} shareLink={shareLink} />
  ) : emulated ? (
    <TaskFinishRegistration
      difficulty={task.difficulty}
      shareLink={shareLink}
    />
  ) : (
    <Box marginTop={2} />
  );
}
