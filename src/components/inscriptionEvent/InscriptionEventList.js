/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AlertError from 'components/common/AlertError'

const InscriptionEventList = props => {
  const { errorStore, calendarsWithInscriptionEvent, call, process } = props

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
            {process ? `Edital ${process.number}/${process.year}` : 'Edital'}
          </Link>

          <i className='fas fa-greater-than' />
          <Link to={`/calls/${call ? call.id : null}`} className='breadcrumb-link'>
            <span>{call ? `Chamada ${call.number}` : 'Chamada'}</span>
          </Link>

          <i className='fas fa-greater-than' />
          <span>Eventos de inscrição</span>
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
              <span>Evento do calendário</span>
              <span>Datas</span>
              <span />
            </div>
            {calendarsWithInscriptionEvent.length > 0 ? (
              calendarsWithInscriptionEvent.map(cld => {
                return cld.inscriptionEvents.map(iE => {
                  return (
                    <li key={cld.id}>
                      <h3>{cld.name}</h3>
                      <p>
                        {moment(cld.start, 'YYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
                        {cld.end ? ` - ${moment(cld.end, 'YYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}` : null}
                      </p>
                      <p className='text-right'>
                        <Link className='btn-icon laranja' to={`/inscription-event/read/${iE.id}`}>
                          <i className='fas fa-eye' />
                        </Link>
                      </p>
                    </li>
                  )
                })
              })
            ) : (
              <li>
                <span>Sem Eventos de inscrição para exibir.</span>
              </li>
            )}
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
