import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment'

import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import { isEmpty, validateNumberRequired } from '../../validation'
import {
  validateStepType_id,
  validateResultDate,
  validateOpenAppealDate,
  validateLimitAppealDate,
  validateResultAfterAppealDate,
  validateStepForm
} from './validateStepForm'
import { getStep, updateStep } from './stepActions'
import { clearErrors } from '../../actions/errorActions'
import { getStepTypes } from 'components/stepType/stepTypeActions'

class StepEdit extends Component {
  constructor() {
    super()
    this.state = {
      //Step data
      number: '',
      stepType_id: '',
      resultDate: '',
      openAppealDate: '',
      limitAppealDate: '',
      resultAfterAppealDate: '',

      //errors
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.clearErrors()
    this.props.getStepTypes()
    if (this.props.match.params.step_id) {
      this.props.getStep(this.props.match.params.step_id)
    }
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

    //loading step values on state
    if (isEmpty(nextProps.errors) && nextProps.stepStore.step) {
      const step = nextProps.stepStore.step
      this.setState({
        number: step.number,
        stepType_id: step.stepType_id,
        resultDate: moment(step.resultDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
        openAppealDate: moment(step.openAppealDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
        limitAppealDate: moment(step.limitAppealDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
        resultAfterAppealDate: moment(step.resultAfterAppealDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')
      })
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors
    let valResult = { error: '', isValid: true }

    switch (e.target.name) {
      case 'number':
        valResult = validateNumberRequired(e.target.value)
        break
      case 'stepType_id':
        valResult = validateStepType_id(e.target.value)
        break
      case 'resultDate':
        valResult = validateResultDate(
          e.target.value,
          this.state.openAppealDate,
          this.state.limitAppealDate,
          this.state.resultAfterAppealDate
        )
        break
      case 'openAppealDate':
        valResult = validateOpenAppealDate(
          this.state.resultDate,
          e.target.value,
          this.state.limitAppealDate,
          this.state.resultAfterAppealDate
        )
        break
      case 'limitAppealDate':
        valResult = validateLimitAppealDate(
          this.state.resultDate,
          this.state.openAppealDate,
          e.target.value,
          this.state.resultAfterAppealDate
        )
        break
      case 'resultAfterAppealDate':
        valResult = validateResultAfterAppealDate(
          this.state.resultDate,
          this.state.openAppealDate,
          this.state.limitAppealDate,
          e.target.value
        )
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

  onSubmit(e) {
    e.preventDefault()

    const StepData = {
      number: this.state.number,
      call_id: this.props.match.params.call_id,
      stepType_id: this.state.stepType_id,
      resultDate: this.state.resultDate,
      openAppealDate: this.state.openAppealDate,
      limitAppealDate: this.state.limitAppealDate,
      resultAfterAppealDate: this.state.resultAfterAppealDate
    }

    const valStep = validateStepForm(StepData)
    if (!valStep.isValid) {
      this.setState({ errors: valStep.errors })
    } else {
      this.props.updateStep(
        this.props.match.params.process_id,
        this.props.match.params.step_id,
        StepData,
        this.props.history
      )
    }
  }

  render() {
    const { errors } = this.state

    const steptypeOptions = [{ label: 'Escolha o tipo de etapa', value: '' }].concat(
      this.props.options
        ? this.props.options.map(steptype => {
            return {
              label: steptype.name,
              value: steptype.id
            }
          })
        : []
    )

    const stepForm = (
      <form noValidate onSubmit={this.onSubmit}>
        <TextFieldGroup
          placeholder="Número da etapa"
          type="text"
          name="number"
          value={this.state.number}
          onChange={this.onChange}
          error={errors.number}
        />

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

        <input type="submit" className="btn btn-primary btn-block mt-4" />
      </form>
    )

    const deleteButton = (
      <div className="text-right mt-2 mb-2">
        <Link
          className="text-danger"
          to={{
            pathname: `/processes/${this.props.match.params.process_id}/call/${this.props.match.params.call_id}/steps/${this.props.match.params.step_id}/delete`
          }}>
          <i className="fas fa-times-circle" /> Excluir esta etapa
        </Link>
      </div>
    )

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/processes/${this.props.match.params.process_id}`} className="btn btn-light">
                Voltar para o processo
              </Link>
              <h1 className="display-4 text-center">Editar etapa</h1>
              <p className="lead text-center">Altere os dados básicos</p>
              {stepForm}
              {deleteButton}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// "registerUser" and "auth" are required to the Register component
StepEdit.proptypes = {
  getStep: PropTypes.func.isRequired,
  updateStep: PropTypes.func.isRequired,
  getStepTypes: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

//Put redux store data on props
const mapStateToProps = state => ({
  errors: state.errorStore,
  options: state.stepTypeStore.stepTypes,
  stepStore: state.stepStore
})

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(mapStateToProps, {
  getStepTypes,
  clearErrors,
  getStep,
  updateStep
})(withRouter(StepEdit))
