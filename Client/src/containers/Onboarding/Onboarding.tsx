import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import OnboardEmail from "../OnboardEmail/OnboardEmail";
import OnboardPersona from "../OnboardPersona/OnboardPersona";

export default function Onboarding() {
  return (
    <Switch>
      <Route path="/onboarding/persona" exact={true}>
        <OnboardPersona />
      </Route>
      <Route path="/onboarding/email" exact={true}>
        <OnboardEmail />
      </Route>
      <Redirect path="/onboarding" exact={true} to="/onboarding/persona" />
    </Switch>
  );
}
