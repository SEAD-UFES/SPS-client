import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, authStore, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (authStore.isAuthenticated === true) {
        return <Component {...props} />;
      } else {
        return <Redirect to={{ pathname: "/login", prevLocation: { from: props.location } }} />;
      }
    }}
  />
);

PrivateRoute.propTypes = {
  authStore: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authStore: state.authStore
});

export default connect(
  mapStateToProps,
  {}
)(PrivateRoute);
