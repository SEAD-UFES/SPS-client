import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import AssignmentList from "../assignment/AssignmentList";
import CourseList from "../course/CourseList";
import RegionList from "../region/RegionList";
import RestrictionList from "components/restriction/RestrictionList";
import PublicationTypeList from "components/publicationType/PublicationTypeList";
import StepTypeList from "components/stepType/StepTypeList";
import GraduationTypeList from "components/graduationType/GraduationTypeList";

import RoleTypeRoutes from "components/roleType/RoleTypeRoutes";
import UserRoleRoutes from "components/userRole/UserRoleRoutes";

import ParameterList from "./ParameterList";

import NotFound from "components/common/NotFound";

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

        <PrivateRoute path={`${this.props.match.path}/roletypes`} component={RoleTypeRoutes} />

        <PrivateRoute path={`${this.props.match.path}/roleassignments`} component={UserRoleRoutes} />

        <PrivateRoute path={`${this.props.match.path}/steptypes`} component={StepTypeList} />

        <PrivateRoute path={`${this.props.match.path}/graduationtypes`} component={GraduationTypeList} />

        <Route component={NotFound} />
      </Switch>
    );
  }
}
