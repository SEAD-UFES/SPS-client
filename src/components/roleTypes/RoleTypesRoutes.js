import React, { Component } from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import RoleTypesList from "components/roleTypes/RoleTypesList";
import RoleTypeView from "components/roleTypes/RoleTypeView";

export default class ParametersRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute
          exact
          path={`${this.props.match.path}/`}
          component={RoleTypesList}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:roletype_id`}
          component={RoleTypeView}
        />
      </Switch>
    );
  }
}
