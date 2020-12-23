/** @format */

import { getPetitionById } from './getPetition'

export const getManyPetitionByPetitionEventId = (store, ie_id, options = {}) => {
  //find petition Events
  const PetitionStore = store.petitionStore
  const petitions = PetitionStore.allIds.map(id => ({ ...PetitionStore.byId[id] }))
  const PetitionsOfThisPE = petitions.filter(ins => ins.petitionEvent_id === ie_id)
  const completePetitionsOfThisPE = PetitionsOfThisPE.map(ins => getPetitionById(store, ins.id, options))

  return completePetitionsOfThisPE
}
