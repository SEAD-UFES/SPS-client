import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import {
//   getCurrentProfile , deleteAccount
// } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
//import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    //this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    e.preventDefault();
    console.log("delete");
    //this.props.deleteAccount();
  }

  render() {
    //const { user } = this.props.auth;
    //const { profile, loading } = this.props.profile;

    const { user } = { user: { name: "Fernando" } };
    const { profile, loading } = {
      profile: { handle: "fernando" },
      loading: false
    };

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Bem-vindo <Link to={"/profile"}>{user.name}</Link>
            </p>
          </div>
        );
      } else {
        //User login in but dont have a profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Bem-vindo {user.name}</p>
            <p>You have no yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  //getCurrentProfile: PropTypes.func.isRequired,
  //deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    //getCurrentProfile
    //deleteAccount
  }
)(Dashboard);
