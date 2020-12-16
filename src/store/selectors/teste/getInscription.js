/** @format */

import { getInscriptionEventById } from './getInscriptionEvent'
import { getPersonById } from './getPerson'
import { getVacancyById } from './getVacancy'

export const getInscriptionById = (store, id, options = {}) => {
  console.log('pegando inscription')
  //find call
  const InscriptionStore = store.inscriptionStore
  const inscriptions = InscriptionStore.allIds.map(id => ({ ...InscriptionStore.byId[id] }))
  const inscription = inscriptions.find(ins => ins.id === id)
  const newInscription = inscription ? { ...inscription } : null

  //get father InscriptionEvent
  if (newInscription && options.withInscriptionEvent) {
    const opt_ie = typeof options.withInscriptionEvent === 'object' ? options.withInscriptionEvent : {}
    newInscription.inscriptionEvent = getInscriptionEventById(store, newInscription.inscriptionEvent_id, opt_ie)
  }

  //get father Vacancy
  if (newInscription && options.withVacancy) {
    const opt_vac = typeof options.withVacancy === 'object' ? options.withVacancy : {}
    newInscription.vacancy = getVacancyById(store, newInscription.vacancy_id, opt_vac)
  }

  //get father Person
  if (newInscription && options.withPerson) {
    const opt_person = typeof options.withPerson === 'object' ? options.withPerson : {}
    newInscription.person = getPersonById(store, newInscription.person_id, opt_person)
  }

  return newInscription
}
