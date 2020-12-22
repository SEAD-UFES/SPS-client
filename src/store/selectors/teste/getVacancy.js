/** @format */

import { getCallById } from './getCall'
import { getAssignmentById } from './getAssignment'
import { getRegionById } from './getRegion'
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

  //get father assignment
  if (newVacancy && options.withAssignment) {
    const opt_assig = typeof options.withAssignment === 'object' ? options.withAssignment : {}
    newVacancy.assignment = getAssignmentById(store, newVacancy.assignment_id, opt_assig)
  }

  //get father region
  if (newVacancy && options.withRegion) {
    const opt_region = typeof options.withRegion === 'object' ? options.withRegion : {}
    newVacancy.region = getRegionById(store, newVacancy.region_id, opt_region)
  }

  //get father restriction
  if (newVacancy && options.withRestriction) {
    const opt_rest = typeof options.withRestriction === 'object' ? options.withRestriction : {}
    newVacancy.restriction = getRegionById(store, newVacancy.restriction_id, opt_rest)
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
