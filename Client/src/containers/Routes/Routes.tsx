import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Landing from "../Landing/Landing";
import NotFound from "../NotFound/NotFound";
import Onboarding from "../Onboarding/Onboarding";
import Login from "../Login/Login";
import { useToken, useAuth } from "../../utils/Auth";
import Home from "../Home/Home";

export default function Routes() {
  const { auth } = useAuth();
  const token = useToken();
  const emulated = auth?.emulated;
  return !!token ? (
    <Switch>
      <Route path="/" exact={true}>
        <Home />
      </Route>
      {!emulated ? (
        <Redirect path="/onboarding" to="/" />
      ) : (
        <Route path="/onboarding">
          <Onboarding />
        </Route>
      )}
      {!emulated ? (
        <Redirect path="/login" to="/" />
      ) : (
        <Route path="/login">
          <Login />
        </Route>
      )}
      <Route path="/:taskId">
        <Home />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact={true}>
        <Landing />
      </Route>
      <Route path="/onboarding">
        <Onboarding />
      </Route>
      <Route path="/onboarding">
        <Onboarding />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
