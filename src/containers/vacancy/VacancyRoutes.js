/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../components/common/PrivateRoute'
import VacancyUpdateContainer from './VacancyUpdateContainer'
import VacancyDeleteContainer from './VacancyDeleteContainer'
import NotFound from '../../components/common/NotFound'

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

        <PrivateRoute
          exact
          path={`${this.props.match.path}/delete/:id`}
          permission='vacancy_delete'
          component={VacancyDeleteContainer}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
