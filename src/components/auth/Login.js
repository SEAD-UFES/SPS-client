import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loginUser } from "./authActions";
import { getCurrentProfile } from "../profile/profileActions";
import { clearErrors } from "../../actions/errorActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.clearErrors();
      if (this.props.location.prevLocation) {
        this.props.history.push(this.props.location.prevLocation.from.pathname);
      } else {
        this.props.history.push("/dashboard");
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.clearErrors();
      if (this.props.location.prevLocation) {
        this.props.history.push(this.props.location.prevLocation.from.pathname);
      } else {
        this.props.history.push("/dashboard");
      }
    }

    //Tratando errors de autenticação do servidor.
    if (nextProps.errors.code) {
      let errors = {};

      switch (nextProps.errors.code) {
        case "auth-01":
          errors.login = "Token de acesso expirado";
          break;
        case "auth-02":
          errors.login = "Ocorreu uma falha na autenticação";
          break;
        case "auth-03":
          errors.login = "Requisição Inválida.";
          break;
        case "auth-04":
          errors.login = "Login não encontrado ou senha inválida";
          break;
        case "auth-05":
          errors.login = "Login não encontrado ou senha inválida";
          break;
        case "auth-06":
          errors.login = "Erro interno no servidor, contate os administradores.";
          break;
        case "auth-07":
          errors.login = "A autenticação falhou.";
          break;
        case "auth-08":
          errors.login = "Você não tem permissão para acessar este recurso.";
          break;
        case "auth-09":
          errors.login = "Usuário não autorizado, contate os administradores.";
          break;
        default:
          errors.login = "Erro não catalogado, contate os administradores.";
          break;
      }

      this.setState({ errors: errors });
    }
  }

  onChange(e) {
    //validação do campo login
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };
    switch (e.target.name) {
      case "login":
        valResult = { error: "", isValid: true };
        break;
      case "password":
        valResult = { error: "", isValid: true };
        break;
      default:
        break;
    }

    if (!valResult.isValid) {
      errors = { ...errors, login: valResult.error };
    } else {
      delete errors.login;
    }

    //Atualizando os estados do campos e dos erros
    this.setState({
      [e.target.name]: e.target.value,
      errors: errors
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      login: this.state.login,
      password: this.state.password
    };
    this.props.clearErrors();
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <p className="lead text-center">Acesse sua conta</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  name="login"
                  placeholder="Endereço de email"
                  value={this.state.login}
                  onChange={this.onChange}
                  error={errors.login}
                />
                <TextFieldGroup
                  type="password"
                  name="password"
                  placeholder="Senha"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// "loginUser" and "auth" are required to the Login component
Login.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//Put redux store data on props
const mapStateToProps = state => ({
  auth: state.auth, //last auth because the auth on root reducer?
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, getCurrentProfile, clearErrors }
)(Login);
