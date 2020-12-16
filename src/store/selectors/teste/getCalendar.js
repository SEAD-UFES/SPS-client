/** @format */

import { getCallById } from './getCall'
import { getManyInscriptionEventByCalendarId } from './getManyInscriptionEventByCalendarId'
import { getManyPetitionEventByCalendarId } from './getManyPetitionEventByCalendarId'

export const getCalendarById = (store, id, options = {}) => {
  console.log('pegando calendar')
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

  //get child inscriptionEvent
  if (newCalendar && options.withInscriptionEvent) {
    const opt_ie = typeof options.withInscriptionEvent === 'object' ? options.withInscriptionEvent : {}
    newCalendar.inscriptionEvents = getManyInscriptionEventByCalendarId(store, newCalendar.id, opt_ie)
  }

  //get child petitionEvent
  if (newCalendar && options.withPetitionEvent) {
    const opt_pe = typeof options.withPetitionEvent === 'object' ? options.withPetitionEvent : {}
    newCalendar.petitionEvents = getManyPetitionEventByCalendarId(store, newCalendar.id, opt_pe)
  }

  return newCalendar
}
