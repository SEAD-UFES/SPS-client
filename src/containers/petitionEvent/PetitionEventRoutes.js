/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import PetitionEventCreateContainer from './PetitionEventCreateContainer'

import PrivateRoute from '../../components/common/PrivateRoute'
import NotFound from '../../components/common/NotFound'

export default class VacancyRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={`${this.props.match.path}/create`} component={PetitionEventCreateContainer} />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
