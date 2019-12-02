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

  renderCallName(call, loading) {
    if (call === null || loading) {
      return <Spinner />
    }

    return <React.Fragment>{`Chamada ${call.number}`}</React.Fragment>
  }

  renderCallEdit(call, loading) {
    if (call === null || loading) {
      return <Spinner />
    }
    return (
      <div className="btn-right">
          <DrawFilter permission="call_update" course_id={this.state.course_id}>
            <Link
              className="btn btn-primary"
              to={{
                pathname: `/processes/${call.selectiveProcess_id}/calls/${call.id}/edit`,
                prevLocation: this.props.location
              }}>
              <i className="fas fa-cog" /> Editar
            </Link>
          </DrawFilter>
        </div>
    )
  }

  renderInfo(call, loading) {
    if (call === null || loading) {
      return <Spinner />
    }

    return (
      <section>
        <p>
          <strong>Abertura: </strong>
           {moment(call.openingDate, 'YYYY-MM-DD HH:mm:ss ').format('DD/MM/YYYY')}
        </p>
        <p>
          <strong>Encerramento: </strong>
          {moment(call.endingDate, 'YYYY-MM-DD HH:mm:ss ').format('DD/MM/YYYY')}
        </p>
        <p>
          <strong>Status: </strong>
          {getCallStatus(call)}
        </p>
      </section>
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
      <div className="view-page">
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
              <span>{this.renderCallName(call, loading)}</span>
            </div>

            <div id="main">
              <h1>{this.renderCallName(call, loading)}</h1>
              {this.renderCallEdit(call, loading)}
              <AlertError errors={errors} />
              {this.renderInfo(call, loading)}
              {this.renderVacancys(call, loading)}
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
export default connect(mapStateToProps, { getCall, clearErrors, findCourse })(withRouter(CallView))
