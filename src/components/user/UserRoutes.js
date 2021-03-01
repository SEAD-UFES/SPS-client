/** @format */

import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from '../common/PrivateRoute'

import Users from './UserList'
import UserView from './UserView'
import UserEditUser from './UserEditUser'
import UserEditPerson from './UserEditPerson'
import UserCreate from './UserCreate'
import NotFound from '../../components/common/NotFound'

export default class UsersRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={`${this.props.match.path}`} component={Users} permission='user_list' />

        <PrivateRoute exact path={`${this.props.match.path}/create`} component={UserCreate} permission='user_create' />

        <PrivateRoute exact path={`${this.props.match.path}/:id`} component={UserView} permission='user_read' />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:id/update-user`}
          component={UserEditUser}
          permission='user_update'
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:id/edit-person`}
          component={UserEditPerson}
          permission='people_read'
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
