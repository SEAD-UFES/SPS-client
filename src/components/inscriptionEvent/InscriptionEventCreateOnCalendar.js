/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import CheckBoxFieldGroup from '../../components/common/CheckBoxFieldGroup'
import AlertError from '../../components/common/AlertError'
import SelectListGroup from '../common/SelectListGroup'

const InscriptionEventCreateOnCalendar = props => {
  const { process, call, calendar } = props
  const {
    createData,
    numberOfInscriptionsAllowedOptions,
    //errors,
    errorStore
  } = props
  const { onChange, onCheck, onSubmit } = props

  //dummy props
  const errors = {}

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
        <Link to={`/calendar/read/${calendar ? calendar.id : null}`} className='breadcrumb-link'>
          {calendar ? `Calendário (${calendar.name})` : 'Calendário'}
        </Link>

        <i className='fas fa-greater-than' />
        <span>Novo evento de inscrição</span>
      </div>
    )
  }

  const renderForm = () => {
    return (
      <form noValidate onSubmit={onSubmit}>
        <SelectListGroup
          name='numberOfInscriptionsAllowed'
          label='Inscrições permitidas por usuário'
          placeholder='Selecione o número de inscrições permitidas'
          value={createData.numberOfInscriptionsAllowed}
          options={numberOfInscriptionsAllowedOptions}
          onChange={onChange}
          error={errors.numberOfInscriptionsAllowed}
        />

        <CheckBoxFieldGroup
          id='allowMultipleAssignments-checkbox'
          name='allowMultipleAssignments'
          text='Múltiplos cargos'
          value='Permitir múltiplas inscrições com cargos diferentes.'
          checked={createData.allowMultipleAssignments}
          error={errors.allowMultipleAssignments}
          onChange={onCheck}
        />

        <CheckBoxFieldGroup
          id='allowMultipleRegions-checkbox'
          name='allowMultipleRegions'
          text='Múltiplas regiões'
          value='Permitir múltiplas inscrições com regiões diferentes.'
          checked={createData.allowMultipleRegions}
          error={errors.allowMultipleRegions}
          onChange={onCheck}
        />

        <CheckBoxFieldGroup
          id='allowMultipleRestrictions-checkbox'
          name='allowMultipleRestrictions'
          text='Múltiplas restrições'
          value='Permitir múltiplas inscrições com restrições diferentes.'
          checked={createData.allowMultipleRestrictions}
          error={errors.allowMultipleRestrictions}
          onChange={onCheck}
        />

        <input type='submit' className='btn btn-primary' value='Criar' />
      </form>
    )
  }

  return (
    <div className='calendar-read'>
      <div className='container'>
        {renderBreadcrumb(process, call)}
        <div className='form-container' id='main'>
          <h1>Novo evento de inscrição</h1>
          <AlertError errors={errorStore} />
          {renderForm(createData, errors)}
        </div>
      </div>
    </div>
  )
}

export default InscriptionEventCreateOnCalendar
