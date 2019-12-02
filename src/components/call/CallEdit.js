import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment'

import TextFieldGroup from '../common/TextFieldGroup'
import { isEmpty, validateProcessNumber } from '../../validation'
import { validateCallForm, validateOpeningDate, validateEndingDate } from './validateCallForm'
import { createCall, getCall, updateCall } from './callActions'
import { clearErrors } from '../../actions/errorActions'
import AlertError from 'components/common/AlertError'

class CallEdit extends Component {
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
  }

  componentDidMount() {
    if (this.props.match.params.call_id) {
      this.props.getCall(this.props.match.params.call_id)
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

    //(Preenchendo / Atualizando) dados do formulario
    if (isEmpty(nextProps.errors) && nextProps.callStore.call) {
      const call = nextProps.callStore.call
      this.setState({
        number: call.number,
        openingDate: moment(call.openingDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
        endingDate: moment(call.endingDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')
      })
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

    const back_url = this.props.location.prevLocation
      ? this.props.location.prevLocation.pathname
      : `/processes/${callData.selectiveProcess_id}`

    const valCall = validateCallForm(callData)
    if (!valCall.isValid) {
      this.setState({ errors: valCall.errors })
    } else {
      //Formatando datas para o backend (temp?)
      callData.openingDate = moment(callData.openingDate, 'YYYY-MM-DD').format('YYYY-MM-DD') + ' 00:00:00'
      callData.endingDate = moment(callData.endingDate, 'YYYY-MM-DD').format('YYYY-MM-DD') + ' 23:59:59'
      this.props.updateCall(this.props.match.params.call_id, callData, () => {
        this.props.history.push(back_url)
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

            <input type="submit" className="btn btn-primary" value="Salvar"/>
          </form>
    )
  }

  render() {
    const { errors } = this.state
    const back_url = this.props.location.prevLocation ? this.props.location.prevLocation.pathname : null

    return (
      <div className="register">
        <div className="container">

          <div className="breadcrumb">              
            <span>Você está em:</span>
            <Link to="/processes" className="breadcrumb-link">
              Processos Seletivos
            </Link>
            <i class="fas fa-greater-than"></i>
            <Link to={`/processes/${this.props.match.params.process_id}`} className="breadcrumb-link">
              Edital XXX/XXXX
            </Link>
            <i class="fas fa-greater-than"></i>
            <Link to={back_url ? back_url : `/processes/${this.props.match.params.process_id}`} className="breadcrumb-link">
              Chamada XXX
            </Link>
            <i class="fas fa-greater-than"></i>
            <span>Editar chamada</span>
          </div>

          <div className="form-container" id="main">
            <h1>Editar chamada</h1>
            <AlertError errors={this.props.errorStore} />
            {this.renderForm(errors)}
          </div>
        </div>
      </div>
    )
  }
}

// Call Edit props
CallEdit.proptypes = {
  createCall: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errorStore: PropTypes.object.isRequired
}

//Put redux store data on props
const mapStateToProps = state => ({
  errorStore: state.errorStore,
  callStore: state.callStore
})

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(mapStateToProps, { createCall, getCall, updateCall, clearErrors })(withRouter(CallEdit))
