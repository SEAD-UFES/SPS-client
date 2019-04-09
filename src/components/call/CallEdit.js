import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import moment from "moment";

import TextFieldGroup from "../common/TextFieldGroup";
import {
  isEmpty,
  validateNumberRequired,
  validateProcessCallForm,
  validateEnrollmentOpeningDate,
  validateEnrollmentClosingDate,
  validateEndingDate
} from "../../validation";

import { createProcessCall, getCall, updateProcessCall } from "../../actions/processActions";
import { clearErrors } from "../../actions/errorActions";

class CallEdit extends Component {
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

  componentDidMount() {
    this.props.clearErrors();
    if (this.props.match.params.call_id) {
      this.props.getCall(this.props.match.params.call_id);
    }
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

    //(Preenchendo / Atualizando) dados do formulario
    if (isEmpty(nextProps.errors) && nextProps.process.call) {
      const call = nextProps.process.call;
      this.setState({
        number: call.number,
        enrollmentOpeningDate: moment(call.enrollmentOpeningDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD"),
        enrollmentClosingDate: moment(call.enrollmentClosingDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD"),
        endingDate: moment(call.endingDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")
      });
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

    const callData = {
      selectiveProcess_id: this.props.match.params.process_id,
      number: this.state.number,
      enrollmentOpeningDate: this.state.enrollmentOpeningDate,
      enrollmentClosingDate: this.state.enrollmentClosingDate,
      endingDate: this.state.endingDate
    };

    const valCall = validateProcessCallForm(callData);
    if (!valCall.isValid) {
      this.setState({ errors: valCall.errors });
    } else {
      this.props.updateProcessCall(this.props.match.params.call_id, callData, this.props.history);
    }
  }

  render() {
    const { errors } = this.state;

    const deleteButton = (
      <div className="text-right mt-2 mb-2">
        <Link
          className="text-danger"
          to={{
            pathname: `/processes/${this.props.match.params.process_id}/calls/${this.props.match.params.call_id}/delete`
          }}
        >
          <i className="fas fa-times-circle" /> Excluir chamada
        </Link>
      </div>
    );

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/processes/${this.props.match.params.process_id}`} className="btn btn-light">
                Voltar para o processo
              </Link>
              <h1 className="display-4 text-center">Editar chamada</h1>
              <p className="lead text-center">Altere os dados da chamada</p>
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
              {deleteButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// "registerUser" and "auth" are required to the Register component
CallEdit.proptypes = {
  createProcessCall: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

//Put redux store data on props
const mapStateToProps = state => ({
  errors: state.errors,
  process: state.process
});

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  { createProcessCall, getCall, updateProcessCall, clearErrors }
)(withRouter(CallEdit));