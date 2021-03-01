/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AlertError from '../../components/common/AlertError'
import { isEmpty, checkNested } from '../../utils/objectHelpers'
import SelectListGroup from '../common/SelectListGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { convertBooleanToString } from '../../utils/typeHelpers'

const PetitionReplyCreate = props => {
  const { errors, errorStore } = props
  const { onChange, onChangeAccepted, onSubmit } = props
  const { petition, createData, acceptedOptions } = props

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
        <Link to={`/petition/read/${petition ? petition.id : null}`} className='breadcrumb-link'>
          {'Recurso'}
        </Link>

        <i className='fas fa-greater-than' />
        <span>Responder recurso</span>
      </div>
    )
  }

  const renderInfo = petition => {
    const inscription = checkNested(petition, 'inscription') ? petition.inscription : null

    const person = checkNested(petition, 'inscription', 'person') ? petition.inscription.person : null

    return (
      <div>
        <h4>Dados do recurso</h4>
        <dl className='row dl-data'>
          <dt className='col-sm-4'>Usuário:</dt>
          <dd className='col-sm-8'>{person ? `${person.name} ${person.surname}` : null}</dd>

          <dt className='col-sm-4'>Inscrição:</dt>
          <dd className='col-sm-8'>{inscription ? inscription.number : null}</dd>

          <dt className='col-sm-4'>Oferta:</dt>
          <dd className='col-sm-8'>
            {checkNested(inscription, 'vacancy', 'assignment') ? `${inscription.vacancy.assignment.name}` : ''}
            {checkNested(inscription, 'vacancy', 'region') ? ` - ${inscription.vacancy.region.name}` : ''}
            {checkNested(inscription, 'vacancy', 'restriction') ? ` - ${inscription.vacancy.restriction.name}` : ''}
          </dd>
        </dl>

        <dl className='row dl-data'>
          <dt className='col-sm-4'>Data do recurso:</dt>
          <dd className='col-sm-8'>
            {petition ? moment(petition.createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss') : null}
          </dd>

          <dt className='col-sm-4'>Título:</dt>
          <dd className='col-sm-8'>{petition ? petition.title : null}</dd>

          <dt className='col-sm-4'>Descrição:</dt>
          <dd className='col-sm-8'>{petition ? petition.description : null}</dd>
        </dl>
      </div>
    )
  }

  const renderForm = () => {
    return (
      <div>
        <h4>Resposta</h4>

        <form noValidate onSubmit={onSubmit}>
          <SelectListGroup
            name='accepted'
            label='Status'
            placeholder='Veredito do recurso.'
            value={convertBooleanToString(createData.accepted)}
            options={acceptedOptions}
            onChange={onChangeAccepted}
            error={errors.accepted}
          />

          <TextAreaFieldGroup
            name='justification'
            label='Justificativa'
            value={createData.justification}
            onChange={onChange}
            error={errors.justification}
            info='Inserir justificativa para status do recurso.'
          />

          <input type='submit' title='Excluir evento de recurso' className='btn btn-primary' value='Criar' />
        </form>
      </div>
    )
  }

  const renderErrorMessage = errors => {
    if (!isEmpty(errors)) {
      return (
        <>
          {errors.message ? <p className='text-danger'>{errors.message}</p> : null}
          {errors.id ? <p className='text-danger'>{errors.id}</p> : null}
          {errors.petition_id ? <p className='text-danger'>{errors.petition_id}</p> : null}
        </>
      )
    }
  }

  return (
    <div className='petitionreply-create'>
      <div className='container'>
        {renderBreadcrumb(petition)}
        <div className='form-container' id='main'>
          <h1>Responder recurso</h1>
          <AlertError errors={errorStore} />
          {renderErrorMessage(errors)}
          {renderInfo(petition)}
          {renderForm(petition)}
        </div>
      </div>
    </div>
  )
}

export default PetitionReplyCreate
