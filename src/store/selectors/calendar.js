/** @format */

import { createSelector } from 'reselect'
import moment from 'moment'

const calcCalendarStatus = (cld, calendars) => {
  const status = {
    ag: 'Aguardando',
    atd: 'Atrasado por dependência',
    at: 'Atrasado',
    ad: 'Em andamento',
    cc: 'Concluído!'
  }

  const ready = cld.ready
  const now = moment()
  const startDate = moment(cld.start)
  const endDate = cld.end ? moment(cld.end) : moment(cld.start)

  //Aguardando
  if (startDate > now) return status['ag']

  //Atrasado por dependencia
  const fatherCalendar = cld.calendar_id ? calendars.find(calendar => calendar.id === cld.calendar_id) : null
  const fatherStatus = fatherCalendar ? calcCalendarStatus(fatherCalendar, calendars) : null
  if (fatherStatus === status['atd'] || fatherStatus === status['at']) return status['atd']

  //Atrasado
  if (ready === false && startDate < now) return status['at']

  //Em andamento
  if (ready === true && startDate < now && now < endDate) return status['ad']

  //Concluído
  return status['cc']
}

const selectCalendarStore = store => store.calendarStore

const selectCalendar = createSelector(
  [selectCalendarStore],
  cs => cs.allIds.map(id => ({ ...cs.byId[id] }))
)

export const makeSelectCalendarById = () => {
  const getId = (store, id, options) => id
  const getOptions = (store, id, options) => options
  return createSelector(
    [selectCalendar, getId, getOptions],
    (calendars, id, options) => {
      let calendar = calendars.find(cld => cld.id === id)
      return calendar
    }
  )
}

export const makeSelectCalendarByCallId = () => {
  const getId = (store, id, options) => id
  const getOptions = (store, id, options) => options
  return createSelector(
    [selectCalendar, getId, getOptions],
    (calendars, id, options) => {
      let selectedCalendars = calendars.filter(x => x.call_id === id)
      selectedCalendars = selectedCalendars.map(cld => {
        cld.status = calcCalendarStatus(cld, calendars)
        return cld
      })

      return selectedCalendars
    }
  )
}

//single instance of selectCalendarById
export const selectCalendarById = makeSelectCalendarById()

//single instance of selectCalendarByCallId
export const selectCalendarByCallId = makeSelectCalendarByCallId()
