/** @format */

export const selectCalendarById_noMemo = (store, calendar_id, options) => {
  const calendarStore = store.calendarStore
  const calendars = calendarStore.allIds.map(id => ({ ...calendarStore.byId[id] }))
  const calendar = calendars.find(cld => cld.id === calendar_id)
  let newCalendar = calendar ? { ...calendar } : null

  return newCalendar
}
