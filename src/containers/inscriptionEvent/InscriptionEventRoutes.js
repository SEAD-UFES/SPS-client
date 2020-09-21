/** @format */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../components/common/PrivateRoute'
import InscriptionEventReadContainer from './InscriptionEventReadContainer'
import InscriptionEventUpdateContainer from './InscriptionEventUpdateContainer'
import InscriptionEventDeleteContainer from './InscriptionEventDeleteContainer'
import NotFound from '../../components/common/NotFound'
import InscriptionCreateOnInscriptionEventContainer from '../inscription/InscriptionCreateOnInscriptionEventContainer'
import InscriptionEventListContainer from './InscriptionEventListContainer'

export default class VacancyRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}/list`} component={InscriptionEventListContainer} />

        {/* Create on Calendar */}

        <Route
          exact
          path={`${this.props.match.path}/read/:id`}
          permission='inscriptionEvent_read'
          component={InscriptionEventReadContainer}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/update/:id`}
          permission='inscriptionEvent_update'
          component={InscriptionEventUpdateContainer}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/delete/:id`}
          permission='inscriptionEvent_delete'
          component={InscriptionEventDeleteContainer}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/read/:id/inscription/create`}
          component={InscriptionCreateOnInscriptionEventContainer}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}