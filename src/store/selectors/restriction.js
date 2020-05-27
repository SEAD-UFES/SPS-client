/** @format */

import { createSelector } from 'reselect'

const selectRestrictionStore = store => store.restrictionStoreV2

export const selectRestriction = createSelector(
  [selectRestrictionStore],
  rs => rs.allIds.map(id => ({ ...rs.byId[id] }))
)

export const selectRestrictionById = createSelector(
  [],
  () => {}
)
