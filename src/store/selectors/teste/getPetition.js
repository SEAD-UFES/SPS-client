/** @format */

import { getPetitionEventById } from './getPetitionEvent'

export const getPetitionById = (store, id, options = {}) => {
  //find call
  const PetitionStore = store.petitionStore
  const petitions = PetitionStore.allIds.map(id => ({ ...PetitionStore.byId[id] }))
  const petition = petitions.find(ins => ins.id === id)
  const newPetition = petition ? { ...petition } : null

  //get father PetitionEvent
  if (newPetition && options.withPetitionEvent) {
    const opt_pe = typeof options.withPetitionEvent === 'object' ? options.withPetitionEvent : {}
    newPetition.petitionEvent = getPetitionEventById(store, newPetition.petitionEvent_id, opt_pe)
  }

  return newPetition
}
