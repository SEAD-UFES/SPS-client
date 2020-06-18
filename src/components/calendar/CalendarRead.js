/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AlertError from '../../components/common/AlertError'

import DrawFilter from '../profile/DrawFilter'
import InscriptionEventListOnCalendar from '../inscriptionEvent/InscriptionEventListOnCalendar'
import { checkNested } from '../../utils/objectHelpers'

const CalendarRead = props => {
  const { location } = props
  const { process, call, calendar } = props
  const { errorStore } = props

  const renderBreadcrumb = (process, call) => {
    return (
      <div className='breadcrumb'>
        <span>Você está em:</span>
        <Link to='/processes' className='breadcrumb-link'>
          Processos Seletivos
        </Link>

        <i className='fas fa-greater-than' />
        <Link to={`/processes/${process ? process.id : null}`} className='breadcrumb-link'>
          {process ? `Edital ${process.number}/${process.year}` : 'Edital'}
        </Link>

        <i className='fas fa-greater-than' />
        <Link to={`/call/read/${call ? call.id : null}`} className='breadcrumb-link'>
          {call ? `Chamada ${call.number}` : 'Chamada'}
        </Link>

        <i className='fas fa-greater-than' />
        <span>{calendar ? `Calendário (${calendar.name})` : 'Calendário'}</span>
      </div>
    )
  }

  const renderTitle = calendar => {
    return <h1>Calendário ({calendar ? calendar.name : null})</h1>
  }

  const renderUpdateButton = (process, calendar, location) => {
    return (
      <div className='btn-right'>
        <DrawFilter permission='calendar_update' course_id={process ? process.course_id : null}>
          <Link
            className='btn btn-primary'
            to={{
              pathname: `/calendar/update/${calendar ? calendar.id : null}`,
              prevLocation: location
            }}>
            <i className='fas fa-cog' /> Editar
          </Link>
        </DrawFilter>
      </div>
    )
  }

  const renderInfo = calendar => {
    return (
      <section>
        <p>
          <strong>Nome: </strong>
          {calendar ? calendar.name : null}
        </p>
        <p>
          <strong>Data: </strong>
          {calendar ? moment(calendar.start).format('DD/MM/YYYY') : null}
          {calendar ? (calendar.end ? ` até ${moment(calendar.end).format('DD/MM/YYYY')}` : null) : null}
        </p>
        <p>
          <strong>Pronto: </strong>
          {calendar ? (calendar.ready ? 'Pronto' : 'Pendente') : null}
        </p>
        <p>
          <strong>Status: </strong>
          {calendar ? calendar.status : null}
        </p>
      </section>
    )
  }

  const renderAddEventType = calendar => {
    const hasInscriptionEvent =
      checkNested(calendar, 'inscriptionEvents') && calendar.inscriptionEvents.length > 0 ? true : false
    const hasEvent = hasInscriptionEvent ? true : false

    if (!hasEvent) {
      return (
        <div style={{ padding: '10px' }}>
          <section id='eventos' className='quadro'>
            <h4>Adicionar tipo de evento</h4>
            <ul>
              <li className='list-group-item'>
                <Link to={`${props.match.url}/inscription-event/create`}>Evento de inscrições</Link>
              </li>
            </ul>
          </section>
        </div>
      )
    }

    return null
  }

  const renderIsncriptionEvent = calendar => {
    const hasInscriptionEvent =
      checkNested(calendar, 'inscriptionEvents') && calendar.inscriptionEvents.length > 0 ? true : false

    if (hasInscriptionEvent) {
      return <InscriptionEventListOnCalendar calendar={calendar} course_id={process ? process.course_id : ''} />
    }

    return null
  }

  return (
    <div className='view-page'>
      <div className='container'>
        {renderBreadcrumb(process, call)}
        <div className='main'>
          {renderTitle(calendar)}
          {renderUpdateButton(process, calendar, location)}
          <AlertError errors={errorStore} />
          {renderInfo(calendar)}
          {renderAddEventType(calendar)}
          {renderIsncriptionEvent(calendar)}
        </div>
      </div>
    </div>
  )
}

export default CalendarRead
