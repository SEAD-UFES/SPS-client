//Default react app imports
//import logo from "./logo.svg";
import React, { Component } from "react";
import "./App.css";

//Library imports
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

//Local imports
import store from "./store/store"; //Importa o store criado nesse arquivo.
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./components/auth/authActions";
import { clearCurrentProfile } from "./components/profile/profileActions";
import PrivateRoute from "./components/common/PrivateRoute";

//Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/profile/Dashboard";

//Route components
import ProfileRoutes from "./components/profile/ProfileRoutes";
import UserRoutes from "./components/user/UserRoutes";
import ProcessRoutes from "./components/process/ProcessRoutes";
import ParameterRoutes from "./components/parameter/ParameterRoutes";
import RoleTypeRoutes from "./components/roleType/RoleTypeRoutes";
import UserRoleRoutes from "./components/userRole/UserRoleRoutes";

//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  //decode token
  const decoded = jwt_decode(localStorage.jwtToken);

  //dispath action to set user and profile on store
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //clear current profile
    store.dispatch(clearCurrentProfile());

    //logout user
    store.dispatch(logoutUser());

    //redirect to login page (replaced by PrivateRoute)
    //window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <Switch>
              <Route exact path="/" component={Landing} />

              <Route exact path="/register" component={Register} />

              <Route exact path="/login" component={Login} />

              <PrivateRoute exact path="/dashboard" component={Dashboard} />

              <PrivateRoute path="/profile" component={ProfileRoutes} />

              <PrivateRoute path="/users" component={UserRoutes} />

              <Route path="/processes" component={ProcessRoutes} />

              <PrivateRoute path="/parameters" component={ParameterRoutes} />

              <PrivateRoute path="/roletypes" component={RoleTypeRoutes} />

              <PrivateRoute path="/roleassignments" component={UserRoleRoutes} />
            </Switch>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
