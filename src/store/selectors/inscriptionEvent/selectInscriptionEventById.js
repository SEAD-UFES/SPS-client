/** @format */

import { createSelector } from 'reselect'

import { selectInscriptionEvent } from './inscriptionEvent'

import { makeSelectInscriptionByInscriptionEventId } from '../inscription'

export const makeSelectInscriptionEventById = () => {
  const getStore = store => store
  const getId = (store, id, options) => id
  const getOptions = (store, id, options) => options
  const selectInscriptionByInscriptionEventId = makeSelectInscriptionByInscriptionEventId()

  return createSelector(
    [selectInscriptionEvent, selectInscriptionByInscriptionEventId, getStore, getId, getOptions],
    (iEvents, inscriptions, store, id, options) => {
      let iEvent = iEvents.find(ie => ie.id === id)

      //add inscription if needed
      if (options.withInscription) {
        iEvent = { ...iEvent, inscriptions: inscriptions }
      }

      return iEvent ? iEvent : null
    }
  )
}

//single instance of selectInscriptionEventById
export const selectInscriptionEventById = makeSelectInscriptionEventById()
