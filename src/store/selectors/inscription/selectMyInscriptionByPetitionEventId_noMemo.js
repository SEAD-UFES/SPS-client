/** @format */

import { checkNested } from '../../../utils/objectHelpers'

export const selectUserInscriptionByPetitionEventId_noMemo = (store, petitionEvent_id, options = {}) => {
  //find petitionEvent
  const PEstore = store.petitionEventStore
  const petitionEvents = PEstore.allIds.map(id => ({ ...PEstore.byId[id] }))
  const petitionEvent = petitionEvents.find(PE => PE.id === petitionEvent_id)

  //find inscriptionEvent_id
  const inscriptionEvent_id = petitionEvent.inscriptionEvent_id

  //find inscriptions by InscriptionEventId
  const IStore = store.inscriptionStore
  const allInscriptions = IStore.allIds.map(id => ({ ...IStore.byId[id] }))
  const inscriptions = allInscriptions.filter(ins => ins.inscriptionEvent_id === inscriptionEvent_id)

  //find person_id
  const person_id = checkNested(store, 'profileStore', 'profile', 'Person')
    ? store.profileStore.profile.Person.id
    : null

  //find user inscriptions
  const userInscriptions = inscriptions.map(ins => ins.person_id === person_id)

  return userInscriptions
}
