/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import AlertError from '../../components/common/AlertError'

const InscriptionEventRead = props => {
  //const { process, call } = props
  //const { updateData, calendarOptions, errors, errorStore } = props
  //const { onChange, onCheck, onSubmit } = props

  //dummy props
  const process = null
  const call = null
  const errorStore = {}

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
        <span>Evento de inscrição</span>
      </div>
    )
  }

  return (
    <div className='calendar-read'>
      <div className='container'>
        {renderBreadcrumb(process, call)}
        <div className='form-container' id='main'>
          <h1>Evento de inscrição</h1>
          <AlertError errors={errorStore} />
          <p>Dados de Calendar.</p>
          <p>Dados de IncriptionEvent associado.</p>
          <p>Minhas inscrições.</p>
          <p>Lista de inscritos.</p>
        </div>
      </div>
    </div>
  )
}

export default InscriptionEventRead
