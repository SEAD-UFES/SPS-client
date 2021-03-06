/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../components/common/PrivateRoute'
import CalendarUpdateContainer from './CalendarUpdateContainer'
import CalendarDeleteContainer from './CalendarDeleteContainer'
import NotFound from '../../components/common/NotFound'

export default class VacancyRoutes extends Component {
  render() {
    return (
      <Switch>
        {/* Create on call */}

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
