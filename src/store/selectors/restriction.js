/** @format */

import { createSelector } from 'reselect'

const selectRestrictionStore = store => store.restrictionStoreV2

export const selectRestriction = createSelector(
  [selectRestrictionStore],
  vs => vs.allIds.map(id => ({ ...vs.byId[id] }))
)

export const selectRestrictionById = createSelector(
  [],
  () => {}
)
