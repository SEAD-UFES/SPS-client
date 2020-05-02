/** @format */

import { createSelector } from 'reselect'

const selectAssignmentStore = store => store.assignmentStoreV2

export const selectAssignment = createSelector(
  [selectAssignmentStore],
  vs => vs.allIds.map(id => ({ ...vs.byId[id] }))
)

export const selectAssignmentById = createSelector(
  [],
  () => {}
)

export const selectAssignment_old = store => {
  const byId = store.assignmentStoreV2.byId
  const allIds = store.assignmentStoreV2.allIds
  const assignments = allIds.map(id => ({ ...byId[id] }))
  return assignments
}
