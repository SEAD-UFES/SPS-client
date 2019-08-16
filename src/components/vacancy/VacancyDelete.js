import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Spinner from 'components/common/Spinner'
import { getVacancy, deleteVacancy } from 'components/vacancy/vacancyActions'
import AlertError from 'components/common/AlertError'

class VacancyDelete extends Component {
  constructor() {
    super()
    this.state = { errors: [] }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.vacancy_id) {
      this.props.getVacancy(this.props.match.params.vacancy_id)
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.deleteVacancy(this.props.match.params.vacancy_id, () => {
      this.props.history.push(
        `/processes/${this.props.match.params.process_id}/calls/${this.props.match.params.call_id}`
      )
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

  renderInfo(vacancy, loading) {
    if (vacancy === null || loading) {
      return <Spinner />
    }

    return (
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Excluir oferta de vaga</h4>
        </div>
        <div className="card-body">
          <table className="table mb-0 table-hover">
            <tbody>
              <tr>
                <td>
                  <strong>Id:</strong>
                </td>
                <td>{vacancy.id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Processo:</strong>
                </td>
                <td>{`${vacancy.Call.SelectiveProcess.number}/${vacancy.Call.SelectiveProcess.year} - ${
                  vacancy.Call.SelectiveProcess.Course.name
                } | Chamada ${vacancy.Call.number}`}</td>
              </tr>
              <tr>
                <td>
                  <strong>Atribuição:</strong>
                </td>
                <td>{vacancy.Assignment.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Região:</strong>
                </td>
                <td>{vacancy.Region ? vacancy.Region.name : 'Sem região'}</td>
              </tr>
              <tr>
                <td>
                  <strong>Restrição:</strong>
                </td>
                <td>{vacancy.Restriction ? vacancy.Restriction.name : 'Sem restrição'}</td>
              </tr>
              <tr>
                <td>
                  <strong>Vagas:</strong>
                </td>
                <td>{vacancy.qtd}</td>
              </tr>
              <tr>
                <td>
                  <strong>Reserva:</strong>
                </td>
                <td>{vacancy.reserve ? 'Sim' : 'Não'}</td>
              </tr>
            </tbody>
          </table>
          {this.renderChoices()}
        </div>
      </div>
    )
  }

  render() {
    const { vacancy, loading } = this.props
    const { errorStore } = this.props

    return (
      <div className="roleassignments">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link
                to={`/processes/${this.props.match.params.process_id}/calls/${this.props.match.params.call_id}`}
                className="btn btn-light">
                Voltar para a chamada
              </Link>
              <h1 className="display-4">Oferta de vaga</h1>
              <AlertError errors={errorStore} />
              {this.renderInfo(vacancy, loading)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

VacancyDelete.propTypes = {
  getVacancy: PropTypes.func.isRequired,
  deleteVacancy: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  vacancy: state.vacancyStore.vacancy,
  loading: state.vacancyStore.loading,
  errorStore: state.errorStore
})

export default connect(
  mapStateToProps,
  {
    getVacancy,
    deleteVacancy
  }
)(VacancyDelete)
