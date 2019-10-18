import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
// import moment from 'moment'

import AlertError from 'components/common/AlertError'
import Spinner from 'components/common/Spinner'
import { getCall } from 'components/call/callActions'
import { clearErrors } from 'actions/errorActions'
// import DrawFilter from 'components/profile/DrawFilter'
// import { getCallStatus } from 'components/call/callHelpers'
import { findCourse } from 'components/course/courseActions'
import { spsServerUrl } from 'apis/spsServer'

class PubilcationView extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     course_id: ''
  //   }
  // }

  componentDidMount() {
    this.props.clearErrors()
    // this.props.getCall(this.props.match.params.call_id)
    // this.props.findCourse({ call_id: this.props.match.params.call_id }, course => {
    //   this.setState({ course_id: course.id })
    // })
  }

  openPdf(spsServerUrl, file) {
    return () => window.open(`${spsServerUrl}/v1/publications/download/${file}`)
  }

  renderInfo(publication, loading) {
    if (publication === null || loading) {
      return <Spinner />
    }

    return (
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">{publication.title}</h4>
        </div>

        <div className="card-body">
          <div>
            <span dangerouslySetInnerHTML={{ __html: publication.description ? publication.description : '' }} />
          </div>
          <div>
            <div className="form-group row pt-2 pb-2">
              <label className="col-lg-2 col-form-label form-control-label font-weight-bold">
                <span className="mt-6">Arquivo:</span>
              </label>
              <div className="col-lg-10">
                <div className="form form-control">
                  <a
                    href={`${spsServerUrl}/v1/publications/download/${publication.file}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <i className="fas fa-file" /> {publication.file}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { errors, loading } = this.props
    const publication = this.props.location.state.publication

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to={`/processes/${this.props.match.params.process_id}`} className="btn btn-light">
                Voltar para o processo
              </Link>
              <h1 className="display-4">Publicação</h1>
              <AlertError errors={errors} />
              {this.renderInfo(publication, loading)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Call Edit props
PubilcationView.proptypes = {
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
)(withRouter(PubilcationView))
