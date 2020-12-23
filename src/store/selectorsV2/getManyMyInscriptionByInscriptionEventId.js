/** @format */

import { checkNested } from '../../utils/objectHelpers'
import { getInscriptionById } from './getInscription'

export const getManyMyInscriptionByInscriptionEventId = (store, ie_id, options = {}) => {
  //find person_id
  const ProfileStore = store.profileStore
  const person_id = checkNested(ProfileStore, 'profile', 'Person') ? ProfileStore.profile.Person.id : null

  //find inscriptions
  const InscriptionStore = store.inscriptionStore
  const inscriptions = InscriptionStore.allIds.map(id => ({ ...InscriptionStore.byId[id] }))
  const MyinscriptionsOfThisIE = inscriptions.filter(
    ins => ins.inscriptionEvent_id === ie_id && ins.person_id === person_id
  )
  const completeMyInscriptionsOfThisIE = MyinscriptionsOfThisIE.map(ins => getInscriptionById(store, ins.id, options))

  return completeMyInscriptionsOfThisIE
}
