/** @format */

import { getCalendarById } from './getCalendar'

export const getPetitionEventById = (store, id, options = {}) => {
  console.log('pegando pe')
  //find petitionEvent
  const PetitionEventStore = store.petitionEventStore
  const petitionEvents = PetitionEventStore.allIds.map(id => ({ ...PetitionEventStore.byId[id] }))
  const petitionEvent = petitionEvents.find(pe => pe.id === id)
  const newPetitionEvent = petitionEvent ? { ...petitionEvent } : null

  //get father calendar
  if (newPetitionEvent && options.withCalendar) {
    const opt_calendar = typeof options.withCalendar === 'object' ? options.withCalendar : {}
    newPetitionEvent.calendar = getCalendarById(store, newPetitionEvent.calendar_id, opt_calendar)
  }

  return newPetitionEvent
}
