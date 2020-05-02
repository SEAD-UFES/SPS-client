/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../components/common/PrivateRoute'
import CallReadContainerV2 from './CallReadContainerV2'
import CallUpdateContainerV2 from './CallUpdateContainerV2'
import CallDeleteContainerV2 from './CallDeleteContainerV2'
import NotFound from 'components/common/NotFound'

export default class ProcessRoutes extends Component {
  render() {
    return (
      <Switch>
        {/* Create feito by process */}

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
          component={CallUpdateContainerV2}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/delete/:id`}
          permission='call_delete'
          component={CallDeleteContainerV2}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
