/** @format */

import { createSelector } from 'reselect'

import { checkNested } from '../../../utils/objectHelpers'
import { makeSelectVacancyById } from '../vacancy/vacancy'
import { makeSelectPersonById } from '../person/selectPersonById'

const selectInscriptionStore = store => store.inscriptionStore

export const selectInscription = createSelector(
  [selectInscriptionStore],
  is => is.allIds.map(id => ({ ...is.byId[id] }))
)

export const makeSelectInscriptionById = () => {
  const getStore = store => store
  const getId = (store, id, options) => id
  const getOptions = (store, id, options) => options
  const selectVacancyById = makeSelectVacancyById()
  const selectPersonById = makeSelectPersonById()

  return createSelector(
    [selectInscription, getStore, getId, getOptions],
    (inscriptions, store, id, options) => {
      let inscription = inscriptions.find(ins => ins.id === id)

      if (inscription && options.withVacancy) {
        const vacancy = selectVacancyById(store, inscription.vacancy_id, options)
        inscription = { ...inscription, vacancy: vacancy }
      }

      if (inscription && options.withPerson) {
        const person = selectPersonById(store, inscription.person_id, options)
        inscription = { ...inscription, person: person }
      }

      return inscription ? inscription : null
    }
  )
}

export const makeSelectInscriptionByInscriptionEventId = () => {
  const getId = (store, id, options) => id
  const getOptions = (store, id, options) => options
  const getStore = store => store

  return createSelector(
    [selectInscription, getStore, getId, getOptions],
    (inscriptions, store, id, options) => {
      let selectedInscriptions = inscriptions.filter(x => x.inscriptionEvent_id === id)

      //insert vacancy if needed
      if (options.withVacancy) {
        selectedInscriptions = selectedInscriptions.map(ins => {
          const selectVacancyById = makeSelectVacancyById()
          return { ...ins, vacancy: selectVacancyById(store, ins.vacancy_id, options) }
        })
      }

      //insert person if needed
      if (options.withPerson) {
        selectedInscriptions = selectedInscriptions.map(ins => {
          const selectPersonById = makeSelectPersonById()
          return { ...ins, person: selectPersonById(store, ins.person_id, options) }
        })
      }

      return selectedInscriptions
    }
  )
}

export const makeSelectMyInscriptionByInscriptionEventId = () => {
  const getId = (store, id, options = {}) => id
  const getOptions = (store, id, options = {}) => options
  const getStore = store => store
  const selectVacancyById = makeSelectVacancyById()
  const getPersonId = store => {
    const personId = checkNested(store, 'profileStore', 'profile', 'Person', 'id')
      ? store.profileStore.profile.Person.id
      : null
    return personId
  }

  return createSelector(
    [selectInscription, getPersonId, getStore, getId, getOptions],
    (inscriptions, personId, store, id, options) => {
      let selectedInscriptions = inscriptions.filter(x => x.inscriptionEvent_id === id && x.person_id === personId)

      //insert vacancy if needed
      if (options.withVacancy) {
        selectedInscriptions = selectedInscriptions.map(ins => {
          return { ...ins, vacancy: selectVacancyById(store, ins.vacancy_id, options) }
        })
      }

      return selectedInscriptions
    }
  )
}

//single instance of selectInscriptionById
export const selectInscriptionById = makeSelectInscriptionById()

//single instance of selectInscriptionByInscriptionEventId
export const selectInscriptionByInscriptionEventId = makeSelectInscriptionByInscriptionEventId()

//single instance of selectMyInscriptionByInscriptionEventId
export const selectMyInscriptionByInscriptionEventId = makeSelectMyInscriptionByInscriptionEventId()
