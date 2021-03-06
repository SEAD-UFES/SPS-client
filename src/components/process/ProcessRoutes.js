/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../common/PrivateRoute'

import ProcessList from './ProcessList'
import ProcessCreate from './ProcessCreate'
import ProcessView from './ProcessView'
import ProcessEdit from './ProcessEdit'

//import CallView from 'components/call/CallView'
//import CallCreate from '../call/CallCreate'
//import CallUpdate from '../call/CallUpdate'
//import CallDelete from '../call/CallDelete'

import StepCreate from '../step/StepCreate'
import StepEdit from '../step/StepEdit'
import StepDelete from '../step/StepDelete'

import PublicationCreate from 'components/publication/PublicationCreate'
import PublicationUpdate from 'components/publication/PublicationUpdate'
import PublicationDelete from 'components/publication/PublicationDelete'
import PublicationRoutes from 'components/publication/PublicationRoutes'

import CallCreateContainer from '../../containers/call/CallCreateContainer'

import NotFound from '../../components/common/NotFound'

export default class ProcessRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}`} component={ProcessList} />

        <PrivateRoute exact path={`${this.props.match.path}/create`} component={ProcessCreate} />

        <Route exact path={`${this.props.match.path}/:id`} component={ProcessView} />

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
