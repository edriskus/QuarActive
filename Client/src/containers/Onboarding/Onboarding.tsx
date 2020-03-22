import React, { useState, useCallback, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import OnboardEmail from "../OnboardEmail/OnboardEmail";
import OnboardPersona from "../OnboardPersona/OnboardPersona";
import { Container, Stepper, Step, StepLabel } from "@material-ui/core";
import { UserType, Auth } from "../../types/Auth";
import OnboardPassword from "../OnboardPassword/OnboardPassword";
import { useMutation } from "@apollo/react-hooks";
import { useAuth } from "../../utils/Auth";
import { register } from "../../graphql/Auth";
import { PersonalityTraitType } from "../../types/Persona";

export default function Onboarding() {
  const { auth, setAuth } = useAuth();
  const [type, setType] = useState<UserType | undefined>(
    auth?.user?.type ?? undefined
  );
  const [traits, setTraits] = useState<PersonalityTraitType[]>(
    auth?.user?.personalityTraits ?? []
  );
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [personSubmitted, setPersonSubmitted] = useState<boolean>(
    !!type && traits.length > 0
  );

  const activeStep = !personSubmitted ? 0 : !email ? 1 : 2;

  const handleType = useCallback((type: UserType) => {
    setType(type);
  }, []);

  const handleTraits = useCallback((traits: PersonalityTraitType[]) => {
    setTraits(traits);
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
      const variables = { type, email, password, personalityTraits: traits };
      doRegister({
        variables
      });
    },
    [doRegister, email, traits, type]
  );

  const goToType = useCallback(() => setType(undefined), []);

  const goToEmail = useCallback(() => setEmail(undefined), []);

  const handlePersonSubmit = useCallback(() => setPersonSubmitted(true), []);

  useEffect(() => {
    if (!type) {
      setPersonSubmitted(false);
    }
  }, [type]);

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
        {personSubmitted && (
          <Redirect path="/onboarding/persona" to="/onboarding/email" />
        )}
        <Route path="/onboarding/persona" exact={true}>
          <OnboardPersona
            type={type}
            traits={traits}
            onTypeChange={handleType}
            onTraitsChange={handleTraits}
            onNext={handlePersonSubmit}
          />
        </Route>
        {!personSubmitted && <Redirect to="/onboarding/persona" />}
        {!!email && (
          <Redirect path="/onboarding/email" to="/onboarding/password" />
        )}
        <Route path="/onboarding/email" exact={true}>
          <OnboardEmail
            initialValue={email}
            onChange={handleEmail}
            traits={traits}
            type={type}
          />
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
