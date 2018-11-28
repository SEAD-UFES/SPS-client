import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";
import {
  validateEmailRequired,
  validatePassword,
  validatePasswordCheck,
  validateProfileEditUserForm,
  isEmpty
} from "../../validation";
import {
  getCurrentProfile,
  updateProfileUser
} from "../../actions/profileActions";
import { clearErrors } from "../../actions/errorActions";

class ProfileEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      changePassword: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    //tratando errors do servidor
    if (nextProps.errors) {
      let errors = { ...this.props.errors };
      if (nextProps.errors.code === "users-06") {
        errors.email = nextProps.errors.userMessage;
      }

      this.setState({ errors: errors });
    }

    //(Preenchendo / Atualizando) dados do formulario
    if (isEmpty(nextProps.errors) && nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const login = !isEmpty(profile.user.login) ? profile.user.login : "";

      //Set state
      this.setState({
        email: login
      });
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };
    switch (e.target.name) {
      case "email":
        valResult = validateEmailRequired(e.target.value);
        break;
      case "password":
        valResult = validatePassword(e.target.value);
        //validate the field password Check to
        let pass2Val = validatePasswordCheck(
          this.state.password2,
          e.target.value
        );
        if (!pass2Val.isValid) {
          errors = { ...errors, password2: pass2Val.error };
        } else {
          delete errors.password2;
        }
        break;
      case "password2":
        valResult = validatePasswordCheck(e.target.value, this.state.password);
        break;
      default:
        break;
    }

    if (!valResult.isValid) {
      errors = { ...errors, [e.target.name]: valResult.error };
    } else {
      delete errors[e.target.name];
    }

    //Atualizando os estados do campos e dos erros
    this.setState({
      [e.target.name]: e.target.value,
      errors: errors
    });
  }

  onCheck(e) {
    //validação local dos campos
    const changePassword = !this.state.changePassword;
    let errors = this.state.errors;
    switch (e.target.name) {
      case "changePassword":
        if (changePassword) {
          //validate password
          if (this.state.password || this.state.password2) {
            let passVal = validatePassword(this.state.password);
            if (!passVal.isValid) {
              errors = { ...errors, password: passVal.error };
            } else {
              delete errors.password2;
            }
          }
          //validate password2
          if (this.state.password || this.state.password2) {
            let pass2Val = validatePasswordCheck(
              this.state.password2,
              this.state.password
            );
            if (!pass2Val.isValid) {
              errors = { ...errors, password2: pass2Val.error };
            } else {
              delete errors.password2;
            }
          }
        } else {
          delete errors.password;
          delete errors.password2;
        }
        break;
      default:
        break;
    }

    this.setState({
      [e.target.name]: !this.state[e.target.name],
      errors: errors
    });
  }

  onSubmit(e) {
    e.preventDefault();

    //Validação final do formulário
    const userData = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      changePassword: this.state.changePassword
    };
    const valProfileUserEdit = validateProfileEditUserForm(userData);

    //Executar o resultado da validação
    if (!valProfileUserEdit.isValid) {
      this.setState({ errors: valProfileUserEdit.errors });
    } else {
      let updateUserData = {
        login: this.state.email
      };
      if (this.state.changePassword) {
        updateUserData.password = this.state.password;
      }

      const profile = this.props.profile.profile;

      this.props.updateProfileUser(
        profile.user.id,
        updateUserData,
        this.props.history
      );
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="profile-edit-user">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/profile" className="btn btn-light">
                Voltar para perfil
              </Link>
              <h1 className="display-4 text-center">Editar perfil</h1>
              <p className="lead text-center">
                Atualize suas informações de acesso
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Endereço de email"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="Email principal para comunicação e acesso a plataforma"
                />

                <TextFieldGroup
                  placeholder="* Senha"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                  disabled={!this.state.changePassword}
                />

                <TextFieldGroup
                  placeholder="* Repita a senha"
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                  disabled={!this.state.changePassword}
                />

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="changePassword"
                    id="changePassword"
                    checked={this.state.changePassword}
                    onChange={this.onCheck}
                  />
                  <label className="form-check-label" htmlFor="changePassword">
                    Atualizar senha
                  </label>
                </div>

                <input
                  value="Enviar"
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileEditUser.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  updateProfileUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, updateProfileUser, clearErrors }
)(withRouter(ProfileEditUser));
