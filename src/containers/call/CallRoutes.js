/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../components/common/PrivateRoute'
import CallReadContainer from './CallReadContainer'
import CallUpdateContainer from './CallUpdateContainer'
import CallDeleteContainer from './CallDeleteContainer'
import VacancyCreateOnCallContainer from '../vacancy/VacancyCreateOnCallContainer'
import CalendarCreateOnCallContainer from '../calendar/CalendarCreateOnCallContainer'

import NotFound from 'components/common/NotFound'

export default class VacancyRoutes extends Component {
  render() {
    return (
      <Switch>
        {/* Create on process */}

        <Route exact path={`${this.props.match.path}/read/:id`} permission='call_read' component={CallReadContainer} />

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
          component={CallDeleteContainer}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/read/:id/calendar/create`}
          permission='calendar_create'
          component={CalendarCreateOnCallContainer}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/read/:id/vacancy/create`}
          permission='vacancy_create'
          component={VacancyCreateOnCallContainer}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
