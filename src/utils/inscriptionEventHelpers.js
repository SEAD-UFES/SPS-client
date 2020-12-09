/** @format */

import { checkNested } from './objectHelpers'

export const calendarWithInscriptionEventOptions = calendars => {
  const reduceCalendarsWithInscriptionEvent = (acc, cur) => {
    if (cur.inscriptionEvents.length > 0) acc.push(cur)
    return acc
  }

  const calendarsWithInscriptionEvent = calendars.reduce(reduceCalendarsWithInscriptionEvent, [])

  const IEO = calendarsWithInscriptionEvent.map(item => {
    const label = item.name
    const hasInscriptionEvents = checkNested(item, 'inscriptionEvents')
    const value = hasInscriptionEvents ? item.inscriptionEvents[0].id : ''

    return { label: label, value: value }
  })

  return IEO
}
