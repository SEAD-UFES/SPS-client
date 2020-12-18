/** @format */

import { getCallById } from './getCall'
import { getManyInscriptionByVacancyId } from './getManyInscriptionByVacancyId'

export const getVacancyById = (store, id, options = {}) => {
  //find vacancy
  const VacancyStore = store.vacancyStore
  const vacancies = VacancyStore.allIds.map(id => ({ ...VacancyStore.byId[id] }))
  const vacancy = vacancies.find(cal => cal.id === id)
  const newVacancy = vacancy ? { ...vacancy } : null

  //get father Call
  if (newVacancy && options.withCall) {
    const opt_call = typeof options.withCall === 'object' ? options.withCall : {}
    newVacancy.call = getCallById(store, newVacancy.call_id, opt_call)
  }

  //get child inscription
  if (newVacancy && options.withInscription) {
    const opt_ins = typeof options.withInscription === 'object' ? options.withInscription : {}
    newVacancy.inscriptions = getManyInscriptionByVacancyId(store, newVacancy.id, opt_ins)
  }

  //get father restriction
  //get father region
  //get father restriction

  return newVacancy
}
