import React, { Component } from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import Profile from "./ProfileView";
import ProfileEditUser from "./ProfileEditUser";
import ProfileEditPerson from "./ProfileEditPerson";

export default class ProfileRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={`${this.props.match.path}`} component={Profile} />

        <PrivateRoute exact path={`${this.props.match.path}/edit-user`} component={ProfileEditUser} />

        <PrivateRoute exact path={`${this.props.match.path}/edit-person`} component={ProfileEditPerson} />
      </Switch>
    );
  }
}
