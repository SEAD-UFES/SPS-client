/** @format */

export const getPetitionReplyById = (store, id, options = {}) => {
  //find
  const PetitionReplyStore = store.petitionReplyStore
  const petitionReplies = PetitionReplyStore.allIds.map(id => ({ ...PetitionReplyStore.byId[id] }))
  const petitionReply = petitionReplies.find(pr => pr.id === id)
  const newPetitionReply = petitionReply ? { ...petitionReply } : null

  return newPetitionReply
}
