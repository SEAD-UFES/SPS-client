import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import TextFieldGroup from '../common/TextFieldGroup'
import { validateProcessNumber } from '../../validation'
import { validateCallForm, validateEndingDate, validateOpeningDate } from './validateCallForm'
import AlertError from 'components/common/AlertError'
import { createCall } from './callActions'
import { getProcess } from 'components/process/processActions'
import { clearErrors } from 'actions/errorActions'
import moment from 'moment'

class CallCreate extends Component {
  constructor() {
    super()
    this.state = {
      number: '',
      openingDate: '',
      endingDate: '',

      //errors
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.props.clearErrors()
    //get process if needed
    if (
      this.props.process === null ||
      typeof this.props.process === 'undefined' ||
      this.props.process.id !== this.props.match.params.process_id
    ) {
      this.props.getProcess(this.props.match.params.process_id)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //If receive errors from server
    if (nextProps.errorStore) {
      let errorStore = nextProps.errorStore
      if (errorStore.data && errorStore.data.code === 'calls-01' && errorStore.data.devMessage) {
        this.setState({ errors: errorStore.data.devMessage.errors })
      }
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors
    let valResult = { error: '', isValid: true }
    switch (e.target.name) {
      case 'number':
        valResult = validateProcessNumber(e.target.value)
        break
      case 'openingDate':
        valResult = validateOpeningDate(e.target.value, this.state.endingDate)
        break
      case 'endingDate':
        valResult = validateEndingDate(this.state.openingDate, e.target.value)
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

    const callData = {
      selectiveProcess_id: this.props.match.params.process_id,
      number: this.state.number,
      openingDate: this.state.openingDate,
      endingDate: this.state.endingDate
    }

    const valCall = validateCallForm(callData)

    if (!valCall.isValid) {
      this.setState({ errors: valCall.errors })
    } else {
      //Formatando datas para o backend (temp?)
      callData.openingDate = moment(callData.openingDate, 'YYYY-MM-DD').format('YYYY-MM-DD') + ' 00:00:00'
      callData.endingDate = moment(callData.endingDate, 'YYYY-MM-DD').format('YYYY-MM-DD') + ' 23:59:59'

      this.props.createCall(callData, () => {
        this.props.history.push(`/processes/${callData.selectiveProcess_id}`)
      })
    }
  }

  renderForm(errors) {
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <TextFieldGroup
          type="text"
          name="number"
          label="Número"
          value={this.state.number}
          onChange={this.onChange}
          error={errors.number}
        />

        <div className="form-lateral">
          <TextFieldGroup
            placeholder="__/__/__"
            type="date"
            label="Data de abertura"
            name="openingDate"
            value={this.state.openingDate}
            onChange={this.onChange}
            error={errors.openingDate}
          />

          <TextFieldGroup
            placeholder="__/__/__"
            type="date"
            label="Data de encerramento"
            name="endingDate"
            value={this.state.endingDate}
            onChange={this.onChange}
            error={errors.endingDate}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Cadastrar" />
      </form>
    )
  }

  render() {
    const { errors } = this.state

    return (
      <div className="call-create">
        <div className="container">
          <div className="breadcrumb">
            <span>Você está em:</span>
            <Link to="/processes" className="breadcrumb-link">
              Processos Seletivos
            </Link>
            <i className="fas fa-greater-than"></i>
            <Link to={`/processes/${this.props.match.params.process_id}`} className="breadcrumb-link">
              {this.props.process
                ? `Edital ${this.props.process.number}/${this.props.process.year}`
                : 'Edital 000/0000'}
            </Link>
            <i className="fas fa-greater-than"></i>
            <span>Nova chamada</span>
          </div>

          <div className="form-container" id="main">
            <h1>Nova chamada</h1>
            <AlertError errors={this.props.errorStore} />
            {this.renderForm(errors)}
          </div>
        </div>
      </div>
    )
  }
}

CallCreate.proptypes = {
  createCall: PropTypes.func.isRequired,
  errorStore: PropTypes.object.isRequired
}

//Put redux store data on props
const mapStateToProps = state => ({
  process: state.processStore.process,
  errorStore: state.errorStore
})

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(mapStateToProps, { createCall, clearErrors, getProcess })(withRouter(CallCreate))
