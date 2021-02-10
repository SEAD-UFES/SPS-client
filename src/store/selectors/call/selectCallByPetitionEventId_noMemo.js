/** @format */

import { selectCalendarByPetitionEventId_noMemo } from '../calendar/selectCalendarByPetitionEventId_noMemo'

export const selectCallByPetitionEventId_noMemo = (store, petitionEvent_id, options = {}) => {
  //get calendar
  const calendar = selectCalendarByPetitionEventId_noMemo(store, petitionEvent_id, options)
  const call_id = calendar ? calendar.call_id : null

  //find call
  const CallStoreV2 = store.callStoreV2
  const calls = CallStoreV2.allIds.map(id => ({ ...CallStoreV2.byId[id] }))
  const call = calls.find(call => call.id === call_id)
  const newCall = call ? { ...call } : null

  return newCall
}
