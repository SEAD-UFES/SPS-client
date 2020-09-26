/** @format */

import { createSelector } from 'reselect'

import { makeSelectInscriptionById_single } from '../inscription/selectInscriptionById_single'
import { makeSelectCalendarByInscriptionEventId } from './calendar'
import { isEmpty } from '../../../utils/objectHelpers'

export const makeSelectCalendarByInscriptionId = () => {
  const getOptions = (store, id, options) => options
  const getStore = store => store
  const selectInscriptionById = makeSelectInscriptionById_single()
  const selectCalendarByInscriptionEventId = makeSelectCalendarByInscriptionEventId()

  return createSelector(
    [selectInscriptionById, getStore, getOptions],
    (inscription, store, options) => {
      if (!inscription) return null
      const calendar = selectCalendarByInscriptionEventId(store, inscription.inscriptionEvent_id, options)
      return !isEmpty(calendar) ? calendar : null
    }
  )
}

//single instance of selectInscriptionEventByCalendarId
export const selectCalendarByInscriptionId = makeSelectCalendarByInscriptionId()
