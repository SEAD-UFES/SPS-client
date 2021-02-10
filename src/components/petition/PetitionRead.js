/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AlertError from '../../components/common/AlertError'
import { isEmpty, checkNested } from '../../utils/objectHelpers'
import DrawFilter from '../profile/DrawFilter'
import Spinner from '../common/Spinner'

const PetitionRead = props => {
  const { errors, errorStore } = props
  const { petition } = props
  const { petitionReplyLoading } = props

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
        <span>Recurso</span>
      </div>
    )
  }

  const renderInfo = petition => {
    const inscription = checkNested(petition, 'inscription') ? petition.inscription : null
    const person = checkNested(petition, 'inscription', 'person') ? petition.inscription.person : null

    return (
      <>
        <dl className='row dl-data'>
          <dt className='col-sm-3'>Usuário:</dt>
          <dd className='col-sm-9'>{person ? `${person.name} ${person.surname}` : null}</dd>

          <dt className='col-sm-3'>Inscrição:</dt>
          <dd className='col-sm-9'>{inscription ? inscription.number : null}</dd>

          <dt className='col-sm-3'>Oferta:</dt>
          <dd className='col-sm-9'>
            {checkNested(inscription, 'vacancy', 'assignment') ? `${inscription.vacancy.assignment.name}` : ''}
            {checkNested(inscription, 'vacancy', 'region') ? ` - ${inscription.vacancy.region.name}` : ''}
            {checkNested(inscription, 'vacancy', 'restriction') ? ` - ${inscription.vacancy.restriction.name}` : ''}
          </dd>
        </dl>

        <dl className='row dl-data'>
          <dt className='col-sm-3'>Data do recurso:</dt>
          <dd className='col-sm-9'>
            {petition ? moment(petition.createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss') : null}
          </dd>

          <dt className='col-sm-3'>Título:</dt>
          <dd className='col-sm-9'>{petition ? petition.title : null}</dd>

          <dt className='col-sm-3'>Descrição:</dt>
          <dd className='col-sm-9'>{petition ? petition.description : null}</dd>
        </dl>
      </>
    )
  }

  const renderReply = petition => {
    const reply = checkNested(petition, 'petitionReply') ? petition.petitionReply : null
    const course_id = checkNested(petition, 'petitionEvent', 'calendar', 'call', 'process')
      ? petition.petitionEvent.calendar.call.process.course_id
      : null

    if (petitionReplyLoading) return <Spinner />

    if (!reply) {
      return (
        <>
          <h4>Resposta</h4>
          <p>Este recurso ainda não foi respondido.</p>
          <DrawFilter permission='petitionreply_create' course_id={course_id}>
            <Link to={`/petition-reply/create/?petition_id=${petition ? petition.id : null}`}>Responder</Link>
          </DrawFilter>
        </>
      )
    }

    return (
      <>
        <h4>Resposta</h4>
        <dl className='row dl-data'>
          <dt className='col-sm-3'>Status:</dt>
          <dd className='col-sm-9'>{reply ? (reply.status ? 'Deferido' : 'Indeferido') : ''}</dd>
          <dt className='col-sm-3'>Justificativa:</dt>
          <dd className='col-sm-9'>{reply ? reply.justification : ''}</dd>
        </dl>
      </>
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
    <div className='view-page'>
      <div className='container'>
        {renderBreadcrumb(petition)}
        <div className='main' id='main'>
          <h1>Recurso</h1>
          <AlertError errors={errorStore} />
          {renderErrorMessage(errors)}
          {renderInfo(petition)}
          {renderReply(petition)}
        </div>
      </div>
    </div>
  )
}

export default PetitionRead
