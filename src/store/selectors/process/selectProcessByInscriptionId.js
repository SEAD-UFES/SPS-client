/** @format */

import { createSelector } from 'reselect'

import { makeSelectInscriptionById_single } from '../inscription/selectInscriptionById_single'
import { makeSelectProcessByInscriptionEventId } from './process'
import { isEmpty } from '../../../utils/objectHelpers'

export const makeSelectProcessByInscriptionId = () => {
  const getOptions = (store, id, options) => options
  const getStore = store => store
  const selectInscriptionById = makeSelectInscriptionById_single()
  const selectProcessByInscriptionEventId = makeSelectProcessByInscriptionEventId()

  return createSelector(
    [selectInscriptionById, getStore, getOptions],
    (inscription, store, options) => {
      if (!inscription) return null
      const process = selectProcessByInscriptionEventId(store, inscription.inscriptionEvent_id, options)
      return !isEmpty(process) ? process : null
    }
  )
}

//single instance of selectInscriptionEventByCalendarId
export const selectProcessByInscriptionId = makeSelectProcessByInscriptionId()
