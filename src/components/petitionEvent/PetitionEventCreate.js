/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import AlertError from '../../components/common/AlertError'
import { isEmpty } from '../../utils/objectHelpers'
import SelectListGroup from '../common/SelectListGroup'

const PetitionEventCreate = props => {
  const { process, call, calendar } = props
  const { createData, inscriptionEventOptions, errors, errorStore } = props
  const { onChange, onSubmit } = props

  const renderBreadcrumb = (process, call, calendar) => {
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
        <Link to={`/calendar/read/${calendar ? calendar.id : null}`} className='breadcrumb-link'>
          {calendar ? `Calendário (${calendar.name})` : 'Calendário'}
        </Link>

        <i className='fas fa-greater-than' />
        <span>Novo evento de recurso</span>
      </div>
    )
  }

  const renderErrorMessage = errors => {
    if (!isEmpty(errors)) {
      return (
        <>
          {errors.message ? <p className='text-danger'>{errors.message}</p> : null}
          {errors.id ? <p className='text-danger'>{errors.id}</p> : null}
          {errors.calendar_id ? <p className='text-danger'>{errors.calendar_id}</p> : null}
        </>
      )
    }
  }

  const renderForm = (createData, inscriptionEventOptions, errors, onChange, onSubmit) => {
    return (
      <form noValidate onSubmit={onSubmit}>
        <SelectListGroup
          name='inscriptionEvent_id'
          label='Evento de inscrição'
          placeholder='Selecione o evento de inscrição'
          value={createData.inscriptionEvent_id}
          options={inscriptionEventOptions}
          onChange={onChange}
          error={errors.inscriptionEvent}
        />

        <input type='submit' className='btn btn-primary' value='Criar' />
      </form>
    )
  }

  return (
    <div className='petitionEvent-create'>
      <div className='container'>
        {renderBreadcrumb(process, call, calendar)}
        <div className='form-container' id='main'>
          <h1>Novo evento de recurso</h1>
          <AlertError errors={errorStore} />
          {renderErrorMessage(errors)}
          {renderForm(createData, inscriptionEventOptions, errors, onChange, onSubmit)}
        </div>
      </div>
    </div>
  )
}

export default PetitionEventCreate
