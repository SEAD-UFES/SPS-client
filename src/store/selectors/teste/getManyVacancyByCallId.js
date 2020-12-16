/** @format */

import { getVacancyById } from './getVacancy'

export const getManyVacancyByCallId = (store, call_id, options = {}) => {
  console.log('pegando many vacancy de call')
  //find call
  const VacancyStore = store.vacancyStore
  const vacancies = VacancyStore.allIds.map(id => ({ ...VacancyStore.byId[id] }))
  const vacanciesOfThisCall = vacancies.filter(vac => vac.call_id === call_id)
  const completeVacanciesOfThisCall = vacanciesOfThisCall.map(cal => getVacancyById(store, cal.id, options))

  return completeVacanciesOfThisCall
}
