import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import RoleTypesList from "components/roleType/RoleTypeList";
import RoleTypeCreateUpdate from "components/roleType/RoleTypeCreateUpdate";
import RoleTypeView from "components/roleType/RoleTypeView";
import RoleTypeDelete from "components/roleType/RoleTypeDelete";
import rolePermissionCreate from "components/rolePermission/rolePermissionCreate";
import rolePermissionDelete from "components/rolePermission/rolePermissionDelete";

import NotFound from "components/common/NotFound";

export default class RoleTypesRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={`${this.props.match.path}`} component={RoleTypesList} />

        <PrivateRoute exact path={`${this.props.match.path}/create`} component={RoleTypeCreateUpdate} />

        <PrivateRoute exact path={`${this.props.match.path}/:roletype_id`} component={RoleTypeView} />

        <PrivateRoute exact path={`${this.props.match.path}/:roletype_id/update`} component={RoleTypeCreateUpdate} />

        <PrivateRoute exact path={`${this.props.match.path}/:roletype_id/delete`} component={RoleTypeDelete} />

        <PrivateRoute exact path={`${this.props.match.path}/:roletype_id/create-permassig`} component={rolePermissionCreate} />

        <PrivateRoute exact path={`${this.props.match.path}/:roletype_id/delete-permassig/:permissionassignment_id`} component={rolePermissionDelete} />

        <Route component={NotFound} />
      </Switch>
    );
  }
}
