import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "../Landing/Landing";
import NotFound from "../NotFound/NotFound";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact={true}>
        <Landing />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
