/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import AlertError from 'components/common/AlertError'
import TextFieldGroup from '../common/TextFieldGroup'

const CallCreate = props => {
  const { process, call, errorStore, errors, createData } = props
  const { onChange, onSubmit } = props

  const renderBreadcrumb = (process, call) => {
    return (
      <>
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
          <span>Nova chamada</span>
        </div>
      </>
    )
  }

  const renderForm = errors => {
    return (
      <form noValidate onSubmit={onSubmit}>
        <TextFieldGroup
          type='text'
          name='number'
          label='Número'
          value={createData.number}
          onChange={onChange}
          error={errors.number}
        />

        <div className='form-lateral'>
          <TextFieldGroup
            placeholder='__/__/__'
            type='date'
            label='Data de abertura'
            name='openingDate'
            value={createData.openingDate}
            onChange={onChange}
            error={errors.openingDate}
          />

          <TextFieldGroup
            placeholder='__/__/__'
            type='date'
            label='Data de encerramento'
            name='endingDate'
            value={createData.endingDate}
            onChange={onChange}
            error={errors.endingDate}
          />
        </div>

        <input type='submit' title='Criar chamada' className='btn btn-primary' value='Cadastrar' />
      </form>
    )
  }

  return (
    <div className='update-page'>
      <div className='container'>
        {renderBreadcrumb(process, call)}
        <div className='form-container' id='main'>
          <h1>Nova chamada</h1>
          <AlertError errors={errorStore} />
          {renderForm(errors)}
        </div>
      </div>
    </div>
  )
}

export default CallCreate
