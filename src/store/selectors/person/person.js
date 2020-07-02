/** @format */

import { createSelector } from 'reselect'

export const selectPersonStore = store => store.personStore

export const selectPerson = createSelector(
  [selectPersonStore],
  iEs => iEs.allIds.map(id => ({ ...iEs.byId[id] }))
)
