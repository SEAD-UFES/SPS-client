/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import DrawFilter from '../../components/profile/DrawFilter'

export const compareByAssignmentName = (a, b) => {
  const valueA = a.assignment ? a.assignment.name.toLowerCase() : ''
  const valueB = b.assignment ? b.assignment.name.toLowerCase() : ''

  if (valueA < valueB) return -1
  if (valueA > valueB) return 1
  return 0
}

const VacancyListOnCall = props => {
  const { call, course_id } = props

  const renderCreateButton = (call, course_id) => {
    return (
      <div className='btn-right'>
        <DrawFilter permission='vacancy_create' course_id={course_id}>
          <Link className='btn btn-terciary' to={`/call/read/${call ? call.id : null}/vacancy/create`}>
            <i className='fas fa-plus-circle' /> Adicionar
          </Link>
        </DrawFilter>
      </div>
    )
  }

  const renderVacancyList = (call, course_id) => {
    return (
      <div>
        {call && call.vacancies.length > 0 ? (
          <ul className='table-list'>
            <div className='titulos'>
              <span>Atribuição</span>
              <span>Vagas</span>
              <span>Local</span>
              <span>Restrição</span>
              <span>Reserva</span>
              <span />
            </div>

            {call.vacancies.sort(compareByAssignmentName).map(vacancy => {
              return (
                <li key={vacancy.id}>
                  <h3>{vacancy.assignment ? vacancy.assignment.name : null}</h3>
                  <p>{vacancy.qtd}</p>
                  <p>{vacancy.region ? vacancy.region.name : <span className='text-secondary'>...</span>}</p>
                  <p>{vacancy.restriction ? vacancy.restriction.name : <span className='text-secondary'>...</span>}</p>
                  <p>{vacancy.reserve ? 'C.R.' : 'Não'}</p>
                  <p className='text-right'>
                    <DrawFilter permission='vacancy_update' course_id={course_id}>
                      <Link className='btn-icon' to={`/vacancy/update/${vacancy.id}`}>
                        <i className='fas fa-pencil-alt' />
                      </Link>
                    </DrawFilter>{' '}
                    <DrawFilter permission='vacancy_delete' course_id={course_id}>
                      <Link className='btn-icon' to={`/vacancy/delete/${vacancy.id}`}>
                        <i className='fas fa-trash' />
                      </Link>
                    </DrawFilter>
                  </p>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className='mb-0'>Sem oferta de vagas cadastradas.</p>
        )}
      </div>
    )
  }

  return (
    <section id='ofertas' className='quadro'>
      <h4>Ofertas de vaga</h4>
      {renderCreateButton(call, course_id)}
      {renderVacancyList(call, course_id)}
    </section>
  )
}

export default VacancyListOnCall
