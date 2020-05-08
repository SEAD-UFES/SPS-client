/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../components/common/PrivateRoute'
import VacancyUpdateContainer from './VacancyUpdateContainer'
import NotFound from 'components/common/NotFound'

export default class VacancyRoutes extends Component {
  render() {
    return (
      <Switch>
        {/* Create on call */}

        <PrivateRoute
          exact
          path={`${this.props.match.path}/update/:id`}
          permission='vacancy_update'
          component={VacancyUpdateContainer}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
