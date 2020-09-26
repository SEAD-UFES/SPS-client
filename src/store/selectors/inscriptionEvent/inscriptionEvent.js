/** @format */

import { createSelector } from 'reselect'

export const selectInscriptionEventStore = store => store.inscriptionEventStore

export const selectInscriptionEvent = createSelector(
  [selectInscriptionEventStore],
  iEs => iEs.allIds.map(id => ({ ...iEs.byId[id] }))
)
