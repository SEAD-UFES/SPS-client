import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { permissionCheck } from "components/profile/permissionCheck";
import NotAllowed from "./NotAllowed";

const PrivateRoute = ({ component: Component, permission, authStore, profileStore, options = {}, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (authStore.isAuthenticated === true) {
        if (!permission) {
          return <Component {...props} />;
        } else {
          //checar permissão
          const { profile, loading } = profileStore;
          if (profile === null || loading) {
            return null;
          } else {
            if (permissionCheck(profile.UserRoles, permission, { course_id: options.course_id, anyCourse: options.anyCourse })) {
              return <Component {...props} />;
            } else {
              return <NotAllowed />;
            }
          }
        }
      } else {
        return <Redirect to={{ pathname: "/login", prevLocation: { from: props.location } }} />;
      }
    }}
  />
);

PrivateRoute.propTypes = {
  authStore: PropTypes.object.isRequired,
  profileStore: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authStore: state.authStore,
  profileStore: state.profileStore
});

export default connect(
  mapStateToProps,
  {}
)(PrivateRoute);
