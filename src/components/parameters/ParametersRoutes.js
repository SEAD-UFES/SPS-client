import React, { Component } from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import AssignmentsList from "./assignments/AssignmentsList";
import CourseList from "../course/CourseList";
import RegionsList from "./regions/RegionsList";
import RestrictionsList from "./restrictions/RestrictionsList";
import ParameterList from "./ParameterList";

export default class ParametersRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={`${this.props.match.path}`} component={ParameterList} />

        <PrivateRoute exact path={`${this.props.match.path}/courses`} component={CourseList} />

        <PrivateRoute exact path={`${this.props.match.path}/assignments`} component={AssignmentsList} />

        <PrivateRoute exact path={`${this.props.match.path}/regions`} component={RegionsList} />

        <PrivateRoute exact path={`${this.props.match.path}/restrictions`} component={RestrictionsList} />
      </Switch>
    );
  }
}
