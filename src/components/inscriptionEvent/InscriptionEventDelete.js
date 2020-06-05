/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import AlertError from '../../components/common/AlertError'
import { isEmpty, checkNested } from '../../utils/objectHelpers'

const InscriptionEventDelete = props => {
  const { process, call, calendar, inscriptionEvent } = props
  const { errors, errorStore, history } = props
  const { onSubmit } = props

  const renderBreadcrumb = (process, call, calendar, inscriptionEvent) => {
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
        <Link to={`/calendar/read/${calendar ? calendar.id : null}`} className='breadcrumb-link'>
          {calendar ? `Calendário (${calendar.name})` : 'Calendário'}
        </Link>

        <i className='fas fa-greater-than' />
        <Link
          to={`/inscription-event/read/${inscriptionEvent ? inscriptionEvent.id : null}`}
          className='breadcrumb-link'>
          {'Evento de inscrição'}
        </Link>

        <i className='fas fa-greater-than' />
        <span>Excluir</span>
      </div>
    )
  }

  const renderInfo = (process, call, calendar, inscriptionEvent) => {
    return (
      <div>
        <p>
          <strong>Id: </strong>
          {inscriptionEvent ? inscriptionEvent.id : null}
        </p>
        <p>
          <strong>Processo: </strong>
          {`${process ? process.number : null}/${process ? process.year : null} - ${
            process ? process.Course.name : null
          } | Chamada ${call ? call.number : null}`}
        </p>

        <p>
          <strong>Calendário: </strong>
          {checkNested(calendar, 'name') ? calendar.name : null}
        </p>

        <p>
          <strong>Inscrições por usuário: </strong>
          {inscriptionEvent ? inscriptionEvent.numberOfInscriptionsAllowed : null}
        </p>

        <p>
          <strong>Permitir múltiplos cargos: </strong>
          {inscriptionEvent ? (inscriptionEvent.allowMultipleAssignments ? 'Sim' : 'Não') : null}
        </p>

        <p>
          <strong>Permitir múltiplas regiões: </strong>
          {inscriptionEvent ? (inscriptionEvent.allowMultipleRegions ? 'Sim' : 'Não') : null}
        </p>

        <p>
          <strong>Permitir múltiplas restrições: </strong>
          {inscriptionEvent ? (inscriptionEvent.allowMultipleRestrictions ? 'Sim' : 'Não') : null}
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
      return (
        <>
          {errors.message ? <p className='text-danger'>{errors.message}</p> : null}
          {errors.message ? <p className='text-danger'>{errors.id}</p> : null}
        </>
      )
    }
  }

  return (
    <div className='inscriptionEvent-delete'>
      <div className='container'>
        {renderBreadcrumb(process, call, calendar, inscriptionEvent)}
        <div className='form-container' id='main'>
          <h1>Excluir evento de inscrição</h1>
          <AlertError errors={errorStore} />
          {renderErrorMessage(errors)}
          {renderInfo(process, call, calendar, inscriptionEvent)}
          {renderChoices(onSubmit, history)}
        </div>
      </div>
    </div>
  )
}

export default InscriptionEventDelete
