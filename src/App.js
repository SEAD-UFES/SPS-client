/** @format */

//Default react app imports
//import logo from "./logo.svg";
import React, { Component } from 'react'
import './style.css'

//Library imports
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'

//Local imports
import store from './store/store' //Importa o store criado nesse arquivo.
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './components/auth/authActions'
import { clearCurrentProfile } from './components/profile/profileActions'
import PrivateRoute from './components/common/PrivateRoute'

//Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/profile/Dashboard'

//Route components
import ProfileRoutes from './components/profile/ProfileRoutes'
import UserRoutes from './components/user/UserRoutes'
import ProcessRoutes from './containers/process/ProcessRoutes'
import ParameterRoutes from './components/parameter/ParameterRoutes'
import RecoverRoutes from './components/recover/RecoverRoutes'
import CallRoutes from './containers/call/CallRoutes'
import VacancyRoutes from './containers/vacancy/VacancyRoutes'
import CalendarRoutes from './containers/calendar/CalendarRoutes'
import InscriptionEventRoutes from './containers/inscriptionEvent/InscriptionEventRoutes'
import InscriptionRoutes from './containers/inscription/InscriptionRoutes'
import PetitionEventRoutes from './containers/petitionEvent/PetitionEventRoutes'
import PetitionRoutes from './containers/petition/PetitionRoutes'

import NotFound from './components/common/NotFound'
import TesteSelectors from './store/selectorsV2/TesteSelectors'

//Check for token
if (localStorage.jwtToken && typeof localStorage.jwtToken !== 'undefined') {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken)

  //decode token
  const decoded = jwt_decode(localStorage.jwtToken)

  //dispath action to set user and profile on store
  store.dispatch(setCurrentUser(decoded))

  //check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    //clear current profile
    store.dispatch(clearCurrentProfile())

    //logout user
    store.dispatch(logoutUser())

    //redirect to login page (replaced by PrivateRoute)
    //window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />

            <Switch>
              <Route exact path='/' component={Landing} />

              <Route exact path='/register' component={Register} />

              <Route exact path='/login' component={Login} />

              <PrivateRoute exact path='/dashboard' component={Dashboard} />

              <PrivateRoute path='/profile' component={ProfileRoutes} />

              <PrivateRoute path='/users' component={UserRoutes} />

              <Route path='/processes' component={ProcessRoutes} />

              <PrivateRoute path='/parameters' component={ParameterRoutes} permission='parameter_list' />

              <Route path='/recover' component={RecoverRoutes} />

              <Route path='/call' component={CallRoutes} />
              <Route path='/vacancy' component={VacancyRoutes} />
              <Route path='/calendar' component={CalendarRoutes} />
              <Route path='/inscription-event' component={InscriptionEventRoutes} />
              <Route path='/inscription' component={InscriptionRoutes} />
              <Route path='/petition-event' component={PetitionEventRoutes} />
              <Route path='/petition' component={PetitionRoutes} />

              <Route path='/teste_selectors' component={TesteSelectors} />

              <Route component={NotFound} />
            </Switch>

            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
