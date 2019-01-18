import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import {
  validateDateRequired,
  validateNumberRequired,
  validateProcessCallForm
} from "../../validation";

import { createProcess, createProcessCall } from "../../actions/processActions";

class CallCreate extends Component {
  constructor() {
    super();
    this.state = {
      number: "",
      inscriptionsStart: "",
      inscriptionsEnd: "",
      callEnd: "",

      //errors
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      let errors = nextProps.errors;
      this.setState({ errors: errors });
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };
    switch (e.target.name) {
      case "number":
        valResult = validateNumberRequired(e.target.value);
        break;
      case "inscriptionsStart":
        valResult = validateDateRequired(e.target.value);
        break;
      case "inscriptionsEnd":
        valResult = validateDateRequired(e.target.value);
        break;
      case "callEnd":
        valResult = validateDateRequired(e.target.value);
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

  onSubmit(e) {
    e.preventDefault();

    const callData = {
      selectiveProcess_id: this.props.match.params.id,
      number: this.state.number,
      inscriptionsStart: this.state.inscriptionsStart,
      inscriptionsEnd: this.state.inscriptionsEnd,
      callEnd: this.state.callEnd
    };

    const valCall = validateProcessCallForm(callData);
    if (!valCall.isValid) {
      this.setState({ errors: valCall.errors });
    } else {
      console.log("ready to go!");
      console.log(callData);
      //this.props.createProcess(processData, this.props.history);
      this.props.createProcessCall(callData, this.props.history);
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/processes/${this.props.match.params.id}`}
                className="btn btn-light"
              >
                Voltar para o processo
              </Link>
              <h1 className="display-4 text-center">Criar chamada</h1>
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

                <h6>Início das inscrições</h6>
                <TextFieldGroup
                  placeholder="Início das inscrições"
                  type="date"
                  name="inscriptionsStart"
                  value={this.state.inscriptionsStart}
                  onChange={this.onChange}
                  error={errors.inscriptionsStart}
                />

                <h6>Encerramento das inscrições</h6>
                <TextFieldGroup
                  placeholder="Encerramento das inscrições"
                  type="date"
                  name="inscriptionsEnd"
                  value={this.state.inscriptionsEnd}
                  onChange={this.onChange}
                  error={errors.inscriptionsEnd}
                />

                <h6>Final da chamada</h6>
                <TextFieldGroup
                  placeholder="Encerramento da chamada"
                  type="date"
                  name="callEnd"
                  value={this.state.callEnd}
                  onChange={this.onChange}
                  error={errors.callEnd}
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

// "registerUser" and "auth" are required to the Register component
CallCreate.proptypes = {
  createProcessCall: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

//Put redux store data on props
const mapStateToProps = state => ({
  errors: state.errors
});

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  { createProcess, createProcessCall }
)(withRouter(CallCreate));
