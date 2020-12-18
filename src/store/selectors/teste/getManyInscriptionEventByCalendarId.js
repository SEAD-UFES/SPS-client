/** @format */

import { getInscriptionEventById } from './getInscriptionEvent'

export const getManyInscriptionEventByCalendarId = (store, calendar_id, options = {}) => {
  //find inscription Events
  const InscriptionEventStore = store.inscriptionEventStore
  const inscriptionEvents = InscriptionEventStore.allIds.map(id => ({ ...InscriptionEventStore.byId[id] }))
  const inscriptionEventsOfThisCalendar = inscriptionEvents.filter(ie => ie.calendar_id === calendar_id)
  const completeInscriptionEventsOfThisCalendar = inscriptionEventsOfThisCalendar.map(ie =>
    getInscriptionEventById(store, ie.id, options)
  )

  return completeInscriptionEventsOfThisCalendar
}
