import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
// import moment from 'moment'

import AlertError from 'components/common/AlertError'
import Spinner from 'components/common/Spinner'
// import { getCall } from 'components/call/callActions'
import { clearErrors } from 'actions/errorActions'
// import DrawFilter from 'components/profile/DrawFilter'
// import { getCallStatus } from 'components/call/callHelpers'
// import { findCourse } from 'components/course/courseActions'
import { spsServerUrl } from 'apis/spsServer'
import { getPublication } from 'components/publication/publicationActions'

class PublicationView extends Component {
  componentDidMount() {
    this.props.clearErrors()
    if (!(this.props.location.state && this.props.location.state.publication)) {
      this.props.getPublication(this.props.match.params.publication_id)
    }
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
    const { errors } = this.props

    const publicationValue = () => {
      if (this.props.location.state && this.props.location.state.publication) {
        return this.props.location.state.publication
      }
      if (this.props.loading === false && this.props.publication !== null) {
        return this.props.publication
      }
      return null
    }

    const publication = publicationValue()

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
              {this.renderInfo(publication, this.props.loading)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Call Edit props
PublicationView.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getPublication: PropTypes.func.isRequired,
  publication: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired
}

// Put redux store data on props
const mapStateToProps = state => ({
  errors: state.errorStore,
  publication: state.publicationStore.publication,
  loading: state.publicationStore.loading
})

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  { getPublication, clearErrors }
)(withRouter(PublicationView))
