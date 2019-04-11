import React, { Component } from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import Users from "./UserList";
import UserView from "./UserView";
import UserEditUser from "./UserEditUser";
import UserEditPerson from "./UserEditPerson";
import UserCreate from "./UserCreate";

export default class UsersRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={`${this.props.match.path}`} component={Users} />

        <PrivateRoute exact path={`${this.props.match.path}/create`} component={UserCreate} />

        <PrivateRoute exact path={`${this.props.match.path}/:id`} component={UserView} />

        <PrivateRoute exact path={`${this.props.match.path}/:id/edit-user`} component={UserEditUser} />

        <PrivateRoute exact path={`${this.props.match.path}/:id/edit-person`} component={UserEditPerson} />
      </Switch>
    );
  }
}
