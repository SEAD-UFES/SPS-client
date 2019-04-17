import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import UserRoleList from "components/userRole/UserRoleList";
import UserRoleCreate from "components/userRole/UserRoleCreate";
import UserRoleDelete from "components/userRole/UserRoleDelete";
import NotFound from "components/common/NotFound";

export default class RoleAssignmentsRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={`${this.props.match.path}/`} component={UserRoleList} />

        <PrivateRoute exact path={`${this.props.match.path}/create`} component={UserRoleCreate} />

        <PrivateRoute exact path={`${this.props.match.path}/:userrole_id/delete`} component={UserRoleDelete} />

        <Route component={NotFound} />
      </Switch>
    );
  }
}
