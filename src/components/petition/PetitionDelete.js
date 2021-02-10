/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AlertError from '../../components/common/AlertError'
import { isEmpty, checkNested } from '../../utils/objectHelpers'

const PetitionDelete = props => {
  const { errors, errorStore, history } = props
  const { onSubmit } = props
  const { petition } = props

  const renderBreadcrumb = petition => {
    const petitionEvent = checkNested(petition, 'petitionEvent') ? petition.petitionEvent : null

    const call = checkNested(petition, 'petitionEvent', 'calendar', 'call')
      ? petition.petitionEvent.calendar.call
      : null

    const process = checkNested(petition, 'petitionEvent', 'calendar', 'call', 'process')
      ? petition.petitionEvent.calendar.call.process
      : null

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
        <Link to={`/petition-event/read/${petitionEvent ? petitionEvent.id : null}`} className='breadcrumb-link'>
          {'Evento de recurso'}
        </Link>

        <i className='fas fa-greater-than' />
        <span>Excluir recurso</span>
      </div>
    )
  }

  const renderInfo = petition => {
    const process = checkNested(petition, 'petitionEvent', 'calendar', 'call', 'process')
      ? petition.petitionEvent.calendar.call.process
      : null

    const call = checkNested(petition, 'petitionEvent', 'calendar', 'call')
      ? petition.petitionEvent.calendar.call
      : null

    const inscription = checkNested(petition, 'inscription') ? petition.inscription : null

    const person = checkNested(petition, 'inscription', 'person') ? petition.inscription.person : null

    return (
      <div>
        <p>
          <strong>Id: </strong>
          {petition ? petition.id : null}
        </p>
        <p>
          <strong>Processo: </strong>
          {`${process ? process.number : ''}/${process ? process.year : ''} - ${
            process ? process.Course.name : ''
          } | Chamada ${call ? call.number : ''}`}
        </p>

        <p>
          <strong>Data do recurso: </strong>
          {petition ? moment(petition.createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss') : null}
        </p>

        <p>
          <strong>Usuário: </strong>
          {person ? `${person.name} ${person.surname}` : null}
        </p>

        <p>
          <strong>Inscrição: </strong>
          {inscription ? inscription.number : null}
        </p>

        <p>
          <strong>Oferta: </strong>
          {checkNested(inscription, 'vacancy', 'assignment') ? `${inscription.vacancy.assignment.name}` : ''}
          {checkNested(inscription, 'vacancy', 'region') ? ` - ${inscription.vacancy.region.name}` : ''}
          {checkNested(inscription, 'vacancy', 'restriction') ? ` - ${inscription.vacancy.restriction.name}` : ''}
        </p>

        <p>
          <strong>Título: </strong>
          {petition ? petition.title : null}
        </p>
      </div>
    )
  }

  const renderChoices = (onSubmit, history) => {
    return (
      <form noValidate onSubmit={onSubmit}>
        <div className='row'>
          <div className='col'>
            <input type='submit' value='Excluir' className='btn btn-primary btn-block mt-4' />
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
      </form>
    )
  }

  const renderErrorMessage = errors => {
    if (!isEmpty(errors)) {
      return (
        <>
          {errors.message ? <p className='text-danger'>{errors.message}</p> : null}
          {errors.id ? <p className='text-danger'>{errors.id}</p> : null}
        </>
      )
    }
  }

  return (
    <div className='inscriptionEvent-delete'>
      <div className='container'>
        {renderBreadcrumb(petition)}
        <div className='form-container' id='main'>
          <h1>Excluir Recurso</h1>
          <AlertError errors={errorStore} />
          {renderErrorMessage(errors)}
          {renderInfo(petition)}
          {renderChoices(onSubmit, history)}
        </div>
      </div>
    </div>
  )
}

export default PetitionDelete
