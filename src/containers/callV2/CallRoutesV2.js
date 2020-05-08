/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../components/common/PrivateRoute'
import CallReadContainerV2 from './CallReadContainerV2'
import CallUpdateContainer from './CallUpdateContainer'
import CallDeleteContainerV2 from './CallDeleteContainerV2'
import VacancyCreateContainerOnCall from '../vacancy/VacancyCreateContainerOnCall'
import NotFound from 'components/common/NotFound'

export default class VacancyRoutes extends Component {
  render() {
    return (
      <Switch>
        {/* Create on process */}

        <PrivateRoute
          exact
          path={`${this.props.match.path}/read/:id`}
          permission='call_read'
          component={CallReadContainerV2}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/update/:id`}
          permission='call_update'
          component={CallUpdateContainer}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/delete/:id`}
          permission='call_delete'
          component={CallDeleteContainerV2}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/read/:id/vacancy/create`}
          permission='vacancy_create'
          component={VacancyCreateContainerOnCall}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
