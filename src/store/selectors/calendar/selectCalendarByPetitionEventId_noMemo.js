/** @format */

import { selectPetitionEventById_noMemo } from '../petitionEvent/selectPetitionEventById_noMemo'
import { selectCalendarById_noMemo } from './selectCalendarById_noMemo'

export const selectCalendarByPetitionEventId_noMemo = (store, petitionEvent_id, options = {}) => {
  const petitionEvent = selectPetitionEventById_noMemo(store, petitionEvent_id, {})
  const calendar_id = petitionEvent ? petitionEvent.calendar_id : null
  const calendar = selectCalendarById_noMemo(store, calendar_id, {})
  return calendar
}
