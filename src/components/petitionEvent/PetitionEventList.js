/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AlertError from 'components/common/AlertError'
import { permissionCheck } from '../profile/permissionCheck'
import { checkNested } from '../../utils/objectHelpers'

const PetitionEventList = props => {
  const { profileStore, errorStore, calendarsWithPetitionEvent, call, process } = props

  const renderBreadcrumb = (process, call) => {
    const canAccessCall = permissionCheck(
      checkNested(profileStore, 'profile', 'UserRoles') ? profileStore.profile.UserRoles : [],
      'call_read',
      { course_id: process ? process.course_id : null }
    )

    const callLink = canAccessCall ? (
      <Link to={`/call/read/${call ? call.id : null}`} className='breadcrumb-link'>
        {call ? `Chamada ${call.number}` : 'Chamada'}
      </Link>
    ) : (
      <span>{call ? `Chamada ${call.number}` : 'Chamada'}</span>
    )

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
          {callLink}

          <i className='fas fa-greater-than' />
          <span>Eventos de recurso</span>
        </div>
      </>
    )
  }

  const renderInscriptionEvents = () => {
    return (
      <section id='calendarios' className='quadro'>
        <h4>Eventos de recurso</h4>
        <div>
          <ul className='table-list'>
            <div className='titulos'>
              <span>Evento do calendário</span>
              <span>Datas</span>
              <span />
            </div>
            {calendarsWithPetitionEvent.length > 0 ? (
              calendarsWithPetitionEvent.map(cld => {
                return cld.petitionEvents.map(pE => {
                  return (
                    <li key={cld.id}>
                      <h3>{cld.name}</h3>
                      <p>
                        {moment(cld.start, 'YYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
                        {cld.end ? ` - ${moment(cld.end, 'YYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}` : null}
                      </p>
                      <p className='text-right'>
                        <Link
                          className='btn-icon laranja'
                          title='Acessar evento de recurso'
                          to={`/petition-event/read/${pE.id}`}>
                          <i className='fas fa-eye' />
                        </Link>
                      </p>
                    </li>
                  )
                })
              })
            ) : (
              <li>
                <span>Sem Eventos de recurso para exibir.</span>
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

export default PetitionEventList
