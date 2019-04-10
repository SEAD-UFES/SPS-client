import React, { Component } from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import AssignmentList from "../assignment/AssignmentList";
import CourseList from "../course/CourseList";
import RegionList from "../region/RegionList";
import RestrictionList from "components/restriction/RestrictionList";
import PublicationTypeList from "components/publicationType/PublicationTypeList";

import ParameterList from "./ParameterList";

export default class ParametersRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={`${this.props.match.path}`} component={ParameterList} />

        <PrivateRoute exact path={`${this.props.match.path}/courses`} component={CourseList} />

        <PrivateRoute exact path={`${this.props.match.path}/assignments`} component={AssignmentList} />

        <PrivateRoute exact path={`${this.props.match.path}/regions`} component={RegionList} />

        <PrivateRoute exact path={`${this.props.match.path}/restrictions`} component={RestrictionList} />

        <PrivateRoute exact path={`${this.props.match.path}/publicationtypes`} component={PublicationTypeList} />
      </Switch>
    );
  }
}
