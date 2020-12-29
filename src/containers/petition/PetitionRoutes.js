/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import PetitionCreateContainer from './PetitionCreateContainer'
import PetitionDeleteContainer from './PetitionDeleteContainer'

import PrivateRoute from '../../components/common/PrivateRoute'
import NotFound from '../../components/common/NotFound'

export default class VacancyRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={`${this.props.match.path}/create`} component={PetitionCreateContainer} />
        <PrivateRoute exact path={`${this.props.match.path}/delete/:id`} component={PetitionDeleteContainer} />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
