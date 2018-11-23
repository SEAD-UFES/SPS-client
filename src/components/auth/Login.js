import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loginUser } from "../../actions/authActions";
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
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      login: this.state.login,
      password: this.state.password
    };
    console.log(userData);
    //this.props.loginUser(userData);
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
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  //errors: PropTypes.object.isRequired
};

//Put redux store data on props
const mapStateToProps = state => ({
  auth: state.auth //last auth because the auth on root reducer?
  //errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
