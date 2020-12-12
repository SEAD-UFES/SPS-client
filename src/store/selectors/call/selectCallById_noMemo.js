/** @format */

export const selectCallById_noMeno = (store, call_id, options = {}) => {
  const CallStoreV2 = store.callStoreV2
  const calls = CallStoreV2.allIds.map(id => ({ ...CallStoreV2.byId[id] }))
  const call = calls.find(call => call.id === call_id)
  const newCall = { ...call }
  return newCall
}
