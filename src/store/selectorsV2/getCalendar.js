/** @format */

import { getCallById } from './getCall'
import { getOneInscriptionEventByCalendarId } from './getOneInscriptionEventByCalendarId'
import { getOnePetitionEventByCalendarId } from './getOnePetitionEventByCalendarId'

export const getCalendarById = (store, id, options = {}) => {
  //find call
  const CalendarStore = store.calendarStore
  const calendars = CalendarStore.allIds.map(id => ({ ...CalendarStore.byId[id] }))
  const calendar = calendars.find(cal => cal.id === id)
  const newCalendar = calendar ? { ...calendar } : null

  //get father call
  if (newCalendar && options.withCall) {
    const opt_call = typeof options.withCall === 'object' ? options.withCall : {}
    newCalendar.call = getCallById(store, newCalendar.call_id, opt_call)
  }

  //get father Calendar
  if (newCalendar && options.withParentCalendar) {
    const opt_pc = typeof options.withParentCalendar === 'object' ? options.withParentCalendar : {}
    if (opt_pc.recursive) opt_pc.withParentCalendar = { ...opt_pc }
    newCalendar.parentCalendar = getCalendarById(store, newCalendar.calendar_id, opt_pc)
  }

  //get child inscriptionEvent
  if (newCalendar && options.withInscriptionEvent) {
    const opt_ie = typeof options.withInscriptionEvent === 'object' ? options.withInscriptionEvent : {}
    newCalendar.inscriptionEvent = getOneInscriptionEventByCalendarId(store, newCalendar.id, opt_ie)
  }

  //get child petitionEvent
  if (newCalendar && options.withPetitionEvent) {
    const opt_pe = typeof options.withPetitionEvent === 'object' ? options.withPetitionEvent : {}
    newCalendar.petitionEvent = getOnePetitionEventByCalendarId(store, newCalendar.id, opt_pe)
  }

  return newCalendar
}
