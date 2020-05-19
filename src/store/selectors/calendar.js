/** @format */

import { createSelector } from 'reselect'

const selectCalendarStore = store => store.calendarStore

const selectCalendar = createSelector(
  [selectCalendarStore],
  cs => cs.allIds.map(id => ({ ...cs.byId[id] }))
)

export const makeSelectCalendarByCallId = () => {
  return createSelector(
    [selectCalendar, (store, id, options) => id, (store, id, options) => options],
    (calendars, id, options) => {
      let selectedCalendars = calendars.filter(x => x.call_id === id)
      console.log('calendarios selecionados:', selectedCalendars)
      return selectedCalendars
    }
  )
}

//single instance of selectCalendarByCallId
export const selectCalendarByCallId = makeSelectCalendarByCallId()
