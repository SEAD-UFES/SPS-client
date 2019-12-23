import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import RecoverRequest from './RecoverRequest'
import RecoverToken from './RecoverToken'
import NotFound from 'components/common/NotFound'

export default class ProcessRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}/request`} component={RecoverRequest} />
        <Route exact path={`${this.props.match.path}`} component={RecoverToken} />
        <Route exact path={`${this.props.match.path}/:token`} component={RecoverToken} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
