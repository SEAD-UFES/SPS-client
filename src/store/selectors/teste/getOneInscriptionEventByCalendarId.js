/** @format */

import { getInscriptionEventById } from './getInscriptionEvent'

export const getOneInscriptionEventByCalendarId = (store, calendar_id, options = {}) => {
  //find inscription Events
  const InscriptionEventStore = store.inscriptionEventStore
  const inscriptionEvents = InscriptionEventStore.allIds.map(id => ({ ...InscriptionEventStore.byId[id] }))
  const inscriptionEventOfThisCalendar = inscriptionEvents.find(ie => ie.calendar_id === calendar_id)
  const inscriptionEvent_id = inscriptionEventOfThisCalendar ? inscriptionEventOfThisCalendar.id : null
  const completeInscriptionEventsOfThisCalendar = getInscriptionEventById(store, inscriptionEvent_id, options)

  return completeInscriptionEventsOfThisCalendar
}
