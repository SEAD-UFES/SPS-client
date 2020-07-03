/** @format */

import { createSelector } from 'reselect'

import { makeSelectInscriptionById_single } from '../inscription/selectInscriptionById_single'
import { makeSelectCallByInscriptionEventId } from './call'
import { isEmpty } from '../../../utils/objectHelpers'

export const makeSelectCallByInscriptionId = () => {
  const getOptions = (store, id, options) => options
  const getStore = store => store
  const selectInscriptionById = makeSelectInscriptionById_single()
  const selectCallByInscriptionEventId = makeSelectCallByInscriptionEventId()

  return createSelector(
    [selectInscriptionById, getStore, getOptions],
    (inscription, store, options) => {
      if (!inscription) return null
      const call = selectCallByInscriptionEventId(store, inscription.inscriptionEvent_id, options)
      return !isEmpty(call) ? call : null
    }
  )
}

//single instance of selectInscriptionEventByCalendarId
export const selectCallByInscriptionId = makeSelectCallByInscriptionId()
