/** @format */

import { getPetitionById } from './getPetition'

export const getManyPetitionByPetitionEventId = (store, ie_id, options = {}) => {
  //find petition Events
  const PetitionStore = store.petitionStore
  const petitions = PetitionStore.allIds.map(id => ({ ...PetitionStore.byId[id] }))
  const PetitionsOfThisIE = petitions.filter(ins => ins.petitionEvent_id === ie_id)
  const completePetitionsOfThisIE = PetitionsOfThisIE.map(ins => getPetitionById(store, ins.id, options))

  return completePetitionsOfThisIE
}
