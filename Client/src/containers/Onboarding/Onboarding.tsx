import React, { useState, useCallback } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import OnboardEmail from "../OnboardEmail/OnboardEmail";
import OnboardPersona from "../OnboardPersona/OnboardPersona";
import { Container, Stepper, Step, StepLabel } from "@material-ui/core";
import { useStyles } from "./Onboarding.styles";
import { UserType } from "../../types/Auth";
import OnboardPassword from "../OnboardPassword/OnboardPassword";

export default function Onboarding() {
  const classes = useStyles();
  const [type, setType] = useState<UserType | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const activeStep = !type ? 0 : !email ? 1 : 2;

  const handleType = useCallback((type: UserType) => {
    setType(type);
  }, []);

  const handleEmail = useCallback((email: string) => {
    setEmail(email);
  }, []);

  const handlePassword = useCallback((password: string) => {
    setPassword(password);
    // Do register
  }, []);

  const goToType = useCallback(() => setType(undefined), []);

  const goToEmail = useCallback(() => setEmail(undefined), []);

  return (
    <>
      <Container maxWidth="xs">
        <Stepper
          activeStep={activeStep}
          className={classes.stepper}
          alternativeLabel={true}
        >
          <Step key={0} onClick={goToType}>
            <StepLabel> </StepLabel>
          </Step>
          <Step key={1} onClick={goToEmail}>
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
        {!!email && (
          <Redirect path="/onboarding/email" to="/onboarding/password" />
        )}
        <Route path="/onboarding/email" exact={true}>
          <OnboardEmail initialValue={email} onChange={handleEmail} />
        </Route>
        {!email && <Redirect to="/onboarding/email" />}
        <Route path="/onboarding/password" exact={true}>
          <OnboardPassword initialValue={password} onChange={handlePassword} />
        </Route>
        <Redirect path="/onboarding" exact={true} to="/onboarding/persona" />
      </Switch>
    </>
  );
}
