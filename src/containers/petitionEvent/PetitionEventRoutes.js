/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import PetitionEventCreateContainer from './PetitionEventCreateContainer'
import PetitionEventReadContainer from './PetitionEventReadContainer'
import PetitionEventDeleteContainer from './PetitionEventDeleteContainer'
import PetitionEventListContainer from './PetitionEventListContainer'

import PrivateRoute from '../../components/common/PrivateRoute'
import NotFound from '../../components/common/NotFound'

export default class VacancyRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={`${this.props.match.path}/create`} component={PetitionEventCreateContainer} />
        <PrivateRoute exact path={`${this.props.match.path}/read/:id`} component={PetitionEventReadContainer} />
        <PrivateRoute exact path={`${this.props.match.path}/delete/:id`} component={PetitionEventDeleteContainer} />
        <PrivateRoute exact path={`${this.props.match.path}/list`} component={PetitionEventListContainer} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
