/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AlertError from '../../components/common/AlertError'
import MyPetitionListOnPetitionEvent from '../../components/petition/MyPetitionListOnPetitionEvent'
import PetitionListOnPetitionEvent from '../../components/petition/PetitionListOnPetitionEvent'
import { permissionCheck } from '../profile/permissionCheck'
import { checkNested } from '../../utils/objectHelpers'

const PetitionEventRead = props => {
  const { location } = props
  const { process, call, calendar, petitionEvent, myPetitions } = props
  const { profileStore, errorStore, authStore } = props

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
        <span>Evento de inscrição</span>
      </div>
    )
  }

  const renderData = (calendar, petitionEvent) => {
    return (
      <section id='info'>
        <div>
          <p>
            <strong>Início:</strong>
            {calendar ? ` ${moment(calendar.start).format('DD/MM/YYYY HH:mm:ss')}` : null}
          </p>
          <p>
            <strong>Encerramento:</strong>
            {calendar
              ? calendar.end
                ? ` ${moment(calendar.end).format('DD/MM/YYYY HH:mm:ss')}`
                : ` ${moment(calendar.start).format('DD/MM/YYYY HH:mm:ss')}`
              : null}
          </p>
          <p>
            <strong>Status do evento:</strong>
            {calendar ? (calendar.status ? ` ${calendar.status}` : null) : null}
          </p>
        </div>
        <div>
          <p>
            <strong>Evento de inscrição associado:</strong>
            {checkNested(petitionEvent, 'inscriptionEvent', 'calendar')
              ? petitionEvent.inscriptionEvent.calendar.name
              : null}
          </p>
        </div>
      </section>
    )
  }

  const renderMyPetitions = () => {
    return (
      <MyPetitionListOnPetitionEvent
        pEvent={petitionEvent}
        petitions={myPetitions}
        authStore={authStore}
        location={location}
      />
    )
  }

  const renderAllInscriptions = () => {
    return (
      <PetitionListOnPetitionEvent petitions={checkNested(petitionEvent, 'petitions') ? petitionEvent.petitions : []} />
    )
  }

  return (
    <div className='view-page'>
      <div className='container'>
        {renderBreadcrumb(process, call)}
        <div id='main'>
          <h1>Evento de recurso</h1>
          <AlertError errors={errorStore} />
          {renderData(calendar, petitionEvent)}
          {renderMyPetitions()}
          {renderAllInscriptions()}
        </div>
      </div>
    </div>
  )
}

export default PetitionEventRead
