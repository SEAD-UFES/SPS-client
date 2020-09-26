/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import DrawFilter from '../../components/profile/DrawFilter'
import { checkNested } from '../../utils/objectHelpers'

const InscriptionEventListOnCalendar = props => {
  const { calendar, course_id } = props

  const renderInscriptionEventList = (calendar, course_id) => {
    return (
      <div>
        {checkNested(calendar, 'inscriptionEvents') && calendar.inscriptionEvents.length > 0 ? (
          <ul className='table-list'>
            <div className='titulos'>
              <span>Número de inscrições</span>
              <span>Cargos</span>
              <span>Regiões</span>
              <span>Restrições</span>
              <span />
            </div>
            {calendar.inscriptionEvents.map(IE => {
              return (
                <li key={IE.id}>
                  <h3>
                    {IE.numberOfInscriptionsAllowed !== 0
                      ? `${IE.numberOfInscriptionsAllowed} inscrições por usuário`
                      : 'Inscrições ilimitadas'}
                  </h3>
                  <p>{IE.allowMultipleAssignments ? 'Múltiplos cargos' : 'Apenas um cargo'}</p>
                  <p>{IE.allowMultipleRegions ? 'Múltiplas regiões' : 'Apenas uma região'}</p>
                  <p>{IE.allowMultipleRestrictions ? 'Múltiplas restrições' : 'Apenas uma restrição'}</p>
                  <p className='text-right'>
                    <DrawFilter permission='inscriptionevent_read' course_id={course_id}>
                      <Link className='btn-icon laranja' to={`/inscription-event/read/${IE.id}`}>
                        <i className='fas fa-eye' />
                      </Link>
                    </DrawFilter>{' '}
                    <DrawFilter permission='inscriptionevent_update' course_id={course_id}>
                      <Link className='btn-icon' to={`/inscription-event/update/${IE.id}`}>
                        <i className='fas fa-pencil-alt' />
                      </Link>
                    </DrawFilter>{' '}
                    <DrawFilter permission='inscriptionevent_delete' course_id={course_id}>
                      <Link className='btn-icon' to={`/inscription-event/delete/${IE.id}`}>
                        <i className='fas fa-trash' />
                      </Link>
                    </DrawFilter>
                  </p>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className='mb-0'>Sem evento de inscrição cadastrado.</p>
        )}
      </div>
    )
  }

  return (
    <section id='inscriptionEvents' className='quadro'>
      <h4>Evento de inscrição</h4>
      {renderInscriptionEventList(calendar, course_id)}
    </section>
  )
}

export default InscriptionEventListOnCalendar
