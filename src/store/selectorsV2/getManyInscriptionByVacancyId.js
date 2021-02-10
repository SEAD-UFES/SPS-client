/** @format */

import { getInscriptionById } from './getInscription'

export const getManyInscriptionByVacancyId = (store, vac_id, options = {}) => {
  //find inscription Events
  const InscriptionStore = store.inscriptionStore
  const inscriptions = InscriptionStore.allIds.map(id => ({ ...InscriptionStore.byId[id] }))
  const inscriptionsOfThisVacancy = inscriptions.filter(ins => ins.vacancy_id === vac_id)
  const completeInscriptionsOfThisVacancy = inscriptionsOfThisVacancy.map(ins =>
    getInscriptionById(store, ins.id, options)
  )

  return completeInscriptionsOfThisVacancy
}
