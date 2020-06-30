/** @format */

import { createSelector } from 'reselect'

import { checkNested } from '../../utils/objectHelpers'
import { makeSelectVacancyById } from './vacancy'

const selectInscriptionStore = store => store.inscriptionStore

const selectInscription = createSelector(
  [selectInscriptionStore],
  is => is.allIds.map(id => ({ ...is.byId[id] }))
)

export const makeSelectInscriptionById = () => {
  const getStore = store => store
  const getId = (store, id, options) => id
  const getOptions = (store, id, options) => options

  return createSelector(
    [selectInscription, getStore, getId, getOptions],
    (inscriptions, store, id, options) => {
      let inscription = inscriptions.find(ins => ins.id === id)
      return inscription ? inscription : null
    }
  )
}

export const makeSelectInscriptionByInscriptionEventId = () => {
  const getId = (store, id, options) => id
  const getOptions = (store, id, options) => options
  const getStore = store => store

  console.log(makeSelectVacancyById)
  const selecInscriptionEventBy = makeSelectVacancyById()

  return createSelector(
    [selectInscription, getStore, getId, getOptions],
    (inscriptions, store, id, options) => {
      let selectedInscriptions = inscriptions.filter(x => x.inscriptionEvent_id === id)

      return selectedInscriptions
    }
  )
}

export const makeSelectMyInscriptionByInscriptionEventId = () => {
  const getId = (store, id, options = {}) => id
  const getOptions = (store, id, options = {}) => options
  const getStore = store => store
  const getPersonId = store => {
    const personId = checkNested(store, 'profileStore', 'profile', 'Person', 'id')
      ? store.profileStore.profile.Person.id
      : null
    return personId
  }
  const selectVacancyById = makeSelectVacancyById()

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
