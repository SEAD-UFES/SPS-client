import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import Spinner from 'components/common/Spinner'
import { getCall, deleteCall } from 'components/call/callActions'
import AlertError from 'components/common/AlertError'
import { clearErrors } from 'actions/errorActions'

class CallDelete extends Component {
  constructor() {
    super()
    this.state = { errors: [] }
    this.onSubmit = this.onSubmit.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.props.clearErrors()
  }

  componentDidMount() {
    this.props.getCall(this.props.match.params.call_id)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //error handling
    if (nextProps.errors) {
      let errors = nextProps.errors
      this.setState({ errors: errors })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    const { call } = this.props
    this.props.deleteCall(call.id, () => {
      this.props.history.push(`/processes/${this.props.match.params.process_id}`)
    })
  }

  renderChoices() {
    return (
      <div className="row">
        <div className="col">
          <input type="button" value="Excluir" className="btn btn-primary btn-block mt-4" onClick={this.onSubmit} />
        </div>
        <div className="col">
          <input
            type="button"
            value="Cancelar"
            className="btn btn-secondary btn-block mt-4"
            onClick={() => {
              this.props.history.goBack()
            }}
          />
        </div>
      </div>
    )
  }

  renderInfo(call, loading) {
    if (call === null || loading) {
      return <Spinner />
    }

    return (
      <div>
        <p>
          <strong>Número: </strong>
          {call.number}
        </p>
        <p>
          <strong>Id: </strong>
          {call.id}
        </p>
        <p>
          <strong>Data de abertura: </strong>
          {moment(call.openingDate, 'YYYY-MM-DD HH:mm:ss ').format('DD/MM/YYYY')}
        </p>
        <p>
          <strong>Data de encerramento: </strong>
          {moment(call.endingDate, 'YYYY-MM-DD HH:mm:ss ').format('DD/MM/YYYY')}
        </p>
        
        {this.renderChoices()}
      </div>
    )
  }

  render() {
    const { call, loading, errorStore } = this.props

    return (
      <div className="call-delete">
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
            <span>Excluir chamada</span>
          </div>

          <div className="form-container" id="main">
            <h1>Excluir chamada</h1>
            <AlertError errors={errorStore} />
            {this.renderInfo(call, loading)}
          </div>
        </div>
      </div>
    )
  }
}

CallDelete.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getCall: PropTypes.func.isRequired,
  deleteCall: PropTypes.func.isRequired,
  call: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  errorStore: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  call: state.callStore.call,
  loading: state.callStore.loading,
  errorStore: state.errorStore
})

export default connect(
  mapStateToProps,
  {
    clearErrors,
    getCall,
    deleteCall
  }
)(CallDelete)
