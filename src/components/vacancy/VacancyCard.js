import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import DrawFilter from '../profile/DrawFilter'
import { compareByAssignmentName } from 'utils/compareBy'

export default class VacancyCard extends Component {
  renderTable(call) {
    return (
      <table className="table table-hover mt-0 mb-0">
        <thead>
          <tr>
            <th>Atribuição</th>
            <th>Local</th>
            <th>Restrição</th>
            <th>Vagas</th>
            <th>Reserva</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {call.Vacancies.sort(compareByAssignmentName).map(vacancy => {
            return (
              <tr key={vacancy.id}>
                <td>{vacancy.Assignment.name}</td>
                <td>{vacancy.Region ? vacancy.Region.name : <span className="text-secondary">...</span>}</td>
                <td>{vacancy.Restriction ? vacancy.Restriction.name : <span className="text-secondary">...</span>}</td>
                <td>{vacancy.qtd}</td>
                <td>{vacancy.reserve ? 'C.R.' : 'Não'}</td>
                <td className="text-right">
                  <DrawFilter permission="chamada editar" course_id={this.props.course_id}>
                    <Link
                      className="text-info"
                      to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/vacancies/${vacancy.id}/edit`}>
                      <i className="fas fa-cog" />
                    </Link>
                  </DrawFilter>{' '}
                  <DrawFilter permission="chamada apagar" course_id={this.props.course_id}>
                    <Link
                      className="text-danger"
                      to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/vacancies/${vacancy.id}/delete`}>
                      <i className="fas fa-times-circle" />
                    </Link>
                  </DrawFilter>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h4 className="mb-0">Ofertas de vaga</h4>
            </div>
            <div className="col">
              <div className="float-right">
                <DrawFilter permission="chamada criar" course_id={this.props.process_id}>
                  <Link
                    className="text-success"
                    to={`/processes/${this.props.call.selectiveProcess_id}/calls/${
                      this.props.call.id
                    }/vacancies/create`}>
                    <i className="fas fa-plus-circle" /> Adicionar
                  </Link>
                </DrawFilter>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          {this.props.call.Vacancies.length > 0 ? (
            this.renderTable(this.props.call)
          ) : (
            <p className="mb-0">Sem oferta de vagas cadastradas.</p>
          )}
        </div>
      </div>
    )
  }
}
