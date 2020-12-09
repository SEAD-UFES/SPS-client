/** @format */

import { createSelector } from 'reselect'

import { selectPetitionEvent } from './petitionEvent'

import { selectInscriptionEventById_noMemo } from '../inscriptionEvent/selectInscriptionEventById_noMemo'

export const makeSelectPetitionEventByCalendarId = () => {
  const getStore = (store, id, options) => store
  const getId = (store, id, options) => id
  const getOptions = (store, id, options) => options

  return createSelector(
    [selectPetitionEvent, getStore, getId, getOptions],
    (pEvents, store, id, options) => {
      let selectedPEs = pEvents.filter(x => x.calendar_id === id)

      if (options.withInscriptionEvent) {
        selectedPEs = selectedPEs.map(PE => {
          return { ...PE, inscriptionEvent: selectInscriptionEventById_noMemo(store, PE.inscriptionEvent_id, options) }
        })
      }

      console.log(selectedPEs)

      return selectedPEs
    }
  )
}

//single instance of selectInscriptionEventByCalendarId
export const selectPetitionEventByCalendarId = makeSelectPetitionEventByCalendarId()
