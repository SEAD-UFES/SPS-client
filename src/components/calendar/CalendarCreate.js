/** @format */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import TextFieldGroup from '../../components/common/TextFieldGroup'

import SelectListGroup from '../../components/common/SelectListGroup'
import CheckBoxFieldGroup from '../../components/common/CheckBoxFieldGroup'
import AlertError from '../../components/common/AlertError'

const CalendarCreate = props => {
  const { createData, setCreateData, calendarOptions, errors } = props
  const { process, call, errorStore } = props
  const { onChange, onCheck, onSubmit } = props
  const [haveEnd, setHaveEnd] = useState(false)

  const onChangeShowEnd = e => {
    setCreateData({ ...createData, end: '' })
    setHaveEnd(!haveEnd)
  }

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
        <span>Criar evento</span>
      </div>
    )
  }

  const renderForm = (createData, errors) => {
    return (
      <form noValidate onSubmit={onSubmit}>
        <TextFieldGroup
          type='text'
          name='name'
          label='Nome'
          value={createData.name}
          onChange={onChange}
          error={errors.name}
        />

        {/* Determina se o evento de encerramento aparece */}
        <div className='form-check show-check-option'>
          <input
            className='form-check-input'
            type='checkbox'
            name='haveEnd'
            id='have-end-check'
            checked={haveEnd}
            onChange={onChangeShowEnd}
          />
          <label className='form-check-label' htmlFor='id'>
            Este evento possui abertura e encerramento{' '}
            <i
              title='Habilite para cadastrar etapas que &#013;possuem prazo de conclusão, como &#013;período de inscrições ou recursos.'
              className='fas fa-question-circle'
            />
          </label>
        </div>

        <div className='form-lateral'>
          <TextFieldGroup
            placeholder='__/__/__'
            type='date'
            label='Data de abertura'
            name='start'
            value={createData.start}
            onChange={onChange}
            error={errors.start}
          />

          {haveEnd ? (
            <TextFieldGroup
              placeholder='__/__/__'
              type='date'
              label='Data de encerramento'
              name='end'
              value={createData.end}
              onChange={onChange}
              error={errors.end}
            />
          ) : (
            ''
          )}
        </div>

        <SelectListGroup
          name='calendar_id'
          label='Depende de...'
          placeholder='Selecione o evento pai (opcional)'
          value={createData.calendar_id}
          options={calendarOptions}
          onChange={onChange}
          error={errors.calendar_id}
          info='Campo opcional'
        />

        <CheckBoxFieldGroup
          id='ready-checkbox'
          name='ready'
          text='Pronto'
          value='Este evento está pronto para execução.'
          checked={createData.ready}
          error={errors.ready}
          onChange={onCheck}
        />

        <input type='submit' title='Criar evento de calendário' className='btn btn-primary' value='Criar' />
      </form>
    )
  }

  return (
    <div className='calendar-create'>
      <div className='container'>
        {renderBreadcrumb(process, call)}
        <div className='form-container' id='main'>
          <h1>Novo calendário</h1>
          <AlertError errors={errorStore} />
          {renderForm(createData, errors)}
        </div>
      </div>
    </div>
  )
}

export default CalendarCreate
