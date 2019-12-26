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

  renderInfo(vacancy, loading) {
    if (vacancy === null || loading) {
      return <Spinner />
    }

    return (
      <div>
        <p>
          <strong>Id: </strong>{vacancy.id}
        </p>
        <p>
          <strong>Processo: </strong>{`${vacancy.Call.SelectiveProcess.number}/${vacancy.Call.SelectiveProcess.year} - ${
          vacancy.Call.SelectiveProcess.Course.name
        } | Chamada ${vacancy.Call.number}`}
        </p>

        <p>
          <strong>Atribuição: </strong>{vacancy.Assignment.name}
        </p>

        <p>
          <strong>Região: </strong>{vacancy.Region ? vacancy.Region.name : 'Sem região'}
        </p>

        <p>
          <strong>Restrição: </strong>{vacancy.Restriction ? vacancy.Restriction.name : 'Sem restrição'}
        </p>

        <p>
          <strong>Vagas: </strong>{vacancy.qtd}
          </p>

        <p>
          <strong>Reserva: </strong>{vacancy.reserve ? 'Sim' : 'Não'}
        </p>

        {this.renderChoices()}
      </div>
    )
  }

  render() {
    const { vacancy, loading } = this.props
    const { errorStore } = this.props

    return (
      <div className="roleassignments">
        <div className="container">
          <div className="breadcrumb">              
            <span>Você está em:</span>
            <Link to="/processes" className="breadcrumb-link">
              Processos Seletivos
            </Link>
            <i className="fas fa-greater-than"></i>
            <Link to={`/processes/${this.props.match.params.process_id}`} className="breadcrumb-link">
              Edital XXX/XXXX
            </Link>
            <i className="fas fa-greater-than"></i>
            <Link
                to={`/processes/${this.props.match.params.process_id}/calls/${this.props.match.params.call_id}`} className="breadcrumb-link"                >
                Chamada XXX
              </Link>
            <i className="fas fa-greater-than"></i>
            <span>Excluir oferta de vaga</span>
          </div>

          <div className="form-container" id="main">
            <h1>Excluir oferta de vaga</h1>
            <AlertError errors={errorStore} />
            {this.renderInfo(vacancy, loading)}
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
