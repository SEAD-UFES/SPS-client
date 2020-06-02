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
  const getStore = store => store
  const getId = (store, id, options) => id
  const getOptions = (store, id, options) => options

  return createSelector(
    [selectCalendar, getStore, getId, getOptions],
    (calendars, store, id, options) => {
      let calendar = calendars.find(cld => cld.id === id)

      //add father calendar
      if (calendar && options.withCalendar) {
        const selectCalendarById = makeSelectCalendarById()
        const fatherCalendar = selectCalendarById(store, calendar.calendar_id, options)
        calendar = { ...calendar, calendar: fatherCalendar ? fatherCalendar : null }
      }

      //calc status (need to have brother calendars on reducer)
      if (calendar && options.withCalendarStatus) {
        const brotherCalendars = calendars.filter(cld => cld.call_id === calendar.call_id)
        const status = calcCalendarStatus(calendar, brotherCalendars)
        calendar = { ...calendar, status: status ? status : null }
      }

      return calendar ? calendar : null
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

      //calc calendarStatus
      if (options.withCalendarStatus) {
        selectedCalendars = selectedCalendars.map((cld, key, list) => {
          const status = calcCalendarStatus(cld, list)
          cld.status = status
          return cld
        })
      }

      return selectedCalendars
    }
  )
}

export const makeSelectBrotherCalendarById = () => {
  const selectCalendarById = makeSelectCalendarById()
  const getId = (store, id, options) => id
  const getOptions = (store, id, options = {}) => options

  return createSelector(
    [selectCalendar, selectCalendarById, getId, getOptions],
    (calendars, calendar, id, options) => {
      const calendar_id = calendar ? calendar.id : null
      const call_id = calendar ? calendar.call_id : null
      const brotherCalendars = calendars.filter(cld => cld.call_id === call_id && cld.id !== calendar_id)
      return brotherCalendars
    }
  )
}

//single instance of selectCalendarById
export const selectCalendarById = makeSelectCalendarById()

//single instance of selectCalendarByCallId
export const selectCalendarByCallId = makeSelectCalendarByCallId()

//single instance of selectBrotherCalendarById
export const selectBrotherCalendarById = makeSelectBrotherCalendarById()
