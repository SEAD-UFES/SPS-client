/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../components/common/PrivateRoute'
import InscriptionDeleteContainer from './InscriptionDeleteContainer'
import InscriptionCreateContainer from './InscriptionCreateContainer'

import NotFound from '../../components/common/NotFound'

export default class VacancyRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={`${this.props.match.path}/create`} component={InscriptionCreateContainer} />
        <PrivateRoute exact path={`${this.props.match.path}/delete/:id`} component={InscriptionDeleteContainer} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
