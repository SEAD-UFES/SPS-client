/** @format */

import { getInscriptionById } from './getInscription'

export const getManyInscriptionByInscriptionEventId = (store, ie_id, options = {}) => {
  console.log('pegando many inscription  de IE')
  //find inscription Events
  const InscriptionStore = store.inscriptionStore
  const inscriptions = InscriptionStore.allIds.map(id => ({ ...InscriptionStore.byId[id] }))
  const InscriptionsOfThisIE = inscriptions.filter(ins => ins.inscriptionEvent_id === ie_id)
  const completeInscriptionsOfThisIE = InscriptionsOfThisIE.map(ins => getInscriptionById(store, ins.id, options))

  return completeInscriptionsOfThisIE
}
