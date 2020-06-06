/** @format */

import { createSelector } from 'reselect'

const selectInscriptionEventStore = store => store.inscriptionEventStore

const selectInscriptionEvent = createSelector(
  [selectInscriptionEventStore],
  iEs => iEs.allIds.map(id => ({ ...iEs.byId[id] }))
)

export const makeSelectInscriptionEventById = () => {
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

//single instance of selectInscriptionEventById
export const selectInscriptionEventById = makeSelectInscriptionEventById()

//single instance of selectInscriptionEventByCalendarId
export const selectInscriptionEventByCalendarId = makeSelectInscriptionEventByCalendarId()
