/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../components/common/PrivateRoute'
import CalendarCreateContainer from './CalendarCreateContainer'
import CalendarReadContainer from './CalendarReadContainer'
import CalendarUpdateContainer from './CalendarUpdateContainer'
import CalendarDeleteContainer from './CalendarDeleteContainer'
import NotFound from '../../components/common/NotFound'

export default class VacancyRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute
          exact
          path={`${this.props.match.path}/create`}
          permission='calendar_create'
          component={CalendarCreateContainer}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/read/:id`}
          permission='calendar_read'
          component={CalendarReadContainer}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/update/:id`}
          permission='calendar_update'
          component={CalendarUpdateContainer}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/delete/:id`}
          permission='calendar_delete'
          component={CalendarDeleteContainer}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
