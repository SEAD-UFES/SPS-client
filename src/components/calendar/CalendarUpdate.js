/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import TextFieldGroup from '../../components/common/TextFieldGroup'

import SelectListGroup from '../../components/common/SelectListGroup'
import CheckBoxFieldGroup from '../../components/common/CheckBoxFieldGroup'
import AlertError from '../../components/common/AlertError'

const CalendarUpdate = props => {
  const { process, call } = props
  const { updateData, calendarOptions, errors, errorStore } = props
  const { onChange, onCheck, onSubmit } = props

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
        <span>Editar evento</span>
      </div>
    )
  }

  const renderForm = (calendarOptions, errors) => {
    return (
      <form noValidate onSubmit={onSubmit}>
        <TextFieldGroup
          type='text'
          name='name'
          label='Nome'
          value={updateData.name}
          onChange={onChange}
          error={errors.name}
        />

        <div className='form-lateral'>
          <TextFieldGroup
            placeholder='__/__/__'
            type='date'
            label='Data de abertura'
            name='start'
            value={updateData.start}
            onChange={onChange}
            error={errors.start}
          />

          <TextFieldGroup
            placeholder='__/__/__'
            type='date'
            label='Data de encerramento'
            name='end'
            value={updateData.end}
            onChange={onChange}
            error={errors.end}
          />
        </div>

        <SelectListGroup
          name='dependsOn'
          label='Depende de...'
          placeholder='Selecione a atribuição (opcional)'
          value={updateData.calendar_id}
          options={calendarOptions}
          onChange={onChange}
          error={errors.dependsOn}
          info='Campo opcional'
        />

        <CheckBoxFieldGroup
          id='ready-checkbox'
          name='ready'
          text='Pronto'
          value='Este evento está pronto para execução.'
          checked={updateData.ready}
          error={errors.ready}
          onChange={onCheck}
        />

        <input type='submit' className='btn btn-primary' value='Atualizar' />
      </form>
    )
  }

  return (
    <div className='calendar-update'>
      <div className='container'>
        {renderBreadcrumb(process, call)}
        <div className='form-container' id='main'>
          <h1>Editar evento</h1>
          <AlertError errors={errorStore} />
          {renderForm(calendarOptions, errors)}
        </div>
      </div>
    </div>
  )
}

export default CalendarUpdate
