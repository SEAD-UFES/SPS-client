/** @format */

import { createSelector } from 'reselect'

export const selectPetitionEventStore = store => store.petitionEventStore

export const selectPetitionEvent = createSelector(
  [selectPetitionEventStore],
  pEs => pEs.allIds.map(id => ({ ...pEs.byId[id] }))
)
