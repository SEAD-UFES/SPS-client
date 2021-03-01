/** @format */

import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from '../common/PrivateRoute'

import Profile from './ProfileView'
import ProfileUpdateUser from './ProfileUpdateUser'
import ProfileEditPerson from './ProfileEditPerson'
import NotFound from '../common/NotFound'

export default class ProfileRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={`${this.props.match.path}`} component={Profile} />

        <PrivateRoute exact path={`${this.props.match.path}/update-user`} component={ProfileUpdateUser} />

        <PrivateRoute exact path={`${this.props.match.path}/edit-person`} component={ProfileEditPerson} />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
