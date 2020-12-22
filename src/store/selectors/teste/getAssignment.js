/** @format */

export const getAssignmentById = (store, id, options = {}) => {
  //find assignment
  const AssignmentStore = store.assignmentStoreV2
  const assignments = AssignmentStore.allIds.map(id => ({ ...AssignmentStore.byId[id] }))
  const assignment = assignments.find(assig => assig.id === id)
  const newAssignment = assignment ? { ...assignment } : null

  return newAssignment
}
