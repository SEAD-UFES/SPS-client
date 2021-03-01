/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import AlertError from '../../components/common/AlertError'
import SelectListGroup from '../common/SelectListGroup'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { isEmpty } from '../../utils/objectHelpers'
import { permissionCheck } from '../profile/permissionCheck'
import { checkNested } from '../../utils/objectHelpers'

const PetitionCreate = props => {
  const { profileStore, petitionEvent, call, process } = props
  const { createData, userInscriptionOptions, errors, errorStore } = props
  const { onChange, onSubmit } = props

  const renderBreadcrumb = (process, call, petitionEvent) => {
    const canAccessCall = permissionCheck(
      checkNested(profileStore, 'profile', 'UserRoles') ? profileStore.profile.UserRoles : [],
      'call_read',
      { course_id: process ? process.course_id : null }
    )

    const callLink = canAccessCall ? (
      <Link to={`/call/read/${call ? call.id : null}`} className='breadcrumb-link'>
        {call ? `Chamada ${call.number}` : 'Chamada'}
      </Link>
    ) : (
      <span>{call ? `Chamada ${call.number}` : 'Chamada'}</span>
    )

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
        {callLink}

        <i className='fas fa-greater-than' />
        <Link to={`/petition-event/read/${petitionEvent ? petitionEvent.id : null}`} className='breadcrumb-link'>
          {'Evento de recurso'}
        </Link>

        <i className='fas fa-greater-than' />
        <span>Novo recurso</span>
      </div>
    )
  }

  const renderForm = (createData, errors, onChange, onSubmit) => {
    return (
      <form noValidate onSubmit={onSubmit}>
        <SelectListGroup
          name='inscription_id'
          label='Inscrição'
          placeholder='Escolha a inscrição para a qual abrirá recurso'
          value={createData.inscription_id}
          options={userInscriptionOptions}
          onChange={onChange}
          error={errors.inscription_id}
        />

        <TextFieldGroup
          type='text'
          name='title'
          label='Título'
          value={createData.title}
          onChange={onChange}
          error={errors.title}
        />

        <TextAreaFieldGroup
          name='description'
          label='Descrição'
          value={createData.description}
          onChange={onChange}
          error={errors.description}
          info='Inserir motivo do recurso e argumentação'
        />

        <input type='submit' title='Criar recurso' className='btn btn-primary' value='Criar' />
      </form>
    )
  }

  const renderErrorMessage = errors => {
    if (!isEmpty(errors)) {
      return (
        <>
          {errors.message ? <p className='text-danger'>{errors.message}</p> : null}
          {errors.message ? <p className='text-danger'>{errors.id}</p> : null}
          {errors.message ? <p className='text-danger'>{errors.petitionEvent_id}</p> : null}
        </>
      )
    }
  }

  return (
    <div className='petition-create'>
      <div className='container'>
        {renderBreadcrumb(process, call, petitionEvent)}
        <div className='form-container' id='main'>
          <h1>Novo recurso</h1>
          <AlertError errors={errorStore} />
          {renderErrorMessage(errors)}
          {renderForm(createData, errors, onChange, onSubmit)}
        </div>
      </div>
    </div>
  )
}

export default PetitionCreate
