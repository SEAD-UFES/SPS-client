/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { checkNested } from '../../utils/objectHelpers'
import DrawFilter from '../../components/profile/DrawFilter'

const PetitionEventListOnCalendar = props => {
  const { calendar, course_id } = props

  const renderPetitionEventList = (calendar, course_id) => {
    const hasPetitionEvent =
      checkNested(calendar, 'petitionEvents') && calendar.petitionEvents.length > 0 ? true : false

    return (
      <div>
        {hasPetitionEvent ? (
          <section>
            <p>
              <strong>Evento de inscrição associado: </strong>
              {checkNested(calendar.petitionEvents[0], 'inscriptionEvent', 'calendar', 'name')
                ? calendar.petitionEvents[0].inscriptionEvent.calendar.name
                : 'none'}
            </p>
            <p>
              <DrawFilter permission='petitionevent_read' course_id={course_id}>
                <Link
                  className='btn-icon laranja'
                  title='Acessar evento de recurso'
                  to={`/petition-event/read/${calendar.petitionEvents[0].id}`}>
                  <i className='fas fa-eye' />
                </Link>
              </DrawFilter>{' '}
              <DrawFilter permission='petitionevent_delete' course_id={course_id}>
                <Link
                  className='btn-icon'
                  title='Excluir evento de recurso'
                  to={`/petition-event/delete/${calendar.petitionEvents[0].id}`}>
                  <i className='fas fa-trash' />
                </Link>
              </DrawFilter>
            </p>
          </section>
        ) : (
          <p className='mb-0'>Carregando...</p>
        )}
      </div>
    )
  }

  return (
    <section id='petitionEvents' className='quadro'>
      <h4>Evento de recurso</h4>
      {renderPetitionEventList(calendar, course_id)}
    </section>
  )
}

export default PetitionEventListOnCalendar
