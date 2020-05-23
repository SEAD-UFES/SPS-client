/** @format */

import React from 'react'
import moment from 'moment'

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
  }

  //chamada encerrada
  else {
    statusMessage = <span className='text-secondary'>Chamada encerrada</span>
  }

  return statusMessage
}
