import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

// import Users from "./Users";
// import UserProfile from "./UserProfile";
// import UserEditUser from "./UserEditUser";
// import UserEditPerson from "./UserEditPerson";
// import UserCreate from "./UserCreate";

import Processes from "./Processes";
import ProcessCreate from "./ProcessCreate";
import ProcessView from "./ProcessView";
import ProcessEdit from "./ProcessEdit";
import CallCreate from "../processCalls/CallCreate";
import CallEdit from "../processCalls/CallEdit";
import StepCreate from "../processCallsSteps/StepCreate";
import StepEdit from "../processCallsSteps/StepEdit";
import VacancyCreate from "../processCallsVacancies/VacancyCreate";
import VacancyEdit from "../processCallsVacancies/VacancyEdit";

export default class ProcessesRoutes extends Component {
  render() {
    return (
      <Switch>
        {/* <PrivateRoute
          exact
          path={`${this.props.match.path}`}
          component={Users}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/create`}
          component={UserCreate}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:id`}
          component={UserProfile}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:id/edit-user`}
          component={UserEditUser}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:id/edit-person`}
          component={UserEditPerson}
        /> */}

        <Route exact path={`${this.props.match.path}`} component={Processes} />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/create`}
          component={ProcessCreate}
        />

        <Route
          exact
          path={`${this.props.match.path}/:id`}
          component={ProcessView}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:id/edit`}
          component={ProcessEdit}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:id/calls/create`}
          component={CallCreate}
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/:process_id/calls/:call_id/edit`}
          component={CallEdit}
        />

        <PrivateRoute
          exact
          path={`${
            this.props.match.path
          }/:process_id/calls/:call_id/steps/create`}
          component={StepCreate}
        />

        <PrivateRoute
          exact
          path={`${
            this.props.match.path
          }/:process_id/calls/:call_id/steps/:step_id/edit`}
          component={StepEdit}
        />

        <PrivateRoute
          exact
          path={`${
            this.props.match.path
          }/:process_id/calls/:call_id/vacancies/create`}
          component={VacancyCreate}
        />

        <PrivateRoute
          exact
          path={`${
            this.props.match.path
          }/:process_id/calls/:call_id/vacancies/:vacancy_id/edit`}
          component={VacancyEdit}
        />
      </Switch>
    );
  }
}
