import React, { useState, useCallback } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import OnboardEmail from "../OnboardEmail/OnboardEmail";
import OnboardPersona from "../OnboardPersona/OnboardPersona";
import { Container, Stepper, Step, StepLabel } from "@material-ui/core";
import { UserType, Auth } from "../../types/Auth";
import OnboardPassword from "../OnboardPassword/OnboardPassword";
import { useMutation } from "@apollo/react-hooks";
import { useAuth } from "../../utils/Auth";
import { register } from "../../graphql/Auth";

export default function Onboarding() {
  const [type, setType] = useState<UserType | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const { setAuth } = useAuth();

  const activeStep = !type ? 0 : !email ? 1 : 2;

  const handleType = useCallback((type: UserType) => {
    setType(type);
  }, []);

  const handleEmail = useCallback((email: string) => {
    setEmail(email);
  }, []);

  const [doRegister, { loading, error }] = useMutation(register, {
    onCompleted: ({ register }: { register: Auth }) => {
      setAuth(register);
    }
  });

  const handlePassword = useCallback(
    (password: string) => {
      setPassword(password);
      const variables = { type, email, password };
      console.log(variables);

      doRegister({
        variables
      });
    },
    [doRegister, email, type]
  );

  const goToType = useCallback(() => setType(undefined), []);

  const goToEmail = useCallback(() => setEmail(undefined), []);

  return (
    <>
      <Container maxWidth="xs">
        <Stepper activeStep={activeStep} alternativeLabel={true}>
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
          <OnboardPassword
            initialValue={password}
            onChange={handlePassword}
            loading={loading}
            error={error}
          />
        </Route>
        <Redirect path="/onboarding" exact={true} to="/onboarding/persona" />
      </Switch>
    </>
  );
}
