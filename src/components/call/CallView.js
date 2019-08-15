import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment'

import AlertError from 'components/common/AlertError'
import Spinner from 'components/common/Spinner'
import { getCall } from 'components/call/callActions'
import { clearErrors } from 'actions/errorActions'
import DrawFilter from 'components/profile/DrawFilter'
import { getCallStatus } from './callHelpers'
import VacancyCard from 'components/vacancy/VacancyCard'
import { findCourse } from 'components/course/courseActions'

class CallView extends Component {
  constructor() {
    super()
    this.state = {
      course_id: ''
    }
  }

  componentDidMount() {
    this.props.clearErrors()
    this.props.getCall(this.props.match.params.call_id)
    this.props.findCourse({ call_id: this.props.match.params.call_id }, course => {
      this.setState({ course_id: course.id })
    })
  }

  renderInfo(call, loading) {
    if (call === null || loading) {
      return <Spinner />
    }

    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h4 className="mb-0">Informações</h4>
            </div>
            <div className="col">
              <div className="text-right">
                <DrawFilter permission="chamada editar" course_id={this.state.course_id}>
                  <Link
                    className="text-info"
                    to={{
                      pathname: `/processes/${call.selectiveProcess_id}/calls/${call.id}/edit`,
                      prevLocation: this.props.location
                    }}>
                    <i className="fas fa-cog" /> Editar
                  </Link>
                </DrawFilter>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          <table className="table table-hover mt-0 mb-0">
            <tbody>
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
              <tr>
                <td>
                  <strong>Status:</strong>
                </td>
                <td>{getCallStatus(call)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderVacancys(call, loading) {
    if (call === null || loading) {
      return <Spinner />
    }
    return <VacancyCard call={call} process_id={this.props.match.params.process_id} course_id={this.state.course_id} />
  }

  render() {
    const { errors, call, loading } = this.props
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to={`/processes/${this.props.match.params.process_id}`} className="btn btn-light">
                Voltar para o processo
              </Link>
              <h1 className="display-4">Chamada</h1>
              <AlertError errors={errors} />
              {this.renderInfo(call, loading)}
              {this.renderVacancys(call, loading)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Call Edit props
CallView.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getCall: PropTypes.func.isRequired,
  call: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired
}

// Put redux store data on props
const mapStateToProps = state => ({
  errors: state.errorStore,
  call: state.callStore.call,
  loading: state.callStore.loading
})

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  { getCall, clearErrors, findCourse }
)(withRouter(CallView))
