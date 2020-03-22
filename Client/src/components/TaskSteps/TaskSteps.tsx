import React, { useCallback, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  StepLabel,
  Step,
  Stepper,
  IconButton,
  CircularProgress,
  Button
} from "@material-ui/core";
import {
  Task,
  CheckpointStatus,
  Checkpoint,
  TaskStatus
} from "../../types/Task";
import { useStyles } from "./TaskSteps.styles";
import { ArrowForward, Share, Check } from "@material-ui/icons";
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
import { useAuth } from "../../utils/Auth";
import { Link } from "react-router-dom";
import FBShare from "../FBShare/FBShare";
import ReactMarkdown from "react-markdown";

interface Props {
  task: Task;
}

export default function TaskSteps({ task }: Props) {
  const lastCompleteStep =
    task.status === TaskStatus.done
      ? (task.checkpoints.length || 1) - 1
      : task.checkpoints.reduce(
          (prev, current, i) =>
            current.status === CheckpointStatus.done ? i : prev,
          -1
        );
  const [activeStep, setActiveStep] = useState(lastCompleteStep + 1);
  const { auth } = useAuth();
  const { stepperGrid } = useStyles();
  const step = task.checkpoints[activeStep] as Checkpoint | undefined;
  const { locale } = useLocale();
  const { t } = useTranslation();

  const shareLink = `https://quaractive.com/${task.id}`;

  useEffect(() => {
    setActiveStep(lastCompleteStep + 1);
  }, [lastCompleteStep]);

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
    update: cache => {
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

  const handleComplete = useCallback(() => {
    if (!auth?.emulated) {
      doChangeTask({
        variables: {
          status: TaskStatus.done,
          taskId: task.id
        }
      });
    } else {
      setActiveStep(activeStep + 1);
    }
  }, [activeStep, auth, doChangeTask, task.id]);

  const handleNext = useCallback(() => {
    if (activeStep <= lastCompleteStep) {
      setActiveStep(activeStep + 1);
    } else {
      if (!auth?.emulated) {
        doChangeCheckpoint({
          variables: {
            status: CheckpointStatus.done,
            checkpointId: step?.id
          }
        });
      } else {
        setActiveStep(activeStep + 1);
      }
      if (activeStep === task.checkpoints.length - 1 && !auth?.emulated) {
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
    auth,
    doChangeCheckpoint,
    doChangeTask,
    lastCompleteStep,
    step,
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
      <ReactMarkdown source={local(step.description, locale)} />
      <Grid container={true} wrap="nowrap" alignItems="center">
        <Grid item={true} xs="auto" className={stepperGrid}>
          <Stepper
            activeStep={!auth?.emulated ? lastCompleteStep + 1 : activeStep}
            alternativeLabel={true}
          >
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
              {activeStep === task.checkpoints.length - 1 ? (
                <Check fontSize="large" />
              ) : (
                <ArrowForward fontSize="large" />
              )}
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Box>
  ) : task.checkpoints.length === 0 && activeStep === 0 ? (
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
  ) : (lastCompleteStep === task.checkpoints.length - 1 ||
      task.status === TaskStatus.done) &&
    !auth?.emulated ? (
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
      <Box paddingY={2} display="flex" alignItems="center">
        <FBShare link={shareLink} />
        <IconButton component="a" target="_blank" href={shareLink}>
          <Share />
        </IconButton>
      </Box>
    </Box>
  ) : auth?.emulated ? (
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
        {t("task.congratsLoginPlease")}
        {" + "}
        <DifficultyAmount difficulty={task.difficulty} />
        {" !"}
      </Typography>
      <Box paddingY={3}>
        <Button
          size="large"
          color="primary"
          variant="contained"
          component={Link}
          to="/onboarding/email"
        >
          {t("task.finishRegistration")}
        </Button>
      </Box>
      <Typography variant="h6" color="secondary" align="center">
        {t("task.didYouLike")}
      </Typography>
      <Box paddingY={2} display="flex" alignItems="center">
        <FBShare link={shareLink} />
        <IconButton component="a" target="_blank" href={shareLink}>
          <Share />
        </IconButton>
      </Box>
    </Box>
  ) : (
    <Box marginTop={2} />
  );
}
