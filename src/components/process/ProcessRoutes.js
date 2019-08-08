import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import ProcessList from "./ProcessList";
import ProcessCreate from "./ProcessCreate";
import ProcessView from "./ProcessView";
import ProcessEdit from "./ProcessEdit";

//V1
import ProcessView_v1 from "./ProcessView_v1";
import ProcessEdit_v1 from "./ProcessEdit_v1";
import CallCreate_v1 from "../call/CallCreate_v1";
import CallEdit_v1 from "../call/CallEdit_v1";
import PublicationCreate_v1 from "components/publication/PublicationCreate_v1";

import CallCreate from "../call/CallCreate";
import CallEdit from "../call/CallEdit";
import CallDelete from "../call/CallDelete";

import StepCreate from "../step/StepCreate";
import StepEdit from "../step/StepEdit";
import StepDelete from "../step/StepDelete";

import VacancyCreate from "../vacancy/VacancyCreate";
import VacancyEdit from "../vacancy/VacancyEdit";
import VacancyDelete from "../vacancy/VacancyDelete";

import PublicationCreate from "components/publication/PublicationCreate";
import PublicationUpdate from "components/publication/PublicationUpdate";
import PublicationDelete from "components/publication/PublicationDelete";

import NotFound from "components/common/NotFound";

export default class ProcessRoutes extends Component {
  render() {
    return (
      <Switch>
        {/* V1 */}
        <Route exact path={`${this.props.match.path}/v1/:id`} component={ProcessView_v1} />
        <PrivateRoute exact path={`${this.props.match.path}/v1/:id/edit`} component={ProcessEdit_v1} />
        <PrivateRoute exact path={`${this.props.match.path}/v1/:id/calls/create`} component={CallCreate_v1} />
        <PrivateRoute exact path={`${this.props.match.path}/v1/:process_id/calls/:call_id/edit`} component={CallEdit_v1} />
        <PrivateRoute exact path={`${this.props.match.path}/v1/:process_id/publications/create`} component={PublicationCreate_v1} />

        <Route exact path={`${this.props.match.path}`} component={ProcessList} />

        <PrivateRoute exact path={`${this.props.match.path}/create`} component={ProcessCreate} />

        <Route exact path={`${this.props.match.path}/:id`} component={ProcessView} />

        <PrivateRoute exact path={`${this.props.match.path}/:id/edit`} component={ProcessEdit} />

        <PrivateRoute exact path={`${this.props.match.path}/:id/calls/create`} component={CallCreate} />

        <PrivateRoute exact path={`${this.props.match.path}/:process_id/calls/:call_id/edit`} component={CallEdit} />

        <PrivateRoute exact path={`${this.props.match.path}/:process_id/calls/:call_id/delete`} component={CallDelete} />

        <PrivateRoute exact path={`${this.props.match.path}/:process_id/calls/:call_id/steps/create`} component={StepCreate} />

        <PrivateRoute exact path={`${this.props.match.path}/:process_id/calls/:call_id/steps/:step_id/edit`} component={StepEdit} />

        <PrivateRoute exact path={`${this.props.match.path}/:process_id/calls/:call_id/steps/:step_id/delete`} component={StepDelete} />

        <PrivateRoute exact path={`${this.props.match.path}/:process_id/calls/:call_id/vacancies/create`} component={VacancyCreate} />

        <PrivateRoute exact path={`${this.props.match.path}/:process_id/calls/:call_id/vacancies/:vacancy_id/edit`} component={VacancyEdit} />

        <PrivateRoute exact path={`${this.props.match.path}/:process_id/calls/:call_id/vacancies/:vacancy_id/delete`} component={VacancyDelete} />

        <PrivateRoute exact path={`${this.props.match.path}/:process_id/publications/create`} component={PublicationCreate} />

        <PrivateRoute exact path={`${this.props.match.path}/:process_id/calls/:call_id/publications/create`} component={PublicationCreate} />

        <PrivateRoute exact path={`${this.props.match.path}/:process_id/publications/:publication_id/update`} component={PublicationUpdate} />

        <PrivateRoute exact path={`${this.props.match.path}/:process_id/calls/:call_id/publications/:publication_id/update`} component={PublicationUpdate} />

        <PrivateRoute exact path={`${this.props.match.path}/:process_id/publications/:publication_id/delete`} component={PublicationDelete} />

        <PrivateRoute exact path={`${this.props.match.path}/:process_id/calls/:call_id/publications/:publication_id/delete`} component={PublicationDelete} />

        <Route component={NotFound} />
      </Switch>
    );
  }
}
