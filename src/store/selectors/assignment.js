/** @format */

import { createSelector } from 'reselect'

const selectAssignmentStore = store => store.assignmentStoreV2

export const selectAssignment = createSelector(
  [selectAssignmentStore],
  as => as.allIds.map(id => ({ ...as.byId[id] }))
)

export const makeSelectAssignmentById = () => {
  const getId = (store, id) => id

  return createSelector(
    [selectAssignment, getId],
    (assignments, id) => {
      return assignments.find(assig => assig.id === id)
    }
  )
}

export const selectAssignmentById = makeSelectAssignmentById()

export const selectAssignment_old = store => {
  const byId = store.assignmentStoreV2.byId
  const allIds = store.assignmentStoreV2.allIds
  const assignments = allIds.map(id => ({ ...byId[id] }))
  return assignments
}
