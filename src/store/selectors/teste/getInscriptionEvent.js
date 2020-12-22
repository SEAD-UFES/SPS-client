/** @format */

import { getCalendarById } from './getCalendar'
import { getManyInscriptionByInscriptionEventId } from './getManyInscriptionByInscriptionEventId'
import { getManyMyInscriptionByInscriptionEventId } from './getManyMyInscriptionByInscriptionEventId'

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

  //get child myInscription
  if (newInscriptionEvent && options.withMyInscription) {
    const opt_myIns = typeof options.withMyInscription === 'object' ? options.withMyInscription : {}
    newInscriptionEvent.myInscriptions = getManyMyInscriptionByInscriptionEventId(
      store,
      newInscriptionEvent.id,
      opt_myIns
    )
  }

  return newInscriptionEvent
}
