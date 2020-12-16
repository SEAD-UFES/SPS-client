/** @format */

import { getPetitionEventById } from './getPetitionEvent'

export const getManyPetitionEventByCalendarId = (store, calendar_id, options = {}) => {
  console.log('pegando many pe de calendar')
  //find inscription Events
  const PetitionEventStore = store.petitionEventStore
  const petitionEvents = PetitionEventStore.allIds.map(id => ({ ...PetitionEventStore.byId[id] }))
  const petitionEventsOfThisCalendar = petitionEvents.filter(pe => pe.calendar_id === calendar_id)
  const completePetitionEventsOfThisCalendar = petitionEventsOfThisCalendar.map(pe =>
    getPetitionEventById(store, pe.id, options)
  )

  return completePetitionEventsOfThisCalendar
}
