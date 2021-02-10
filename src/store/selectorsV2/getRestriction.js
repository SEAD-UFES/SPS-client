/** @format */

export const getRestrictionById = (store, id, options = {}) => {
  //find restriction
  const RestrictionStore = store.restrictionStoreV2
  const restrictions = RestrictionStore.allIds.map(id => ({ ...RestrictionStore.byId[id] }))
  const restriction = restrictions.find(rest => rest.id === id)
  const newRestriction = restriction ? { ...restriction } : null

  return newRestriction
}
