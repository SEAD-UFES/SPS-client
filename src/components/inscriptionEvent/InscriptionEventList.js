/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import AlertError from 'components/common/AlertError'

const InscriptionEventList = props => {
  const errorStore = {}
  const process = null
  const call = null

  const renderBreadcrumb = (process, call) => {
    return (
      <>
        <div className='breadcrumb'>
          <span>Você está em:</span>
          <Link to='/processes' className='breadcrumb-link'>
            Processos Seletivos
          </Link>

          <i className='fas fa-greater-than' />
          <Link to={`/processes/${process ? process.id : null}`} className='breadcrumb-link'>
            {process ? `Edital ${process.number}/${process.year}` : 'Edital 000/0000'}
          </Link>

          <i className='fas fa-greater-than' />
          <span>{call ? `Chamada ${call.number}` : 'Chamada'}</span>
        </div>
      </>
    )
  }

  const renderInscriptionEvents = () => {
    return (
      <section id='calendarios' className='quadro'>
        <h4>Eventos de inscrição</h4>
        <div>
          <ul className='table-list'>
            <div className='titulos'>
              <span>Id</span>
              <span />
            </div>
            <li>
              <h3>Id</h3>
              <p className='text-right'>
                <Link className='btn-icon laranja' to={`/calendar/read`}>
                  <i className='fas fa-eye' />
                </Link>
              </p>
            </li>
          </ul>
        </div>
      </section>
    )
  }

  return (
    <div className='view-page'>
      <div className='container'>
        {renderBreadcrumb(process, call)}
        <div className='main'>
          <AlertError errors={errorStore} />
          {renderInscriptionEvents()}
        </div>
      </div>
    </div>
  )
}

export default InscriptionEventList
