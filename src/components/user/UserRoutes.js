import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import Users from "./UserList";
import UserView from "./UserView";
import UserEditUser from "./UserEditUser";
import UserEditPerson from "./UserEditPerson";
import UserCreate from "./UserCreate";
import NotFound from "components/common/NotFound";

export default class UsersRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={`${this.props.match.path}`} component={Users} permission="usuários listar" />

        <PrivateRoute exact path={`${this.props.match.path}/create`} component={UserCreate} permission="usuário criar" />

        <PrivateRoute exact path={`${this.props.match.path}/:id`} component={UserView} permission="usuário acessar" />

        <PrivateRoute exact path={`${this.props.match.path}/:id/edit-user`} component={UserEditUser} permission="usuário editar" />

        <PrivateRoute exact path={`${this.props.match.path}/:id/edit-person`} component={UserEditPerson} permission="pessoa acessar" />

        <Route component={NotFound} />
      </Switch>
    );
  }
}
