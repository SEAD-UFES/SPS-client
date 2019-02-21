import React, { Component } from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import AssignmentsList from "./assignments/AssignmentsList";
import CoursesList from "./courses/CoursesList";

export default class ParametersRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute
          exact
          path={`${this.props.match.path}/assignments`}
          component={AssignmentsList}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/courses`}
          component={CoursesList}
        />
      </Switch>
    );
  }
}
