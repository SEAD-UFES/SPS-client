import React, { Component } from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import Assignments from "./Assignments";

export default class ParametersRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute
          exact
          path={`${this.props.match.path}/assignments`}
          component={Assignments}
        />
      </Switch>
    );
  }
}
