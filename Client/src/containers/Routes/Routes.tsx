import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Landing from "../Landing/Landing";
import NotFound from "../NotFound/NotFound";
import Onboarding from "../Onboarding/Onboarding";
import Login from "../Login/Login";
import { useToken } from "../../utils/Auth";
import Home from "../Home/Home";

export default function Routes() {
  const token = useToken();
  return !!token ? (
    <Switch>
      <Route path="/" exact={true}>
        <Home />
      </Route>
      <Redirect path="/onboarding" to="/" />
      <Redirect path="/login" to="/" />
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
      <Route path="/login">
        <Login />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
