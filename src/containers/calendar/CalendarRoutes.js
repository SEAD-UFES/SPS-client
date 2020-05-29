/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../components/common/PrivateRoute'
import CalendarReadContainer from './CalendarReadContainer'
import CalendarUpdateContainer from './CalendarUpdateContainer'
import CalendarDeleteContainer from './CalendarDeleteContainer'
import InscriptionEventCreateOnCalendarContainer from '../inscriptonEvent/InscriptionEventCreateOnCalendarContainer'
import NotFound from '../../components/common/NotFound'

export default class VacancyRoutes extends Component {
  render() {
    return (
      <Switch>
        {/* Create on call */}

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

        <PrivateRoute
          exact
          path={`${this.props.match.path}/read/:id/inscription-event/create`}
          permission='inscriptionEvent_create'
          component={InscriptionEventCreateOnCalendarContainer}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
