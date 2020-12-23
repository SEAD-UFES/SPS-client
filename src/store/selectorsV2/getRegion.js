/** @format */

export const getRegionById = (store, id, options = {}) => {
  //find region
  const RegionStore = store.regionStoreV2
  const regions = RegionStore.allIds.map(id => ({ ...RegionStore.byId[id] }))
  const region = regions.find(reg => reg.id === id)
  const newRegion = region ? { ...region } : null

  return newRegion
}
