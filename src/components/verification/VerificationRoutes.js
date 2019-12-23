import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import VerificationToken from './VerificationToken'
import NotFound from 'components/common/NotFound'

export default class ProcessRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}/register`} component={VerificationToken} />
        <Route exact path={`${this.props.match.path}/login`} component={VerificationToken} />
        <Route exact path={`${this.props.match.path}/:token`} component={VerificationToken} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
