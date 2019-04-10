import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { isEmpty } from "../../validation";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

import { validateAssignment_id, validateProcessCallVacancyForm, validateNumberRequired } from "../../validation";

import {
  getAssignmentOptions,
  getRestrictionsOptions,
  getRegionsOptions,
  createProcessCallVacancy,
  getVacancy,
  updateProcessCallVacancy
} from "../process/processActions";
import { clearErrors } from "../../actions/errorActions";

class VacancyEdit extends Component {
  constructor() {
    super();
    this.state = {
      //Vacancy data
      assignment_id: "",
      region_id: "",
      restriction_id: "",
      qtd: "",
      reserve: true,

      //errors
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
    this.props.getAssignmentOptions();
    this.props.getRestrictionsOptions();
    this.props.getRegionsOptions();
    if (this.props.match.params.vacancy_id) {
      this.props.getVacancy(this.props.match.params.vacancy_id);
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

    //load the paramenters on screen
    if (isEmpty(nextProps.errors) && nextProps.vacancy) {
      const vacancy = nextProps.vacancy;
      this.setState({
        assignment_id: vacancy.assignment_id,
        region_id: vacancy.region_id ? vacancy.region_id : "",
        restriction_id: vacancy.restriction_id ? vacancy.restriction_id : "",
        qtd: `${vacancy.qtd}`,
        reserve: true
      });
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };

    switch (e.target.name) {
      case "assignment_id":
        valResult = validateAssignment_id(e.target.value);
        break;
      case "region_id":
        break;
      case "restriction_id":
        break;
      case "qtd":
        valResult = validateNumberRequired(e.target.value);
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
      case "reserve":
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

    const vacancyData = {
      call_id: this.props.match.params.call_id,
      assignment_id: this.state.assignment_id,
      region_id: this.state.region_id ? this.state.region_id : null,
      restriction_id: this.state.restriction_id ? this.state.restriction_id : null,
      qtd: this.state.qtd,
      reserve: this.state.reserve
    };

    const valVacancy = validateProcessCallVacancyForm(vacancyData);
    if (!valVacancy.isValid) {
      this.setState({ errors: valVacancy.errors });
    } else {
      this.props.updateProcessCallVacancy(this.props.match.params.process_id, this.props.match.params.vacancy_id, vacancyData, this.props.history);
    }
  }

  render() {
    const { errors } = this.state;
    const { assignments, restrictions, regions } = this.props;

    const assignmentOptions = [{ label: "* Selecione a atribuição", value: "" }].concat(
      assignments
        ? assignments.map(assignment => {
            return {
              label: assignment.name,
              value: assignment.id
            };
          })
        : []
    );

    const restrictionsOptions = [{ label: "Selecione a restrição (opcional)", value: "" }].concat(
      restrictions
        ? restrictions.map(restriction => {
            return {
              label: restriction.name,
              value: restriction.id
            };
          })
        : []
    );

    const regionsOptions = [{ label: "Selecione o polo (opcional)", value: "" }].concat(
      regions
        ? regions.map(region => {
            return {
              label: region.name,
              value: region.id
            };
          })
        : []
    );

    const vacancyForm = (
      <form noValidate onSubmit={this.onSubmit}>
        <SelectListGroup
          placeholder="* Selecione a atribuição"
          name="assignment_id"
          value={this.state.assignment_id}
          options={assignmentOptions}
          onChange={this.onChange}
          error={errors.assignment_id}
        />

        <SelectListGroup
          placeholder="Selecione o polo associado"
          name="region_id"
          value={this.state.region_id}
          options={regionsOptions}
          onChange={this.onChange}
          error={errors.region_id}
        />

        <SelectListGroup
          placeholder="Selecione a restrição da vaga"
          name="restriction_id"
          value={this.state.restriction_id}
          options={restrictionsOptions}
          onChange={this.onChange}
          error={errors.restriction_id}
        />

        <TextFieldGroup type="text" name="qtd" placeholder="* Quantidade" value={this.state.qtd} onChange={this.onChange} error={errors.qtd} />

        <div className="form-check mb-4">
          <input className="form-check-input" type="checkbox" name="reserve" id="reserve" checked={this.state.reserve} onChange={this.onCheck} />
          <label className="form-check-label" htmlFor="reserve">
            Esta oferta de vagas permite cadastro de reserva.
          </label>
        </div>

        <input type="submit" className="btn btn-info btn-block mt-4" />
      </form>
    );

    const deleteButton = (
      <div className="text-right mt-2 mb-2">
        <Link
          className="text-danger"
          to={{
            pathname: `/processes/${this.props.match.params.process_id}/calls/${this.props.match.params.call_id}/vacancies/${
              this.props.match.params.vacancy_id
            }/delete`
          }}
        >
          <i className="fas fa-times-circle" /> Excluir esta vaga
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
              <h1 className="display-4 text-center">Editar oferta de vaga</h1>
              <p className="lead text-center">Altere os dados básicos</p>
              {vacancyForm}
              {deleteButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// "registerUser" and "auth" are required to the Register component
VacancyEdit.proptypes = {
  createProcessCallStep: PropTypes.func.isRequired,
  getStepOptions: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getAssignmentOptions: PropTypes.func.isRequired,
  getVacancy: PropTypes.func.isRequired
};

//Put redux store data on props
const mapStateToProps = state => ({
  errors: state.errors,
  assignments: state.process.assignments,
  restrictions: state.process.restrictions,
  regions: state.process.regions,
  vacancy: state.process.vacancy
});

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  {
    clearErrors,
    getAssignmentOptions,
    getRestrictionsOptions,
    getRegionsOptions,
    createProcessCallVacancy,
    getVacancy,
    updateProcessCallVacancy
  }
)(withRouter(VacancyEdit));
