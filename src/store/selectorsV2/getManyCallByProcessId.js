/** @format */

import { getCallById } from './getCall'

export const getManyCallByProcessId = (store, process_id, options = {}) => {
  //find call
  const CallStoreV2 = store.callStoreV2
  const calls = CallStoreV2.allIds.map(id => ({ ...CallStoreV2.byId[id] }))
  const processCalls = calls.filter(call => call.selectiveProcess_id === process_id)
  const completeProcessCalls = processCalls.map(call => getCallById(store, call.id, options))

  return completeProcessCalls
}
