/** @format */

import { createSelector } from 'reselect'

import { selectInscriptionEvent } from './inscriptionEvent'

export const makeSelectInscriptionEventByCalendarId = () => {
  const getId = (store, id, options) => id
  const getOptions = (store, id, options) => options

  return createSelector(
    [selectInscriptionEvent, getId, getOptions],
    (iEvents, id, options) => {
      let selectedIEs = iEvents.filter(x => x.calendar_id === id)
      return selectedIEs
    }
  )
}

//single instance of selectInscriptionEventByCalendarId
export const selectInscriptionEventByCalendarId = makeSelectInscriptionEventByCalendarId()
