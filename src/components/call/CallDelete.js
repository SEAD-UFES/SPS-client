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

  componentWillMount() {
    this.props.clearErrors()
  }

  componentDidMount() {
    this.props.getCall(this.props.match.params.call_id)
  }

  componentWillReceiveProps(nextProps) {
    //error handling
    if (nextProps.errors) {
      let errors = nextProps.errors
      this.setState({ errors: errors })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.deleteCall(this.props.match.params.call_id, () => {
      this.props.history.push(`/processes/${this.props.match.params.process_id}`)
    })
  }

  renderChoices() {
    return (
      <div className="row">
        <div className="col">
          <input type="button" value="Excluir" className="btn btn-danger btn-block mt-4" onClick={this.onSubmit} />
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
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Excluir publicação</h4>
        </div>
        <div className="card-body">
          <table className="table table-hover mb-0">
            <tbody>
              <tr>
                <td>
                  <strong>Id:</strong>
                </td>
                <td>{call.id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Número:</strong>
                </td>
                <td>{call.number}</td>
              </tr>
              <tr>
                <td>
                  <strong>Abertura:</strong>
                </td>
                <td>{moment(call.openingDate, 'YYYY-MM-DD HH:mm:ss ').format('DD/MM/YYYY')}</td>
              </tr>
              <tr>
                <td>
                  <strong>Encerramento:</strong>
                </td>
                <td>{moment(call.endingDate, 'YYYY-MM-DD HH:mm:ss ').format('DD/MM/YYYY')}</td>
              </tr>
            </tbody>
          </table>
          {this.renderChoices()}
        </div>
      </div>
    )
  }

  render() {
    const { call, loading, errorStore } = this.props

    return (
      <div className="call-delete">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to={`/processes/${this.props.match.params.process_id}`} className="btn btn-light">
                Voltar para o processo
              </Link>
              <h1 className="display-4">Chamada</h1>
              <AlertError errors={errorStore} />
              {this.renderInfo(call, loading)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CallDelete.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getCall: PropTypes.func.isRequired,
  deleteCall: PropTypes.func.isRequired
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
