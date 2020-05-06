/** @format */

import { createSelector } from 'reselect'

const selectRegionStore = store => store.regionStoreV2

export const selectRegion = createSelector(
  [selectRegionStore],
  rs => rs.allIds.map(id => ({ ...rs.byId[id] }))
)

export const selectRegionById = createSelector(
  [],
  () => {}
)
