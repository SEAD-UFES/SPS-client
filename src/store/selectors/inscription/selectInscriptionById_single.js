/** @format */

import { createSelector } from 'reselect'

import { selectInscription } from './inscription'

export const makeSelectInscriptionById_single = () => {
  const getStore = store => store
  const getId = (store, id, options) => id
  const getOptions = (store, id, options) => options

  return createSelector(
    [selectInscription, getStore, getId, getOptions],
    (iEvents, store, id, options) => {
      let iEvent = iEvents.find(ie => ie.id === id)
      return iEvent ? iEvent : null
    }
  )
}

//single instance of selectInscriptionById
export const selectInscriptionById_single = makeSelectInscriptionById_single()
