import React, { useState, useCallback } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import OnboardEmail from "../OnboardEmail/OnboardEmail";
import OnboardPersona from "../OnboardPersona/OnboardPersona";
import { Container, Stepper, Step, StepLabel } from "@material-ui/core";
import { useStyles } from "./Onboarding.styles";
import { UserType } from "../../types/Auth";

export default function Onboarding() {
  const classes = useStyles();
  const [type, setType] = useState<UserType | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const activeStep = !type ? 0 : !email ? 1 : 2;

  const handleType = useCallback((type: UserType) => {
    setType(type);
  }, []);

  return (
    <>
      <Container maxWidth="xs">
        <Stepper
          activeStep={activeStep}
          className={classes.stepper}
          alternativeLabel={true}
        >
          <Step key={0}>
            <StepLabel> </StepLabel>
          </Step>
          <Step key={1}>
            <StepLabel> </StepLabel>
          </Step>
          <Step key={2}>
            <StepLabel> </StepLabel>
          </Step>
        </Stepper>
      </Container>
      <Switch>
        {!!type && (
          <Redirect path="/onboarding/persona" to="/onboarding/email" />
        )}
        <Route path="/onboarding/persona" exact={true}>
          <OnboardPersona onChange={handleType} />
        </Route>
        {!type && <Redirect to="/onboarding/persona" />}
        <Route path="/onboarding/email" exact={true}>
          <OnboardEmail />
        </Route>
        <Redirect path="/onboarding" exact={true} to="/onboarding/persona" />
      </Switch>
    </>
  );
}
