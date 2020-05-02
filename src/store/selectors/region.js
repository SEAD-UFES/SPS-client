/** @format */

import { createSelector } from 'reselect'

const selectRegionStore = store => store.regionStoreV2

export const selectRegion = createSelector(
  [selectRegionStore],
  vs => vs.allIds.map(id => ({ ...vs.byId[id] }))
)

export const selectRegionById = createSelector(
  [],
  () => {}
)
