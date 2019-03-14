import React, { Component } from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import RoleAssignmentsList from "components/roleAssignments/RoleAssignmentsList";
import RoleAssignmentCreate from "components/roleAssignments/RoleAssignmentCreate";
//import RoleAssignmentView from "components/roleAssignments/RoleAssignmentView";
import RoleAssignmentDelete from "components/roleAssignments/RoleAssignmentDelete";

export default class RoleAssignmentsRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute
          exact
          path={`${this.props.match.path}/`}
          component={RoleAssignmentsList}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/create`}
          component={RoleAssignmentCreate}
        />

        {/* <PrivateRoute
          exact
          path={`${this.props.match.path}/:roletype_id`}
          component={RoleAssignmentView}
        /> */}

        {/* <PrivateRoute
          exact
          path={`${this.props.match.path}/:roletype_id/update`}
          component={RoleAssignmentCreateUpdate}
        /> */}

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:roleassignment_id/delete`}
          component={RoleAssignmentDelete}
        />
      </Switch>
    );
  }
}
