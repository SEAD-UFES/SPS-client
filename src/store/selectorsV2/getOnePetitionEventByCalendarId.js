/** @format */

import { getPetitionEventById } from './getPetitionEvent'

export const getOnePetitionEventByCalendarId = (store, calendar_id, options = {}) => {
  //find PetitionEvents
  const PetitionEventStore = store.petitionEventStore
  const petitionEvents = PetitionEventStore.allIds.map(id => ({ ...PetitionEventStore.byId[id] }))
  const petitionEventsOfThisCalendar = petitionEvents.find(pe => pe.calendar_id === calendar_id)
  const petitionEvent_id = petitionEventsOfThisCalendar ? petitionEventsOfThisCalendar.id : null
  const completePetitionEventsOfThisCalendar = getPetitionEventById(store, petitionEvent_id, options)

  return completePetitionEventsOfThisCalendar
}
