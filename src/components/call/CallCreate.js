import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import { validateNumberRequired, validateCallForm, validateEnrollmentOpeningDate, validateEnrollmentClosingDate, validateEndingDate } from "../../validation";

import { createCall } from "./callActions";

class CallCreate extends Component {
  constructor() {
    super();
    this.state = {
      number: "",
      enrollmentOpeningDate: "",
      enrollmentClosingDate: "",
      endingDate: "",

      //errors
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      case "number":
        valResult = validateNumberRequired(e.target.value);
        break;
      case "enrollmentOpeningDate":
        valResult = validateEnrollmentOpeningDate(e.target.value, this.state.enrollmentClosingDate, this.state.endingDate);
        //Removing errors from enrollmentClosingDate if needed
        if (errors.enrollmentClosingDate) {
          let InsEndVal = validateEnrollmentClosingDate(e.target.value, this.state.enrollmentClosingDate, this.state.endingDate);
          if (!InsEndVal.isValid) {
            errors = { ...errors, enrollmentClosingDate: InsEndVal.error };
          } else {
            delete errors.enrollmentClosingDate;
          }
        }
        //Removing errors from endingDate if needed
        if (errors.endingDate) {
          let endingDateVal = validateEnrollmentClosingDate(e.target.value, this.state.enrollmentClosingDate, this.state.endingDate);
          if (!endingDateVal.isValid) {
            errors = { ...errors, endingDate: endingDateVal.error };
          } else {
            delete errors.endingDate;
          }
        }
        break;
      case "enrollmentClosingDate":
        valResult = validateEnrollmentClosingDate(this.state.enrollmentOpeningDate, e.target.value, this.state.endingDate);
        //Removing errors from enrollmentOpeningDate if needed
        if (errors.enrollmentOpeningDate) {
          let InsStartVal = validateEnrollmentOpeningDate(this.state.enrollmentOpeningDate, e.target.value, this.state.endingDate);
          if (!InsStartVal.isValid) {
            errors = { ...errors, enrollmentOpeningDate: InsStartVal.error };
          } else {
            delete errors.enrollmentOpeningDate;
          }
        }
        //Removing errors from endingDate if needed
        if (errors.endingDate) {
          let endingDateVal = validateEnrollmentClosingDate(this.state.enrollmentOpeningDate, e.target.value, this.state.endingDate);
          if (!endingDateVal.isValid) {
            errors = { ...errors, endingDate: endingDateVal.error };
          } else {
            delete errors.endingDate;
          }
        }
        break;
      case "endingDate":
        valResult = validateEndingDate(this.state.enrollmentOpeningDate, this.state.enrollmentClosingDate, e.target.value);
        //Removing errors from enrollmentOpeningDate if needed
        if (errors.enrollmentOpeningDate) {
          let InsStartVal = validateEnrollmentOpeningDate(this.state.enrollmentOpeningDate, this.state.enrollmentClosingDate, e.target.value);
          if (!InsStartVal.isValid) {
            errors = { ...errors, enrollmentOpeningDate: InsStartVal.error };
          } else {
            delete errors.enrollmentOpeningDate;
          }
        }
        //Removing errors from enrollmentClosingDate if needed
        if (errors.enrollmentClosingDate) {
          let InsEndVal = validateEnrollmentClosingDate(this.state.enrollmentOpeningDate, this.state.enrollmentClosingDate, e.target.value);
          if (!InsEndVal.isValid) {
            errors = { ...errors, enrollmentClosingDate: InsEndVal.error };
          } else {
            delete errors.enrollmentClosingDate;
          }
        }
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

    const tmpCallData = {
      selectiveProcess_id: this.props.match.params.id,
      number: this.state.number,
      enrollmentOpeningDate: this.state.enrollmentOpeningDate,
      enrollmentClosingDate: this.state.enrollmentClosingDate,
      endingDate: this.state.endingDate
      //course_id for permissions
      //course_id: ""
    };

    const valCall = validateCallForm(tmpCallData);
    if (!valCall.isValid) {
      this.setState({ errors: valCall.errors });
    } else {
      const callData = {
        selectiveProcess_id: this.props.match.params.id,
        number: tmpCallData.number,
        enrollmentOpeningDate: tmpCallData.enrollmentOpeningDate,
        enrollmentClosingDate: tmpCallData.enrollmentClosingDate,
        endingDate: tmpCallData.endingDate
        //course_id for permissions
        //course_id: ""
      };

      this.props.createCall(callData, this.props.history);
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/processes/${this.props.match.params.id}`} className="btn btn-light">
                Voltar para o processo
              </Link>
              <h1 className="display-4 text-center">Criar chamada</h1>
              <p className="lead text-center">Dê entrada nos dados básicos</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup type="text" name="number" placeholder="* Número" value={this.state.number} onChange={this.onChange} error={errors.number} />

                <h6>Início das inscrições</h6>
                <TextFieldGroup
                  placeholder="Início das inscrições"
                  type="date"
                  name="enrollmentOpeningDate"
                  value={this.state.enrollmentOpeningDate}
                  onChange={this.onChange}
                  error={errors.enrollmentOpeningDate}
                />

                <h6>Encerramento das inscrições</h6>
                <TextFieldGroup
                  placeholder="Encerramento das inscrições"
                  type="date"
                  name="enrollmentClosingDate"
                  value={this.state.enrollmentClosingDate}
                  onChange={this.onChange}
                  error={errors.enrollmentClosingDate}
                />

                <h6>Final da chamada</h6>
                <TextFieldGroup
                  placeholder="Encerramento da chamada"
                  type="date"
                  name="endingDate"
                  value={this.state.endingDate}
                  onChange={this.onChange}
                  error={errors.endingDate}
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

CallCreate.proptypes = {
  createCall: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

//Put redux store data on props
const mapStateToProps = state => ({
  errors: state.errorStore
});

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  { createCall }
)(withRouter(CallCreate));
