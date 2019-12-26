import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import { validateNumberRequired } from '../../validation'
import { validateAssignment_id, validateVacancyForm } from './validateVacancyForm'
import { createVacancy } from './vacancyActions'
import { getRegions } from 'components/region/regionActions'
import { getRestrictions } from 'components/restriction/restrictionActions'
import { getAssignments } from 'components/assignment/assignmentActions'
import { clearErrors } from '../../actions/errorActions'
import CheckBoxFieldGroup from 'components/common/CheckBoxFieldGroup'
import AlertError from 'components/common/AlertError'

class VacancyCreate extends Component {
  constructor() {
    super()
    this.state = {
      //Vacancy data
      assignment_id: '',
      region_id: '',
      restriction_id: '',
      qtd: '',
      reserve: true,

      //errors
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.clearErrors()
    this.props.getAssignments()
    this.props.getRestrictions()
    this.props.getRegions()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //If receive errors from server
    if (nextProps.errors) {
      let errors = nextProps.errors

      let newStateErrors = {}

      switch (errors.code) {
        case 'calls-05':
          newStateErrors.endingDate = errors.userMessage
          break
        default:
          break
      }

      this.setState({ errors: newStateErrors })
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors
    let valResult = { error: '', isValid: true }

    switch (e.target.name) {
      case 'assignment_id':
        valResult = validateAssignment_id(e.target.value)
        break
      case 'region_id':
        break
      case 'restriction_id':
        break
      case 'qtd':
        valResult = validateNumberRequired(e.target.value)
        break
      default:
        break
    }

    if (!valResult.isValid) {
      errors = { ...errors, [e.target.name]: valResult.error }
    } else {
      delete errors[e.target.name]
    }

    //Atualizando os estados do campos e dos erros
    this.setState({
      [e.target.name]: e.target.value,
      errors: errors
    })
  }

  onCheck(e) {
    //validação local dos campos
    let errors = this.state.errors
    switch (e.target.name) {
      case 'reserve':
        break
      default:
        break
    }

    this.setState({
      [e.target.name]: !this.state[e.target.name],
      errors: errors
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const vacancyData = {
      call_id: this.props.match.params.call_id,
      assignment_id: this.state.assignment_id,
      region_id: this.state.region_id ? this.state.region_id : null,
      restriction_id: this.state.restriction_id ? this.state.restriction_id : null,
      qtd: this.state.qtd,
      reserve: this.state.reserve
    }

    const valVacancy = validateVacancyForm(vacancyData)
    if (!valVacancy.isValid) {
      this.setState({ errors: valVacancy.errors })
    } else {
      this.props.createVacancy(vacancyData, () => {
        this.props.history.push(
          `/processes/${this.props.match.params.process_id}/call/${this.props.match.params.call_id}`
        )
      })
    }
  }

  renderForm(assignmentOptions, regionsOptions, restrictionsOptions, errors) {
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <SelectListGroup
          name="assignment_id"
          label="Atribuição"
          placeholder="Selecione a atribuição"
          value={this.state.assignment_id}
          options={assignmentOptions}
          onChange={this.onChange}
          error={errors.assignment_id}
        />

        <TextFieldGroup
          type="text"
          name="qtd"
          label="Quantidade"
          value={this.state.qtd}
          onChange={this.onChange}
          error={errors.qtd}
        />

        <SelectListGroup
          name="region_id"
          label="Polo"
          placeholder="Selecione o polo associado"
          value={this.state.region_id}
          options={regionsOptions}
          onChange={this.onChange}
          error={errors.region_id}
          info="Campo opcional"
        />

        <SelectListGroup
          name="restriction_id"
          label="Restrição"
          placeholder="Selecione a restrição da vaga"
          value={this.state.restriction_id}
          options={restrictionsOptions}
          onChange={this.onChange}
          error={errors.restriction_id}
          info="Campo opcional"
        />

        <CheckBoxFieldGroup
          id="reserve-checkbox"
          name="reserve"
          text="Reserva"
          value="Esta oferta de vagas permite cadastro de reserva."
          checked={this.state.reserve}
          error={errors.reserve}
          onChange={this.onCheck}
        />

        <input type="submit" className="btn btn-primary" value="Criar" />
      </form>
    )
  }

  render() {
    const { errors } = this.state
    const { assignments, restrictions, regions } = this.props

    const assignmentOptions = [{ label: '* Selecione a atribuição', value: '' }].concat(
      assignments
        ? assignments.map(assignment => {
            return {
              label: assignment.name,
              value: assignment.id
            }
          })
        : []
    )

    const restrictionsOptions = [{ label: 'Selecione a restrição (opcional)', value: '' }].concat(
      restrictions
        ? restrictions.map(restriction => {
            return {
              label: restriction.name,
              value: restriction.id
            }
          })
        : []
    )

    const regionsOptions = [{ label: 'Selecione o polo (opcional)', value: '' }].concat(
      regions
        ? regions.map(region => {
            return {
              label: region.name,
              value: region.id
            }
          })
        : []
    )

    return (
      <div className="vacancy-create">
        <div className="container">
          <div className="breadcrumb">
            <span>Você está em:</span>
            <Link to="/processes" className="breadcrumb-link">
              Processos Seletivos
            </Link>
            <i className="fas fa-greater-than"></i>
            <Link to={`/processes/${this.props.match.params.process_id}`} className="breadcrumb-link">
              Edital XXX/XXXX
            </Link>
            <i className="fas fa-greater-than"></i>
            <Link
              to={`/processes/${this.props.match.params.process_id}/call/${this.props.match.params.call_id}`}
              className="breadcrumb-link">
              Chamada XXX
            </Link>
            <i className="fas fa-greater-than"></i>
            <span>Criar oferta</span>
          </div>

          <div className="form-container" id="main">
            <h1>Nova oferta de vaga</h1>
            <AlertError errors={errors} />
            {this.renderForm(assignmentOptions, regionsOptions, restrictionsOptions, errors)}
          </div>
        </div>
      </div>
    )
  }
}

// "registerUser" and "auth" are required to the Register component
VacancyCreate.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getAssignments: PropTypes.func.isRequired
}

//Put redux store data on props
const mapStateToProps = state => ({
  errors: state.errorStore,
  options: state.processStore.options,
  assignments: state.assignmentStore.assignments,
  restrictions: state.restrictionStore.restrictions,
  regions: state.regionStore.regions
})

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(mapStateToProps, {
  clearErrors,
  getAssignments,
  getRestrictions,
  getRegions,
  createVacancy
})(withRouter(VacancyCreate))
