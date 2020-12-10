/** @format */

import React from 'react'

import { checkNested } from '../../utils/objectHelpers'

const PetitionEventListOnCalendar = props => {
  const { calendar, course_id } = props

  const renderPetitionEventList = (calendar, course_id) => {
    return (
      <div>
        {checkNested(calendar, 'petitionEvents') && calendar.petitionEvents.length > 0 ? (
          <ul className='table-list'>
            <div className='titulos'>
              <span>id</span>
              <span>calendar_id</span>
              <span>inscriptionEvent_id</span>
              <span>-</span>
              <span />
            </div>
            {calendar.petitionEvents.map(PE => {
              return (
                <li key={PE.id}>
                  <h3>{PE.id}</h3>
                  <p>{PE.calendar_id}</p>
                  <p>{PE.inscriptionEvent_id}</p>
                  <p>-</p>
                  <p className='text-right'>-</p>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className='mb-0'>Sem evento de recurso cadastrado.</p>
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
