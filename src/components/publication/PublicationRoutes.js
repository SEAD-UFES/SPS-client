import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from '../common/PrivateRoute'

import PublicationCreate from 'components/publication/PublicationCreate'
import PublicationUpdate from 'components/publication/PublicationUpdate'
import PublicationDelete from 'components/publication/PublicationDelete'
import PublicationView from 'components/publication/PublicationView'

import NotFound from 'components/common/NotFound'

export default class RoleAssignmentsRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={`${this.props.match.path}/create`} component={PublicationCreate} />

        <Route exact path={`${this.props.match.path}/:publication_id`} component={PublicationView} />

        <PrivateRoute exact path={`${this.props.match.path}/:publication_id/update`} component={PublicationUpdate} />

        <PrivateRoute exact path={`${this.props.match.path}/:publication_id/delete`} component={PublicationDelete} />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
