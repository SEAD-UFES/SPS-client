/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import ProcessReadContainer from './ProcessReadContainer'

import NotFound from 'components/common/NotFound'

export default class VacancyRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}/read/:id`} component={ProcessReadContainer} />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
