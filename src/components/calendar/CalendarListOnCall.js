/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import DrawFilter from '../../components/profile/DrawFilter'
import moment from 'moment'

const CalendarListOnCall = props => {
  const { call, course_id } = props

  const renderCreateButton = (call, course_id) => {
    return (
      <div className='btn-right'>
        <DrawFilter permission='calendar_create' course_id={course_id}>
          <Link className='btn btn-terciary' to={`/call/read/${call ? call.id : null}/calendar/create`}>
            <i className='fas fa-plus-circle' /> Adicionar
          </Link>
        </DrawFilter>
      </div>
    )
  }

  const renderCalendarList = (call, course_id) => {
    return (
      <div>
        {call && call.calendars.length > 0 ? (
          <ul className='table-list'>
            <div className='titulos'>
              <span>Evento</span>
              <span>Datas</span>
              <span>Pronto</span>
              <span>Status</span>
              <span />
            </div>

            {call.calendars.map(calendar => {
              return (
                <li key={calendar.id}>
                  <h3>{calendar.name}</h3>
                  <p>
                    {moment(calendar.start).format('DD/MM/YYYY')}
                    {calendar.end ? ` até ${moment(calendar.end).format('DD/MM/YYYY')}` : null}
                  </p>
                  <p>{calendar.ready ? 'Pronto' : 'Pendente'}</p>
                  <p>{calendar.status}</p>
                  <p className='text-right'>
                    <DrawFilter permission='calendar_read' course_id={course_id}>
                      <Link className='btn-icon laranja' to={`/calendar/read/${calendar.id}`}>
                        <i className='fas fa-eye' />
                      </Link>
                    </DrawFilter>{' '}
                    <DrawFilter permission='calendar_update' course_id={course_id}>
                      <Link className='btn-icon' to={`/calendar/update/${calendar.id}`}>
                        <i className='fas fa-pencil-alt' />
                      </Link>
                    </DrawFilter>{' '}
                    <DrawFilter permission='calendar_delete' course_id={course_id}>
                      <Link className='btn-icon' to={`/calendar/delete/${calendar.id}`}>
                        <i className='fas fa-trash' />
                      </Link>
                    </DrawFilter>
                  </p>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className='mb-0'>Sem itens de calendário cadastrados.</p>
        )}
      </div>
    )
  }

  return (
    <section id='calendarios' className='quadro'>
      <h4>Calendário de eventos</h4>
      {renderCreateButton(call, course_id)}
      {renderCalendarList(call, course_id)}
    </section>
  )
}

export default CalendarListOnCall
