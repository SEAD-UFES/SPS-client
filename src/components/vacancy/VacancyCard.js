import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import DrawFilter from '../profile/DrawFilter'
import { compareByAssignmentName } from 'utils/compareBy'

export default class VacancyCard extends Component {
  renderTable(call) {
    return (
      <ul className="table-list">
        <div class="titulos">
          <span>Atribuição</span>
          <span>Vagas</span>
          <span>Local</span>
          <span>Restrição</span>
          <span>Reserva</span>
          <span></span>
        </div>

          {call.Vacancies.sort(compareByAssignmentName).map(vacancy => {
            return (
              <li key={vacancy.id}>
                <h3>{vacancy.Assignment.name}</h3>
                <p>{vacancy.qp}</p>
                <p>{vacancy.Region ? vacancy.Region.name : <span className="text-secondary">...</span>}</p>
                <p>{vacancy.Restriction ? vacancy.Restriction.name : <span className="text-secondary">...</span>}</p>
                <p>{vacancy.reserve ? 'C.R.' : 'Não'}</p>
                <p className="text-right">
                  <DrawFilter permission="vacancy_update" course_id={this.props.course_id}>
                    <Link
                      className="icon-edit"
                      to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/vacancies/${vacancy.id}/edit`}>
                      <i class="fas fa-pencil-alt"></i>
                    </Link>
                  </DrawFilter>{' '}
                  <DrawFilter permission="vacancy_delete" course_id={this.props.course_id}>
                    <Link
                      className="icon-delete"
                      to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/vacancies/${vacancy.id}/delete`}>
                      <i class="fas fa-trash"></i>
                    </Link>
                  </DrawFilter>
                </p>
              </li>
            )
          })}
      </ul>
    )
  }

  render() {
    return (
      <section id="ofertas" class="quadro">
        <h4>Ofertas de vaga</h4>

        <div className="btn-right">
          <DrawFilter permission="vacancy_create" course_id={this.props.process_id}>
            <Link
              className="btn btn-terciary"
              to={`/processes/${this.props.call.selectiveProcess_id}/calls/${this.props.call.id}/vacancies/create`}>
              <i className="fas fa-plus-circle" /> Adicionar
            </Link>
          </DrawFilter>
        </div>

        <div>
          {this.props.call.Vacancies.length > 0 ? (
            this.renderTable(this.props.call)
          ) : (
            <p className="mb-0">Sem oferta de vagas cadastradas.</p>
          )}
        </div>
      </section>
    )
  }
}
