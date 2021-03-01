/** @format */

import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

export function getCallStatus(call) {
  if (!call) return null

  let statusMessage = ''

  //Ainda vai abrir
  if (moment(call.openingDate, 'YYYY-MM-DDTHH:mm:ss.ssssZ') > moment()) {
    statusMessage = <span>Aguardando abertura da chamada</span>
  }

  //chamada aberta
  else if (
    moment(call.openingDate, 'YYYY-MM-DDTHH:mm:ss.ssssZ') < moment() &&
    moment(call.endingDate, 'YYYY-MM-DDTHH:mm:ss.ssssZ') > moment()
  ) {
    statusMessage = <span className='text-success'>Chamada em andamento</span>

    //Verificar se existem inscrições abertas
    const openInscriptionEvents = getOpenedInscriptionEventsByCall(call)
    if (openInscriptionEvents.length > 0) {
      const link = `/inscription-event/read/${openInscriptionEvents[0].id}`
      statusMessage = (
        <Link className='btn btn-primary' title='Acessar envento de inscrição' to={link}>
          <i className='fas fa-cog' /> Inscrições abertas. Acesse
        </Link>
      )
    }
  }

  //chamada encerrada
  else {
    statusMessage = <span className='text-secondary'>Chamada encerrada</span>
  }

  return statusMessage
}

export const getOpenedInscriptionEventsByCall = call => {
  const calendars = call.calendars ? call.calendars : []

  const calendarsRunning = calendars.filter(cld => {
    const ready = cld.ready
    const now = moment()
    const startDate = moment(cld.start)
    const endDate = cld.end ? moment(cld.end) : moment(cld.start)

    //Em andamento ?
    if (ready === true && startDate < now && now < endDate) return true
    return false
  })

  const calendarsRunningWithIE = calendarsRunning.filter(cld => {
    if (cld.inscriptionEvents && cld.inscriptionEvents.length > 0) return true
    return false
  })

  const inscriptionEvents = calendarsRunningWithIE.reduce((acc, cur, idx, src) => {
    acc = [...acc, ...cur.inscriptionEvents]
    return acc
  }, [])

  return inscriptionEvents
}
