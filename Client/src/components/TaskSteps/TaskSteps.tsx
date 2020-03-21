import React, { useCallback, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  StepLabel,
  Step,
  Stepper,
  IconButton
} from "@material-ui/core";
import { Task } from "../../types/Task";
import { useStyles } from "./TaskSteps.styles";
import { ArrowForward } from "@material-ui/icons";
import { useLocale, local } from "../../utils/Translation";

interface Props {
  task: Task;
}

export default function TaskSteps({ task }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const { stepperGrid } = useStyles();
  const step = task.checkpoints[activeStep];
  const { locale } = useLocale();

  const handleNext = useCallback(() => {
    if (activeStep < task.checkpoints.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Handle completion
    }
  }, [activeStep, task.checkpoints.length]);

  const handleNavigate = useCallback(
    (step: number) => () => {
      if (step <= activeStep) {
        setActiveStep(step);
      }
    },
    [activeStep]
  );

  return (
    <Box marginTop={2}>
      <Typography variant="h5" gutterBottom={true} color="primary">
        {local(step.title, locale)}
      </Typography>
      <Typography variant="body2">{local(step.description, locale)}</Typography>
      <Grid container={true} wrap="nowrap" alignItems="center">
        <Grid item={true} xs="auto" className={stepperGrid}>
          <Stepper activeStep={activeStep} alternativeLabel={true}>
            {task.checkpoints.map((checkpoint, key) => (
              <Step key={key} onClick={handleNavigate(key)}>
                <StepLabel> </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item={true}>
          <IconButton color="primary" onClick={handleNext}>
            <ArrowForward fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
