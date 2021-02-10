/** @format */

import { getPetitionReplyById } from './getPetitionReply'

export const getOnePetitionReplyByPetitionId = (store, petition_id, options = {}) => {
  //find petitionReplies
  const PetitionReplyStore = store.petitionReplyStore
  const petitionReplies = PetitionReplyStore.allIds.map(id => ({ ...PetitionReplyStore.byId[id] }))
  const petitionRepliesOfThisPetition = petitionReplies.find(pe => pe.petition_id === petition_id)
  const petitionReply_id = petitionRepliesOfThisPetition ? petitionRepliesOfThisPetition.id : null
  const completePetitionReplyOfThisPetition = getPetitionReplyById(store, petitionReply_id, options)

  return completePetitionReplyOfThisPetition
}
