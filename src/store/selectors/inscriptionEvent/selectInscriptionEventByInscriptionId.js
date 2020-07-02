/** @format */

import { createSelector } from 'reselect'

import { makeSelectInscriptionById_single } from '../inscription/selectInscriptionById_single'
import { makeSelectInscriptionEventById } from './selectInscriptionEventById'

//make selector InscriptonEvent by Inscription id
export const makeSelectInscriptionEventByInscriptionId = () => {
  const getStore = store => store
  const getOptions = (store, id, options = {}) => options
  const selectInscriptionById = makeSelectInscriptionById_single()
  const selectInscriptionEventById = makeSelectInscriptionEventById()

  return createSelector(
    [selectInscriptionById, getStore, getOptions],
    (inscription, store, options) => {
      const iEvent_id = inscription ? inscription.inscriptionEvent_id : null
      const iEvent = selectInscriptionEventById(store, iEvent_id, options)
      return iEvent
    }
  )
}

//single instance of selectInscriptionEventByInscriptionId
export const selectInscriptionEventByInscriptionId = makeSelectInscriptionEventByInscriptionId()
