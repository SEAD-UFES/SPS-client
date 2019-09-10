import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from '../common/PrivateRoute'

import NoticeCreate from 'components/notice/NoticeCreate'
import NoticeUpdate from 'components/notice/NoticeUpdate'
import NoticeDelete from 'components/notice/NoticeDelete'
import NotFound from 'components/common/NotFound'

export default class RoleAssignmentsRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path={`${this.props.match.path}/create`} component={NoticeCreate} />

        <PrivateRoute exact path={`${this.props.match.path}/:notice_id/update`} component={NoticeUpdate} />

        <PrivateRoute exact path={`${this.props.match.path}/:notice_id/delete`} component={NoticeDelete} />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
