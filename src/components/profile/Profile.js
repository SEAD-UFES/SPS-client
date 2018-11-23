import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
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

    const { user } = { user: { name: "Fernando", surname: "Annecchini" } };
    const { profile, loading } = {
      profile: {
        user: {
          email: "fernando.void@gmail.com",
          active: true
        },
        person: {
          name: "Fernando",
          surname: "Annecchini",
          birthdate: "07/11/1980",
          cpf: "088.402.807-07",
          nationality: "Brasileiro",
          rgNumber: "1.688.122",
          rgExpeditor: "SSP-ES",
          color: "Pardo",
          gender: "Masculino",
          civilState: "Casado"
        }
      },
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
              {profile.person.name} {profile.person.surname}
            </p>

            {/* <!-- Profile Actions --> */}
            <div className="btn-group mb-4" role="group">
              <Link to="/profile/edit-user" className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1" /> Editar dados
                de acesso
              </Link>
              <Link to="/profile/edit-person" className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1" /> Editar dados
                pessoais
              </Link>
            </div>

            {/* <!-- User data --> */}
            <div>
              <h4 className="mb-2">Dados de usuário</h4>

              <div className="row">
                <div className="col-md-2">
                  <p>
                    <strong>Login/Email:</strong>
                  </p>
                </div>
                <div className="col-md-10">
                  <p>{profile.user.email}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <p>
                    <strong>Status:</strong>
                  </p>
                </div>
                <div className="col-md-10">
                  <p>{profile.user.active ? "Conta Ativa" : "Conta inativa"}</p>
                </div>
              </div>
            </div>

            {/* <!-- Person Data --> */}
            <div>
              <h4 className="mb-2">Dados de pessoais</h4>

              <div className="row">
                <div className="col-md-2">
                  <p>
                    <strong>Nome/Sobrenome:</strong>
                  </p>
                </div>
                <div className="col-md-10">
                  <p>
                    {profile.person.name} {profile.person.surname}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <p>
                    <strong>Data de Nascimento:</strong>
                  </p>
                </div>
                <div className="col-md-10">
                  <p>{profile.person.birthdate}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <p>
                    <strong>CPF:</strong>
                  </p>
                </div>
                <div className="col-md-10">
                  <p>{profile.person.cpf}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <p>
                    <strong>Nacionalidade:</strong>
                  </p>
                </div>
                <div className="col-md-10">
                  <p>{profile.person.nationality}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <p>
                    <strong>RG(Número/Expeditor):</strong>
                  </p>
                </div>
                <div className="col-md-10">
                  <p>
                    {profile.person.rgNumber} - {profile.person.rgExpeditor}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <p>
                    <strong>Cor:</strong>
                  </p>
                </div>
                <div className="col-md-10">
                  <p>{profile.person.color}</p>
                </div>
              </div>

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

              <div className="row">
                <div className="col-md-2">
                  <p>
                    <strong>Estado Civil:</strong>
                  </p>
                </div>
                <div className="col-md-10">
                  <p>{profile.person.civilState}</p>
                </div>
              </div>
            </div>
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

Dashboard.propTypes = {
  //getCurrentProfile: PropTypes.func.isRequired,
  //deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  //profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    /*getCurrentProfile, deleteAccount*/
  }
)(Dashboard);
