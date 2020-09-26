/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AlertError from '../../components/common/AlertError'
import { checkNested, isEmpty } from '../../utils/objectHelpers'

const CalendarDelete = props => {
  const { process, call, calendar, history } = props
  const { errorStore, errors } = props
  const { onSubmit } = props

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
        <span>Excluir calendário</span>
      </div>
    )
  }

  const renderInfo = (process, call, calendar) => {
    return (
      <div>
        <p>
          <strong>Id: </strong>
          {calendar ? calendar.id : null}
        </p>
        <p>
          <strong>Processo: </strong>
          {`${process ? process.number : null}/${process ? process.year : null} - ${
            process ? process.Course.name : null
          } | Chamada ${call ? call.number : null}`}
        </p>

        <p>
          <strong>Nome: </strong>
          {checkNested(calendar, 'name') ? calendar.name : null}
        </p>

        <p>
          <strong>Início: </strong>
          {checkNested(calendar, 'start') ? moment(calendar.start).format('DD/MM/YYYY HH:mm:ss') : null}
        </p>

        <p>
          <strong>Encerramento: </strong>
          {checkNested(calendar, 'end') ? moment(calendar.end).format('DD/MM/YYYY HH:mm:ss') : null}
        </p>

        <p>
          <strong>Depende de: </strong>
          {checkNested(calendar, 'calendar', 'name') ? calendar.calendar.name : 'Sem dependência'}
        </p>

        <p>
          <strong>Pronto: </strong>
          {calendar ? (calendar.ready ? 'Sim' : 'Não') : 'Não'}
        </p>
      </div>
    )
  }

  const renderChoices = (onSubmit, history) => {
    return (
      <div className='row'>
        <div className='col'>
          <input type='button' value='Excluir' className='btn btn-primary btn-block mt-4' onClick={onSubmit} />
        </div>
        <div className='col'>
          <input
            type='button'
            value='Cancelar'
            className='btn btn-secondary btn-block mt-4'
            onClick={() => {
              history.goBack()
            }}
          />
        </div>
      </div>
    )
  }

  const renderErrorMessage = errors => {
    if (!isEmpty(errors)) {
      return <p className='text-danger'>{errors.message || errors.id}</p>
    }
  }

  return (
    <div className='calendar-delete'>
      <div className='container'>
        {renderBreadcrumb(process, call)}
        <div className='form-container' id='main'>
          <h1>Excluir calendário</h1>
          <AlertError errors={errorStore} />
          {renderErrorMessage(errors)}
          {renderInfo(process, call, calendar)}
          {renderChoices(onSubmit, history)}
        </div>
      </div>
    </div>
  )
}

export default CalendarDelete
