/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import AlertError from '../../components/common/AlertError'
import MyInscriptionListOnInscriptionEvent from '../../components/inscription/MyInscriptionListOnInscriptionEvent'
import InscriptionListOnInscriptionEvent from '../../components/inscription/InscriptionListOnInscriptionEvent'

const InscriptionEventRead = props => {
  const { process, call, calendar, inscriptionEvent, myInscriptions, allInscriptions } = props
  const { errorStore, authStore } = props

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

  const renderData = (calendar, inscriptionEvent) => {
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
            <strong>Número de inscrições:</strong>
            {inscriptionEvent && inscriptionEvent.numberOfInscriptionsAllowed !== 0
              ? ` ${inscriptionEvent.numberOfInscriptionsAllowed} inscrições por usuário`
              : ' Inscrições ilimitadas'}
          </p>
          <p>
            <strong>Cargos:</strong>
            {inscriptionEvent && inscriptionEvent.allowMultipleAssignments
              ? ' Permite múltiplos cargos'
              : ' Permite apenas um cargo'}
          </p>
          <p>
            <strong>Regiões:</strong>
            {inscriptionEvent && inscriptionEvent.allowMultipleRegions
              ? ' Permite múltiplas regiões'
              : ' Permite apenas uma região'}
          </p>
          <p>
            <strong>Restrições:</strong>
            {inscriptionEvent && inscriptionEvent.allowMultipleRestrictions
              ? ' Permite múltiplas restrições'
              : ' Permite apenas uma restrição'}
          </p>
        </div>
      </section>
    )
  }

  const renderMyInscriptions = () => {
    return (
      <MyInscriptionListOnInscriptionEvent
        iEvent={inscriptionEvent}
        inscriptions={myInscriptions}
        authStore={authStore}
      />
    )
  }

  const renderAllInscriptions = () => {
    return <InscriptionListOnInscriptionEvent iEvent={inscriptionEvent} inscriptions={allInscriptions} />
  }

  return (
    <div className='view-page'>
      <div className='container'>
        {renderBreadcrumb(process, call)}
        <div id='main'>
          <h1>Evento de inscrição</h1>
          <AlertError errors={errorStore} />
          {renderData(calendar, inscriptionEvent)}
          {renderMyInscriptions()}
          {renderAllInscriptions()}
        </div>
      </div>
    </div>
  )
}

export default InscriptionEventRead
