/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import AlertError from '../../components/common/AlertError'
import SelectListGroup from '../common/SelectListGroup'
import { isEmpty } from '../../utils/objectHelpers'
import { permissionCheck } from '../profile/permissionCheck'
import { checkNested } from '../../utils/objectHelpers'

const InscriptionCreateOnInscriptionEvent = props => {
  const { profileStore, profileLoading, profilePerson, inscriptionEvent, call, process } = props
  const { createData, vacancyOptions, errors, errorStore } = props
  const { onChange, onSubmit } = props

  const renderBreadcrumb = (process, call, inscriptionEvent) => {
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
        <Link
          to={`/inscription-event/read/${inscriptionEvent ? inscriptionEvent.id : null}`}
          className='breadcrumb-link'>
          {inscriptionEvent ? `Evento de inscrição` : 'Evento de inscrição'}
        </Link>

        <i className='fas fa-greater-than' />
        <span>Nova inscrição</span>
      </div>
    )
  }

  const renderPersonData = () => {
    if (profileLoading) return <p>carregando...</p>

    if (isEmpty(profilePerson))
      return (
        <div className='alert alert-warning' role='alert'>
          <h4 className='alert-heading'>Ação necessária.</h4>
          <p>Para efetuar inscrições no sistema, é necessário preencher a sessão de dados pessoais.</p>
          <hr />
          <p className='mb-0'>
            Clique <Link to={`/profile/edit-person`}>aqui</Link> para editar seus dados pessoais.
          </p>
        </div>
      )

    return (
      <SelectListGroup
        name='person_id'
        label='Dados do usuário'
        placeholder='Usuário'
        value={createData.person_id}
        options={[
          { label: `${profilePerson.name} ${profilePerson.surname} - ${profilePerson.cpf}`, value: profilePerson.id }
        ]}
        onChange={onChange}
        error={errors.person_id}
        disabled={true}
      />
    )
  }

  const renderForm = (createData, errors, onChange, onSubmit) => {
    return (
      <form noValidate onSubmit={onSubmit}>
        {/* Evento de inscrição (Edital/Chamada/Evento)*/}

        {renderPersonData()}

        <SelectListGroup
          name='vacancy_id'
          label='Escolha a vaga para qual deseja se inscrever'
          placeholder='Escolha a vaga para qual deseja se inscrever'
          value={createData.vacancy_id}
          options={vacancyOptions}
          onChange={onChange}
          error={errors.vacancy_id}
        />
        <input type='submit' title='Criar inscrição' className='btn btn-primary' value='Criar' />
      </form>
    )
  }

  const renderErrorMessage = errors => {
    if (!isEmpty(errors)) {
      return (
        <>
          {errors.message ? <p className='text-danger'>{errors.message}</p> : null}
          {errors.message ? <p className='text-danger'>{errors.id}</p> : null}
          {errors.message ? <p className='text-danger'>{errors.inscriptionEvent_id}</p> : null}
        </>
      )
    }
  }

  return (
    <div className='inscriptionEvent-create'>
      <div className='container'>
        {renderBreadcrumb(process, call, inscriptionEvent)}
        <div className='form-container' id='main'>
          <h1>Nova inscrição</h1>
          <AlertError errors={errorStore} />
          {renderErrorMessage(errors)}
          {renderForm(createData, errors, onChange, onSubmit)}
        </div>
      </div>
    </div>
  )
}

export default InscriptionCreateOnInscriptionEvent
