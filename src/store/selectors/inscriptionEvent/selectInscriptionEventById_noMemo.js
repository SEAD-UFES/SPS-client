/** @format */

import { selectCalendarById_noMemo } from '../calendar/selectCalendarById_noMemo'

export const selectInscriptionEventById_noMemo = (store, inscriptionEvent_id, options) => {
  const IEstore = store.inscriptionEventStore
  const inscriptionEvents = IEstore.allIds.map(id => ({ ...IEstore.byId[id] }))
  const inscriptionEvent = inscriptionEvents.find(IE => IE.id === inscriptionEvent_id)
  let newInscriptionEvent = inscriptionEvent ? { ...inscriptionEvent } : null

  //inserir calendar se solicitado.
  if (newInscriptionEvent && options.withCalendar) {
    const opt_Calendar = typeof options.withCalendar === 'object' ? options.withCalendar : {}
    newInscriptionEvent.calendar = selectCalendarById_noMemo(store, newInscriptionEvent.calendar_id, opt_Calendar)
  }

  return newInscriptionEvent
}
