/** @format */

import { getCalendarById } from './getCalendar'
import { getManyInscriptionByInscriptionEventId } from './getManyInscriptionByInscriptionEventId'

export const getInscriptionEventById = (store, id, options = {}) => {
  //find call
  const InscriptionEventStore = store.inscriptionEventStore
  const inscriptionEvents = InscriptionEventStore.allIds.map(id => ({ ...InscriptionEventStore.byId[id] }))
  const inscriptionEvent = inscriptionEvents.find(ie => ie.id === id)
  const newInscriptionEvent = inscriptionEvent ? { ...inscriptionEvent } : null

  //get father calendar
  if (newInscriptionEvent && options.withCalendar) {
    const opt_calendar = typeof options.withCalendar === 'object' ? options.withCalendar : {}
    newInscriptionEvent.calendar = getCalendarById(store, newInscriptionEvent.calendar_id, opt_calendar)
  }

  //get child inscription
  if (newInscriptionEvent && options.withInscription) {
    const opt_ins = typeof options.withInscription === 'object' ? options.withInscription : {}
    newInscriptionEvent.inscriptions = getManyInscriptionByInscriptionEventId(store, newInscriptionEvent.id, opt_ins)
  }

  return newInscriptionEvent
}
