/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import AlertError from '../../components/common/AlertError'
import SelectListGroup from '../common/SelectListGroup'
import { isEmpty } from '../../utils/objectHelpers'

const InscriptionCreateOnInscriptionEvent = props => {
  //const { process, call, calendar } = props

  //const { createData, numberOfInscriptionsAllowedOptions, errors, errorStore } = props
  const { createData, vacancyOptions, errors, errorStore } = props
  //const { onChange, onCheck, onSubmit } = props
  const { onChange } = props

  console.log('VacancyOptions:', props.vacancyOptions)

  //dummy data
  const process = null
  const call = null
  const calendar = null
  //const createData = {}
  //const errors = {}
  //const errorStore = {}

  const onCheck = () => {}
  const onSubmit = () => {}

  const renderBreadcrumb = (process, call, calendar) => {
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
        <span>Novo evento de inscrição</span>
      </div>
    )
  }

  const renderForm = (createData, errors, onChange, onCheck, onSubmit) => {
    return (
      <form noValidate onSubmit={onSubmit}>
        {/* Usuário (Person) */}

        {/* Evento de inscrição (Edital/Chamada/Evento)*/}

        <SelectListGroup
          name='vacancy_id'
          label='Escolha a vaga para qual deseja se inscrever'
          placeholder='Escolha a vaga para qual deseja se inscrever'
          value={createData.vacancy_id}
          options={vacancyOptions}
          onChange={onChange}
          error={errors.vacancy_id}
        />

        <input type='submit' className='btn btn-primary' value='Criar' />
      </form>
    )
  }

  const renderErrorMessage = errors => {
    if (!isEmpty(errors)) {
      return (
        <>
          {errors.message ? <p className='text-danger'>{errors.message}</p> : null}
          {errors.message ? <p className='text-danger'>{errors.id}</p> : null}
          {errors.message ? <p className='text-danger'>{errors.calendar_id}</p> : null}
        </>
      )
    }
  }

  return (
    <div className='inscriptionEvent-create'>
      <div className='container'>
        {renderBreadcrumb(process, call, calendar)}
        <div className='form-container' id='main'>
          <h1>Nova inscrição</h1>
          <AlertError errors={errorStore} />
          {renderErrorMessage(errors)}
          {renderForm(createData, errors, onChange, onCheck, onSubmit)}
        </div>
      </div>
    </div>
  )
}

export default InscriptionCreateOnInscriptionEvent
