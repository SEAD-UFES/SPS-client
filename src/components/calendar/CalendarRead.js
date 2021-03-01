/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AlertError from '../../components/common/AlertError'

import DrawFilter from '../profile/DrawFilter'
import InscriptionEventListOnCalendar from '../inscriptionEvent/InscriptionEventListOnCalendar'
import { checkNested } from '../../utils/objectHelpers'
import PetitionEventListOnCalendar from '../petitionEvent/PetitionEventListOnCalendar'

const CalendarRead = props => {
  const { location } = props
  const { process, call, calendar, calendarGroupLoading } = props
  const { errorStore } = props

  const renderBreadcrumb = (process, call) => {
    return (
      <div className='breadcrumb'>
        <span>Você está em:</span>
        <Link to='/processes' className='breadcrumb-link'>
          Processos Seletivos
        </Link>

        <i className='fas fa-greater-than' />
        <Link to={`/processes/read/${process ? process.id : null}`} className='breadcrumb-link'>
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
            title='Atualizar evento'
            to={{
              pathname: `/calendar/update/${calendar ? calendar.id : null}`,
              prevLocation: location
            }}>
            <i className='fas fa-cog' /> Atualizar
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

  const renderAddEventType = (calendar, calendarGroupLoading) => {
    const hasInscriptionEvent =
      checkNested(calendar, 'inscriptionEvents') && calendar.inscriptionEvents.length > 0 ? true : false
    const hasPetitionEvent =
      checkNested(calendar, 'petitionEvents') && calendar.petitionEvents.length > 0 ? true : false

    const hasEvent = hasInscriptionEvent || hasPetitionEvent ? true : false

    if (!calendarGroupLoading && !hasEvent) {
      return (
        <div style={{ padding: '10px' }}>
          <section id='eventos' className='quadro'>
            <h4>Adicionar tipo de evento</h4>
            <ul>
              <li className='list-group-item'>
                <Link
                  title='Novo evento de inscrição'
                  to={`/inscription-event/create?calendar_id=${calendar ? calendar.id : null}`}>
                  Evento de inscrições
                </Link>
              </li>
              <li className='list-group-item'>
                <Link
                  title='Novo evento de recursos'
                  to={`/petition-event/create?calendar_id=${calendar ? calendar.id : null}`}>
                  Evento de recursos
                </Link>
              </li>
            </ul>
          </section>
        </div>
      )
    }
    return null
  }

  const renderInscriptionEvent = calendar => {
    const hasInscriptionEvent =
      checkNested(calendar, 'inscriptionEvents') && calendar.inscriptionEvents.length > 0 ? true : false

    if (hasInscriptionEvent) {
      return <InscriptionEventListOnCalendar calendar={calendar} course_id={process ? process.course_id : ''} />
    }

    return null
  }

  const renderPetitionEvent = calendar => {
    const hasPetitionEvent =
      checkNested(calendar, 'petitionEvents') && calendar.petitionEvents.length > 0 ? true : false

    if (hasPetitionEvent) {
      return <PetitionEventListOnCalendar calendar={calendar} course_id={process ? process.course_id : ''} />
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
          {renderAddEventType(calendar, calendarGroupLoading)}
          {renderInscriptionEvent(calendar)}
          {renderPetitionEvent(calendar)}
        </div>
      </div>
    </div>
  )
}

export default CalendarRead
