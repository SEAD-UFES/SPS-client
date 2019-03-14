import React, { Component } from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import RoleTypesList from "components/roleTypes/RoleTypesList";
import RoleTypeCreateUpdate from "components/roleTypes/RoleTypeCreateUpdate";
import RoleTypeView from "components/roleTypes/RoleTypeView";
import RoleTypeDelete from "components/roleTypes/RoleTypeDelete";
import RoleTypePermAssigCreate from "components/roleTypes/RoleTypePermAssigCreate";

export default class RoleTypesRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute
          exact
          path={`${this.props.match.path}`}
          component={RoleTypesList}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/create`}
          component={RoleTypeCreateUpdate}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:roletype_id`}
          component={RoleTypeView}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:roletype_id/update`}
          component={RoleTypeCreateUpdate}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:roletype_id/delete`}
          component={RoleTypeDelete}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:roletype_id/create-permassig`}
          component={RoleTypePermAssigCreate}
        />
      </Switch>
    );
  }
}
