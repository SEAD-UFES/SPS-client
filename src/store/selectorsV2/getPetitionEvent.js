/** @format */

import { getCalendarById } from './getCalendar'
import { getInscriptionEventById } from './getInscriptionEvent'
import { getManyPetitionByPetitionEventId } from './getManyPetitionByPetitionEventId'

export const getPetitionEventById = (store, id, options = {}) => {
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

  // get father inscriptionEvent
  if (newPetitionEvent && options.withInscriptionEvent) {
    const opt_ie = typeof options.withInscriptionEvent === 'object' ? options.withInscriptionEvent : {}
    newPetitionEvent.inscriptionEvent = getInscriptionEventById(store, newPetitionEvent.inscriptionEvent_id, opt_ie)
  }

  //get child petition
  if (newPetitionEvent && options.withPetition) {
    const opt_petition = typeof options.withPetition === 'object' ? options.withPetition : {}
    newPetitionEvent.petitions = getManyPetitionByPetitionEventId(store, newPetitionEvent.id, opt_petition)
  }

  return newPetitionEvent
}
