/** @format */

import { selectPetitionEventById_noMeno } from '../petitionEvent/selectPetitionEventById_noMeno'
import { selectCalendarById_noMemo } from './selectCalendarById_noMemo'

export const selectCalendarByPetitionEventId_noMeno = (store, petitionEvent_id, options = {}) => {
  const petitionEvent = selectPetitionEventById_noMeno(store, petitionEvent_id, {})
  const calendar_id = petitionEvent ? petitionEvent.calendar_id : null
  const calendar = selectCalendarById_noMemo(store, calendar_id, {})
  return calendar
}
