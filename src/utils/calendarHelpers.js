/** @format */

import moment from 'moment'

export const removePotentialCircRef = (calendar, calendars) => {
  let potencialCircRefIds = calendar ? [calendar.id] : []
  let idsToTest = calendar ? [calendar.id] : []

  //determinar candidatos a referencia circular.
  while (idsToTest.length > 0) {
    const potencialFatherId = idsToTest.shift()
    const sonIds = calendars.filter(cld => cld.calendar_id === potencialFatherId).map(cld => cld.id)
    idsToTest = idsToTest.concat(sonIds)
    potencialCircRefIds = potencialCircRefIds.concat(sonIds)
  }

  const newCalendars = calendars.filter(cld => !potencialCircRefIds.includes(cld.id))
  return newCalendars
}

export const calcCalendarStatus = (cld, calendars) => {
  const status = {
    ag: 'Aguardando',
    atd: 'Atrasado por dependência',
    at: 'Atrasado',
    ad: 'Em andamento',
    cc: 'Concluído!'
  }

  const ready = cld.ready
  const now = moment()
  const startDate = moment(cld.start)
  const endDate = cld.end ? moment(cld.end) : moment(cld.start)

  //Aguardando
  if (startDate > now) return status['ag']

  //Atrasado por dependencia
  const fatherCalendar = cld.calendar_id ? calendars.find(calendar => calendar.id === cld.calendar_id) : null
  const fatherStatus = fatherCalendar ? calcCalendarStatus(fatherCalendar, calendars) : null
  if (fatherStatus === status['atd'] || fatherStatus === status['at']) return status['atd']

  //Atrasado
  if (ready === false && startDate < now) return status['at']

  //Em andamento
  if (ready === true && startDate < now && now < endDate) return status['ad']

  //Concluído
  return status['cc']
}
