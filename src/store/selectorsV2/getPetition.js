/** @format */

import { getInscriptionById } from './getInscription'
import { getPetitionEventById } from './getPetitionEvent'
import { getOnePetitionReplyByPetitionId } from './getOnePetitionReplyByPetitionId'

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

  //get father Inscription
  if (newPetition && options.withInscription) {
    const opt_inscription = typeof options.withInscription === 'object' ? options.withInscription : {}
    newPetition.inscription = getInscriptionById(store, newPetition.inscription_id, opt_inscription)
  }

  //get child petitionReply
  if (newPetition && options.withPetitionReply) {
    const opt_petitionReply = typeof options.withPetitionReply === 'object' ? options.withPetitionReply : {}
    newPetition.petitionReply = getOnePetitionReplyByPetitionId(store, newPetition.id, opt_petitionReply)
  }

  return newPetition
}
