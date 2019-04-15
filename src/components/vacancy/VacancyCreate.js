import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { validateAssignment_id, validateProcessCallVacancyForm, validateNumberRequired } from "../../validation";

import { getStepOptions, getAssignmentOptions, getRestrictionsOptions } from "../process/processActions";
import { createVacancy } from "./vacancyActions";
import { getRegions } from "components/region/regionActions";

import { clearErrors } from "../../actions/errorActions";

class VacancyCreate extends Component {
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
    this.props.getRegions();
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
      this.props.createVacancy(vacancyData, this.props.match.params.process_id, this.props.history);
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

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/processes/${this.props.match.params.process_id}`} className="btn btn-light">
                Voltar para o processo
              </Link>
              <h1 className="display-4 text-center">Criar oferta de vaga</h1>
              <p className="lead text-center">Dê entrada nos dados básicos</p>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// "registerUser" and "auth" are required to the Register component
VacancyCreate.proptypes = {
  getStepOptions: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getAssignmentOptions: PropTypes.func.isRequired
};

//Put redux store data on props
const mapStateToProps = state => ({
  errors: state.errors,
  options: state.processStore.options,
  assignments: state.processStore.assignments,
  restrictions: state.processStore.restrictions,
  regions: state.regionStore.regions
});

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  {
    getStepOptions,
    clearErrors,
    getAssignmentOptions,
    getRestrictionsOptions,
    getRegions,
    createVacancy
  }
)(withRouter(VacancyCreate));
