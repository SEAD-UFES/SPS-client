/** @format */

import { selectInscriptionEventById_noMemo } from '../inscriptionEvent/selectInscriptionEventById_noMemo'

export const selectPetitionEventById_noMemo = (store, petitionEvent_id, options = {}) => {
  const PEstore = store.petitionEventStore
  const petitionEvents = PEstore.allIds.map(id => ({ ...PEstore.byId[id] }))
  const petitionEvent = petitionEvents.find(PE => PE.id === petitionEvent_id)
  let newPetitionEvent = petitionEvent ? { ...petitionEvent } : null

  //add inscriptionEvent if needed
  if (newPetitionEvent && options.withInscriptionEvent) {
    const opt_InscriptionEvent = typeof options.withInscriptionEvent === 'object' ? options.withInscriptionEvent : {}
    newPetitionEvent.inscriptionEvent = selectInscriptionEventById_noMemo(
      store,
      newPetitionEvent.inscriptionEvent_id,
      opt_InscriptionEvent
    )
  }

  return newPetitionEvent
}
