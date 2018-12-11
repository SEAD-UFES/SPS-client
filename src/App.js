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
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/profile/Dashboard";
import Profile from "./components/profile/Profile";
import ProfileEditUser from "./components/profile/ProfileEditUser";
import ProfileEditPerson from "./components/profile/ProfileEditPerson";
import Users from "./components/users/Users";
import UserProfile from "./components/users/UserProfile";
import UserEditUser from "./components/users/UserEditUser";
import UserEditPerson from "./components/users/UserEditPerson";
import UserCreate from "./components/users/UserCreate";

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

    //redirect to login page
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/profile" component={Profile} />
            <Route
              exact
              path="/profile/edit-user"
              component={ProfileEditUser}
            />
            <Route
              exact
              path="/profile/edit-person"
              component={ProfileEditPerson}
            />
            <Route exact path="/users" component={Users} />
            <Switch>
              <Route exact path="/users/create" component={UserCreate} />
              <Route exact path="/users/:id" component={UserProfile} />
            </Switch>
            <Route exact path="/users/:id/edit-user" component={UserEditUser} />
            <Route
              exact
              path="/users/:id/edit-person"
              component={UserEditPerson}
            />

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
