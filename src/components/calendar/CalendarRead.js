/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AlertError from '../../components/common/AlertError'

import DrawFilter from '../profile/DrawFilter'

const CalendarRead = props => {
  const { location } = props
  //const { process, call } = props
  //const { updateData, calendarOptions, errors, errorStore } = props
  //const { onChange, onCheck, onSubmit } = props

  //dummy props
  const process = null
  const call = null
  const calendar = null
  const errorStore = {}

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
        <span>{calendar ? `Evento: ${calendar.name}` : 'Evento'}</span>
      </div>
    )
  }

  const renderTitle = calendar => {
    return <h1>Evento: {calendar ? calendar.name : null}</h1>
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
          <strong>Abertura: </strong>
          {calendar ? moment(calendar.start).format('DD/MM/YYYY') : null}
        </p>
        <p>
          <strong>Encerramento: </strong>
          {calendar ? (calendar.end ? `${moment(calendar.end).format('DD/MM/YYYY')}` : null) : null}
        </p>
        <p>
          <strong>Pronto: </strong>
          {calendar ? (calendar.ready ? 'Prnto' : 'Pendente') : null}
        </p>
        <p>
          <strong>Status: </strong>
          {calendar ? calendar.status : null}
        </p>
      </section>
    )
  }

  return (
    <div className='calendar-read'>
      <div className='container'>
        {renderBreadcrumb(process, call)}
        <div className='main'>
          {renderTitle(calendar)}
          {renderUpdateButton(process, calendar, location)}
          <AlertError errors={errorStore} />
          {renderInfo(calendar)}
          <p>Dados de IncriptionEvent associado.</p>
        </div>
      </div>
    </div>
  )
}

export default CalendarRead
