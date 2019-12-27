import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import { getPublication, deletePublication } from 'components/publication/publicationActions'
import { clearErrors } from 'actions/errorActions'
import AlertError from 'components/common/AlertError'
import Spinner from 'components/common/Spinner'
import { getProcess } from 'components/process/processActions'

class PublicationDelete extends Component {
  constructor() {
    super()
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

  componentDidMount() {
    this.props.getPublication(this.props.match.params.publication_id)
  }

  onSubmit(e) {
    e.preventDefault()
    const { publication } = this.props.publicationStore
    this.props.deletePublication(publication.id, () => {
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

  renderInfo(publication, loading) {
    if (publication === null || loading) {
      return <Spinner />
    }

    return (
      <div>
        <p>
          <strong>Id: </strong>
          {publication.id}
        </p>

        <p>
          <strong>Data: </strong>
          {moment(publication.creation_date).format('DD/MM/YYYY')}
        </p>
        <p>
          <strong>Título: </strong>
          {publication.title}
        </p>
        <p>
          <strong>Arquivo: </strong>
          {publication.file}
        </p>
        <p>
          <strong>Atualizado: </strong>
          {publication.valid ? 'Documento atualizado' : 'Documento desatualizado'}
        </p>

        {this.renderChoices()}
      </div>
    )
  }

  render() {
    const { errorStore } = this.props
    const { publication, loading } = this.props.publicationStore

    return (
      <div className="publication-delete">
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
            <span>Excluir publicação</span>
          </div>
          <div className="form-container" id="main">
            <h1>Publicação</h1>
            <AlertError errors={errorStore} />
            {this.renderInfo(publication, loading)}
          </div>
        </div>
      </div>
    )
  }
}

PublicationDelete.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  getPublication: PropTypes.func.isRequired,
  deletePublication: PropTypes.func.isRequired,
  publicationStore: PropTypes.object.isRequired,
  errorStore: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  publicationStore: state.publicationStore,
  errorStore: state.errorStore,
  process: state.processStore.process
})

export default connect(mapStateToProps, {
  clearErrors,
  getPublication,
  deletePublication,
  getProcess
})(PublicationDelete)
