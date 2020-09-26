/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../components/common/PrivateRoute'

import ProcessList from '../../components/process/ProcessList'
import ProcessCreate from '../../components/process/ProcessCreate'
import ProcessReadContainer from './ProcessReadContainer'
import ProcessEdit from '../../components/process/ProcessEdit'

import StepCreate from '../../components/step/StepCreate'
import StepEdit from '../../components/step/StepEdit'
import StepDelete from '../../components/step/StepDelete'

import PublicationCreate from '../../components/publication/PublicationCreate'
import PublicationUpdate from '../../components/publication/PublicationUpdate'
import PublicationDelete from '../../components/publication/PublicationDelete'
import PublicationRoutes from '../../components/publication/PublicationRoutes'

import CallCreateContainer from '../../containers/call/CallCreateContainer'

import NotFound from '../../components/common/NotFound'

export default class ProcessRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}`} component={ProcessList} />

        <PrivateRoute exact path={`${this.props.match.path}/create`} component={ProcessCreate} />

        <Route exact path={`${this.props.match.path}/read/:id`} component={ProcessReadContainer} />

        <PrivateRoute exact path={`${this.props.match.path}/:id/edit`} component={ProcessEdit} />

        {/* <PrivateRoute exact path={`${this.props.match.path}/:process_id/call/create/old`} component={CallCreate} /> */}

        <PrivateRoute exact path={`${this.props.match.path}/:id/call/create`} component={CallCreateContainer} />

        {/* <PrivateRoute exact path={`${this.props.match.path}/:process_id/call/:call_id`} component={CallView} /> */}

        {/* <PrivateRoute exact path={`${this.props.match.path}/:process_id/call/:call_id/update`} component={CallUpdate} /> */}

        {/* <PrivateRoute exact path={`${this.props.match.path}/:process_id/call/:call_id/delete`} component={CallDelete} /> */}

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:process_id/call/:call_id/steps/create`}
          component={StepCreate}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:process_id/call/:call_id/steps/:step_id/edit`}
          component={StepEdit}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:process_id/call/:call_id/steps/:step_id/delete`}
          component={StepDelete}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:process_id/call/:call_id/publications/create`}
          component={PublicationCreate}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:process_id/call/:call_id/publications/:publication_id/delete`}
          component={PublicationDelete}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:process_id/call/:call_id/publications/:publication_id/update`}
          component={PublicationUpdate}
        />

        <Route path={`${this.props.match.path}/:process_id/publications`} component={PublicationRoutes} />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
