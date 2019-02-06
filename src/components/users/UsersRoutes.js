import React, { Component } from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import Users from "./Users";
import UserProfile from "./UserProfile";
import UserEditUser from "./UserEditUser";
import UserEditPerson from "./UserEditPerson";
import UserCreate from "./UserCreate";

export default class UsersRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute
          exact
          path={`${this.props.match.path}`}
          component={Users}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/create`}
          component={UserCreate}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:id`}
          component={UserProfile}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:id/edit-user`}
          component={UserEditUser}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:id/edit-person`}
          component={UserEditPerson}
        />
      </Switch>
    );
  }
}
