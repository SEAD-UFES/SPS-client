/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import AlertError from '../../components/common/AlertError'
import SelectListGroup from '../common/SelectListGroup'
import CheckBoxFieldGroup from '../../components/common/CheckBoxFieldGroup'
import { isEmpty } from '../../utils/objectHelpers'

const InscriptionEventUpdate = props => {
  const { process, call, calendar, inscriptionEvent } = props
  const { updateData, numberOfInscriptionsAllowedOptions, errors, errorStore } = props
  const { onChange, onCheck, onSubmit } = props

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
        <span>Editar</span>
      </div>
    )
  }

  const renderForm = (updateData, errors, onChange, onCheck, onSubmit) => {
    return (
      <form noValidate onSubmit={onSubmit}>
        <SelectListGroup
          name='numberOfInscriptionsAllowed'
          label='Inscrições permitidas por usuário'
          placeholder='Selecione o número de inscrições permitidas'
          value={updateData.numberOfInscriptionsAllowed}
          options={numberOfInscriptionsAllowedOptions}
          onChange={onChange}
          error={errors.numberOfInscriptionsAllowed}
        />

        <CheckBoxFieldGroup
          id='allowMultipleAssignments-checkbox'
          name='allowMultipleAssignments'
          text='Múltiplos cargos'
          value='Permitir múltiplas inscrições com cargos diferentes.'
          checked={updateData.allowMultipleAssignments}
          error={errors.allowMultipleAssignments}
          onChange={onCheck}
        />

        <CheckBoxFieldGroup
          id='allowMultipleRegions-checkbox'
          name='allowMultipleRegions'
          text='Múltiplas regiões'
          value='Permitir múltiplas inscrições com regiões diferentes.'
          checked={updateData.allowMultipleRegions}
          error={errors.allowMultipleRegions}
          onChange={onCheck}
        />

        <CheckBoxFieldGroup
          id='allowMultipleRestrictions-checkbox'
          name='allowMultipleRestrictions'
          text='Múltiplas restrições'
          value='Permitir múltiplas inscrições com restrições diferentes.'
          checked={updateData.allowMultipleRestrictions}
          error={errors.allowMultipleRestrictions}
          onChange={onCheck}
        />

        <input type='submit' className='btn btn-primary' value='Atualizar' />
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
    <div className='inscriptionEvent-update'>
      <div className='container'>
        {renderBreadcrumb(process, call)}
        <div className='form-container' id='main'>
          <h1>Editar evento de inscrição</h1>
          <AlertError errors={errorStore} />
          {renderErrorMessage(errors)}
          {renderForm(updateData, errors, onChange, onCheck, onSubmit)}
        </div>
      </div>
    </div>
  )
}

export default InscriptionEventUpdate
