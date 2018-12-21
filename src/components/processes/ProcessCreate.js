import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import {
  validateProcessNumber,
  validateYearRequired,
  validateDescription,
  validateProcessForm
} from "../../validation";

import { createUser } from "../../actions/userActions";
import { createProcess } from "../../actions/processActions";

class ProcessCreate extends Component {
  constructor() {
    super();
    this.state = {
      number: "",
      year: "",
      description: "",
      visible: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      let errors = nextProps.errors.devMessage;
      errors.email = nextProps.errors.devMessage.login;
      delete errors.login;

      this.setState({ errors: errors });
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };
    switch (e.target.name) {
      case "number":
        valResult = validateProcessNumber(e.target.value);
        break;
      case "year":
        valResult = validateYearRequired(e.target.value);
        break;
      case "description":
        valResult = validateDescription(e.target.value);
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
    let errors = this.state.errors;
    switch (e.target.name) {
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

    const processData = {
      number: this.state.number,
      year: this.state.year,
      description: this.state.description,
      visible: this.state.visible
    };

    const valProcess = validateProcessForm(processData);
    if (!valProcess.isValid) {
      this.setState({ errors: valProcess.errors });
    } else {
      console.log(processData);
      this.props.createProcess(processData, this.props.history);
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/processes" className="btn btn-light">
                Voltar lista de processos
              </Link>
              <h1 className="display-4 text-center">Criar processo</h1>
              <p className="lead text-center">Dê entrada nos dados básicos</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  name="number"
                  placeholder="* Número"
                  value={this.state.number}
                  onChange={this.onChange}
                  error={errors.number}
                />

                <TextFieldGroup
                  type="text"
                  name="year"
                  placeholder="* Ano"
                  value={this.state.year}
                  onChange={this.onChange}
                  error={errors.year}
                />

                <TextAreaFieldGroup
                  placeholder="* Descrição"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Apresentação básica do processo seletivo"
                />

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="visible"
                    id="visible"
                    checked={this.state.visible}
                    onChange={this.onCheck}
                  />
                  <label className="form-check-label" htmlFor="visible">
                    Tornar processo visível
                  </label>
                </div>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// "registerUser" and "auth" are required to the Register component
ProcessCreate.proptypes = {
  registerUser: PropTypes.func.isRequired,
  createProcess: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//Put redux store data on props
const mapStateToProps = state => ({
  auth: state.auth, //last auth because the auth on root reducer?
  errors: state.errors
});

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  { createUser, createProcess }
)(withRouter(ProcessCreate));
