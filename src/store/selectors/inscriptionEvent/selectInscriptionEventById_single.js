/** @format */

import { createSelector } from 'reselect'

import { selectInscriptionEvent } from './inscriptionEvent'

export const makeSelectInscriptionEventById_single = () => {
  const getStore = store => store
  const getId = (store, id, options) => id
  const getOptions = (store, id, options) => options

  return createSelector(
    [selectInscriptionEvent, getStore, getId, getOptions],
    (iEvents, store, id, options) => {
      let iEvent = iEvents.find(ie => ie.id === id)
      return iEvent ? iEvent : null
    }
  )
}

//single instance of selectInscriptionEventById
export const selectInscriptionEventById_single = makeSelectInscriptionEventById_single()
