import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import {
  validateStepType_id,
  validateResultDate,
  validateOpenAppealDate,
  validateLimitAppealDate,
  validateResultAfterAppealDate,
  validateProcessCallStepForm
} from "../../validation";

import {
  getStepOptions,
  createProcessCallStep
} from "../../actions/processActions";
import { clearErrors } from "../../actions/errorActions";

class StepCreate extends Component {
  constructor() {
    super();
    this.state = {
      //Step data
      stepType_id: "",
      resultDate: "",
      openAppealDate: "",
      limitAppealDate: "",
      resultAfterAppealDate: "",

      //errors
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
    this.props.getStepOptions();
  }

  componentWillReceiveProps(nextProps) {
    //If receive errors from server
    if (nextProps.errors) {
      let errors = nextProps.errors;

      let newStateErrors = {};

      switch (errors.code) {
        case "calls-05":
          newStateErrors.endingDate = errors.userMessage;
          break;
        default:
          break;
      }

      this.setState({ errors: newStateErrors });
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };

    switch (e.target.name) {
      case "stepType_id":
        valResult = validateStepType_id(e.target.value);
        break;
      case "resultDate":
        valResult = validateResultDate(
          e.target.value,
          this.state.openAppealDate,
          this.state.limitAppealDate,
          this.state.resultAfterAppealDate
        );
        break;
      case "openAppealDate":
        valResult = validateOpenAppealDate(
          this.state.resultDate,
          e.target.value,
          this.state.limitAppealDate,
          this.state.resultAfterAppealDate
        );
        break;
      case "limitAppealDate":
        valResult = validateLimitAppealDate(
          this.state.resultDate,
          this.state.openAppealDate,
          e.target.value,
          this.state.resultAfterAppealDate
        );
        break;
      case "resultAfterAppealDate":
        valResult = validateResultAfterAppealDate(
          this.state.resultDate,
          this.state.openAppealDate,
          this.state.limitAppealDate,
          e.target.value
        );
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

    const StepData = {
      call_id: this.props.match.params.call_id,
      stepType_id: this.state.stepType_id,
      resultDate: this.state.resultDate,
      openAppealDate: this.state.openAppealDate,
      limitAppealDate: this.state.limitAppealDate,
      resultAfterAppealDate: this.state.resultAfterAppealDate
    };

    const valStep = validateProcessCallStepForm(StepData);
    if (!valStep.isValid) {
      this.setState({ errors: valStep.errors });
    } else {
      this.props.createProcessCallStep(
        StepData,
        this.props.match.params.process_id,
        this.props.history
      );
    }
  }

  render() {
    const { errors } = this.state;

    const steptypeOptions = [
      { label: "Escolha o tipo de etapa", value: "" }
    ].concat(
      this.props.options
        ? this.props.options.map(steptype => {
            return {
              label: steptype.name,
              value: steptype.id
            };
          })
        : []
    );

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/processes/${this.props.match.params.process_id}`}
                className="btn btn-light"
              >
                Voltar para o processo
              </Link>
              <h1 className="display-4 text-center">Criar etapa</h1>
              <p className="lead text-center">Dê entrada nos dados básicos</p>
              <form noValidate onSubmit={this.onSubmit}>
                <SelectListGroup
                  placeholder="Escolha o tipo de etapa"
                  name="stepType_id"
                  value={this.state.stepType_id}
                  options={steptypeOptions}
                  onChange={this.onChange}
                  error={errors.stepType_id}
                />

                <h6>Previsão de resultado da etapa</h6>
                <TextFieldGroup
                  placeholder="Previsão de resultado da etapa"
                  type="date"
                  name="resultDate"
                  value={this.state.resultDate}
                  onChange={this.onChange}
                  error={errors.resultDate}
                />

                <h6>Início do periodo de recursos</h6>
                <TextFieldGroup
                  placeholder="Início do periodo de recursos"
                  type="date"
                  name="openAppealDate"
                  value={this.state.openAppealDate}
                  onChange={this.onChange}
                  error={errors.openAppealDate}
                />

                <h6>Fim do periodo de recursos</h6>
                <TextFieldGroup
                  placeholder="Fim do periodo de recursos"
                  type="date"
                  name="limitAppealDate"
                  value={this.state.limitAppealDate}
                  onChange={this.onChange}
                  error={errors.limitAppealDate}
                />

                <h6>Previsão de resultado pós recursos</h6>
                <TextFieldGroup
                  placeholder="Previsão de resultado pós recursos"
                  type="date"
                  name="resultAfterAppealDate"
                  value={this.state.resultAfterAppealDate}
                  onChange={this.onChange}
                  error={errors.resultAfterAppealDate}
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
StepCreate.proptypes = {
  createProcessCallStep: PropTypes.func.isRequired,
  getStepOptions: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

//Put redux store data on props
const mapStateToProps = state => ({
  errors: state.errors,
  options: state.process.options
});

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  { createProcessCallStep, getStepOptions, clearErrors }
)(withRouter(StepCreate));
