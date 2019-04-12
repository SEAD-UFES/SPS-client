import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { getCurrentProfile } from "./profileActions";
import Spinner from "../common/Spinner";

class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    e.preventDefault();
    console.log("delete");
    //this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    const userData =
      profile === null || profile.loading ? (
        <Spinner />
      ) : (
        <div>
          <h4 className="mb-3">Dados de usuário</h4>

          <div className="row">
            <div className="col-md-3">
              <p>
                <strong>Login/Email:</strong>
              </p>
            </div>
            <div className="col-md-9">
              <p>{profile.login}</p>
            </div>
          </div>
        </div>
      );

    const personData =
      profile === null || profile.loading ? (
        <Spinner />
      ) : profile.Person ? (
        <div>
          <h4 className="mb-3">Dados de pessoais</h4>

          <div className="row">
            <div className="col-md-3">
              <p>
                <strong>Nome / Sobrenome:</strong>
              </p>
            </div>
            <div className="col-md-9">
              <p>
                {profile.person.name} {profile.person.surname}
              </p>
            </div>
          </div>

          {profile.person.birthdate ? (
            <div className="row">
              <div className="col-md-3">
                <p>
                  <strong>Data de Nascimento:</strong>
                </p>
              </div>
              <div className="col-md-9">
                <p>{moment(profile.person.birthdate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="row">
            <div className="col-md-3">
              <p>
                <strong>CPF:</strong>
              </p>
            </div>
            <div className="col-md-9">
              <p>{profile.person.cpf}</p>
            </div>
          </div>

          {profile.person.nationality ? (
            <div className="row">
              <div className="col-md-3">
                <p>
                  <strong>Nacionalidade:</strong>
                </p>
              </div>
              <div className="col-md-9">
                <p>{profile.person.nationality}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {profile.person.rgNumber ? (
            <div className="row">
              <div className="col-md-3">
                <p>
                  <strong>RG (Número / Expeditor):</strong>
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  {profile.person.rgNumber} - {profile.person.rgDispatcher}
                </p>
              </div>
            </div>
          ) : (
            ""
          )}

          {profile.person.ethnicity ? (
            <div className="row">
              <div className="col-md-2">
                <p>
                  <strong>Cor:</strong>
                </p>
              </div>
              <div className="col-md-10">
                <p>{profile.person.ethnicity}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {profile.person.gender ? (
            <div className="row">
              <div className="col-md-2">
                <p>
                  <strong>Sexo:</strong>
                </p>
              </div>
              <div className="col-md-10">
                <p>{profile.person.gender}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {profile.person.civilStatus ? (
            <div className="row">
              <div className="col-md-2">
                <p>
                  <strong>Estado Civil:</strong>
                </p>
              </div>
              <div className="col-md-10">
                <p>{profile.person.civilStatus}</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>
          <h4 className="mb-3">Dados de pessoais</h4>
          <p>Usuário ainda não possui dados pessoais</p>
        </div>
      );

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">{profile.person ? profile.person.name + " " + profile.person.surname : profile.login}</p>

            {/* <!-- Profile Actions --> */}
            <div className="btn-group mb-4" role="group">
              <Link to="/profile/edit-user" className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1" /> Editar dados de acesso
              </Link>
              <Link to="/profile/edit-person" className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1" /> Editar dados pessoais
              </Link>
            </div>

            {userData}

            {personData}
          </div>
        );
      } else {
        //User login in but dont have a profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Bem-vindo{user.person.name}</p>
            <p>Dados de perfil não localizados</p>
          </div>
        );
      }
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Perfil</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  //deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile
  }
)(Profile);
