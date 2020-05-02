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

const CalendarListOnCall = props => {
  const { call, course_id } = props

  const dummyCalendars = [
    {
      id: '01',
      start: '01/03/2020',
      end: '10/03/2020',
      name: 'Periodo de inscrições',
      ready: true,
      status: 'Encerrado.'
    },
    {
      id: '02',
      start: '12/03/2020',
      end: '',
      name: 'Etapa 01 - Resultado',
      ready: false,
      status: 'Atrasado...'
    },
    {
      id: '03',
      start: '13/03/2020',
      end: '15/03/2020',
      name: 'Etapa 01 - Recursos',
      ready: true,
      status: 'Dependencia atrasada...'
    },
    {
      id: '04',
      start: '17/03/2020',
      end: '',
      name: 'Etapa 01 - Resultado pós-recurso',
      ready: false,
      status: 'Aguardando...'
    },
    {
      id: '05',
      start: '20/03/2020',
      end: '25/03/2020',
      name: 'Etapa 02 - Periodo de entrevistas',
      ready: false,
      status: 'Aguardando...'
    },
    {
      id: '06',
      start: '27/03/2020',
      end: '',
      name: 'Etapa 02 - Resultado',
      ready: false,
      status: 'Aguardando...'
    },
    {
      id: '07',
      start: '28/03/2020',
      end: '30/03/2020',
      name: 'Etapa 02 - Recursos',
      ready: true,
      status: 'Aguardando...'
    },

    {
      id: '08',
      start: '02/04/2020',
      end: '',
      name: 'Etapa 02 - Resultado pós-recurso e final.',
      ready: false,
      status: 'Aguardando...'
    }
  ]

  const renderCreateButton = (call, course_id) => {
    return (
      <div className='btn-right'>
        <DrawFilter permission='calendar_create' course_id={course_id}>
          <Link className='btn btn-terciary' to={`/call/${call ? call.id : null}/calendar/create`}>
            <i className='fas fa-plus-circle' /> Adicionar
          </Link>
        </DrawFilter>
      </div>
    )
  }

  const renderCalendarList = (call, course_id) => {
    return (
      <div>
        {call && dummyCalendars.length > 0 ? (
          <ul className='table-list'>
            <div className='titulos'>
              <span>Evento</span>
              <span>Início/Encerramento</span>
              <span>Pronto/Status</span>
              <span />
            </div>

            {dummyCalendars.map(calendar => {
              return (
                <li key={calendar.id}>
                  <h3>{calendar.name}</h3>
                  <p>
                    {' '}
                    {calendar.start}
                    {calendar.end ? ` - ${calendar.end}` : null}
                  </p>
                  <p>
                    {calendar.ready ? 'Pronto' : 'Não'}/{calendar.status}
                  </p>
                  <p className='text-right'>
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
    <section id='ofertas' className='quadro'>
      <h4>Calendário de eventos</h4>
      {renderCreateButton(call, course_id)}
      {renderCalendarList(call, course_id)}
    </section>
  )
}

export default CalendarListOnCall
