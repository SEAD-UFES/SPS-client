import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import { getPublication, deletePublication } from 'components/publication/publicationActions'
import { clearErrors } from 'actions/errorActions'
import AlertError from 'components/common/AlertError'
import Spinner from 'components/common/Spinner'

class PublicationDelete extends Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.props.clearErrors()
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

  renderInfo(publication, loading) {
    if (publication === null || loading) {
      return <Spinner />
    }

    return (
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Excluir publicação</h4>
        </div>
        <div className="card-body">
          <table className="table mb-0 table-hover">
            <tbody>
              <tr>
                <td>
                  <strong>Id:</strong>
                </td>
                <td>{publication.id}</td>
              </tr>

              <tr>
                <td>
                  <strong>Data:</strong>
                </td>
                <td>{moment(publication.creation_date).format('DD/MM/YYYY')}</td>
              </tr>

              <tr>
                <td>
                  <strong>Título:</strong>
                </td>
                <td>{publication.title}</td>
              </tr>

              <tr>
                <td>
                  <strong>Arquivo:</strong>
                </td>
                <td>{publication.file}</td>
              </tr>

              <tr>
                <td>
                  <strong>Atualizado:</strong>
                </td>
                <td>{publication.valid ? 'Documento atualizado' : 'Documento desatualizado'}</td>
              </tr>
            </tbody>
          </table>
          {this.renderChoices()}
        </div>
      </div>
    )
  }

  render() {
    const { errorStore } = this.props
    const { publication, loading } = this.props.publicationStore

    return (
      <div className="publication-delete">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to={`/processes/${this.props.match.params.process_id}`} className="btn btn-light">
                Voltar para o processo
              </Link>
              <h1 className="display-4">Publicação</h1>
              <AlertError errors={errorStore} />
              {this.renderInfo(publication, loading)}
            </div>
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
  errorStore: state.errorStore
})

export default connect(
  mapStateToProps,
  {
    clearErrors,
    getPublication,
    deletePublication
  }
)(PublicationDelete)
