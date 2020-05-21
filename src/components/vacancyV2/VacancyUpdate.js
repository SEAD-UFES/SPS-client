/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import TextFieldGroup from '../../components/common/TextFieldGroup'
import SelectListGroup from '../../components/common/SelectListGroup'
import CheckBoxFieldGroup from '../../components/common/CheckBoxFieldGroup'
import AlertError from '../../components/common/AlertError'

const VacancyUpdate = props => {
  const { process, call } = props
  const { updateData, assignmentOptions, regionOptions, restrictionOptions, errors, errorStore } = props
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
        <span>Editar oferta de vaga</span>
      </div>
    )
  }

  const renderForm = (assignmentOptions, regionOptions, restrictionOptions, errors) => {
    return (
      <form noValidate onSubmit={onSubmit}>
        <SelectListGroup
          name='assignment_id'
          label='Atribuição'
          placeholder='Selecione a atribuição'
          value={updateData.assignment_id}
          options={assignmentOptions}
          onChange={onChange}
          error={errors.assignment_id}
        />

        <TextFieldGroup
          type='text'
          name='qtd'
          label='Quantidade'
          value={updateData.qtd}
          onChange={onChange}
          error={errors.qtd}
        />

        <SelectListGroup
          name='region_id'
          label='Polo'
          placeholder='Selecione o polo associado'
          value={updateData.region_id}
          options={regionOptions}
          onChange={onChange}
          error={errors.region_id}
          info='Campo opcional'
        />

        <SelectListGroup
          name='restriction_id'
          label='Restrição'
          placeholder='Selecione a restrição da vaga'
          value={updateData.restriction_id}
          options={restrictionOptions}
          onChange={onChange}
          error={errors.restriction_id}
          info='Campo opcional'
        />

        <CheckBoxFieldGroup
          id='reserve-checkbox'
          name='reserve'
          text='Reserva'
          value='Esta oferta de vagas permite cadastro de reserva.'
          checked={updateData.reserve}
          error={errors.reserve}
          onChange={onCheck}
        />

        <input type='submit' className='btn btn-primary' value='Atualizar' />
      </form>
    )
  }

  return (
    <div className='vacancy-create'>
      <div className='container'>
        {renderBreadcrumb(process, call)}
        <div className='form-container' id='main'>
          <h1>Editar oferta de vaga</h1>
          <AlertError errors={errorStore} />
          {renderForm(assignmentOptions, regionOptions, restrictionOptions, errors)}
        </div>
      </div>
    </div>
  )
}

export default VacancyUpdate
