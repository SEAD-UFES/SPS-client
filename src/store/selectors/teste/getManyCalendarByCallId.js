/** @format */

import { getCalendarById } from './getCalendar'

export const getManyCalendarByCallId = (store, call_id, options = {}) => {
  console.log('pegando many calendars de call')
  //find call
  const CalendarStore = store.calendarStore
  const calendars = CalendarStore.allIds.map(id => ({ ...CalendarStore.byId[id] }))
  const callCalendars = calendars.filter(cal => cal.call_id === call_id)
  const completeCallCalendars = callCalendars.map(cal => getCalendarById(store, cal.id, options))

  return completeCallCalendars
}
