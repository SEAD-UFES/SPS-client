/** @format */

import { createSelector } from 'reselect'

import { selectCall } from './call'
import { makeSelectCalendarByCallId } from '../calendar/calendar'
import { makeSelectVacancyByCallId } from '../vacancy/vacancy'

export const makeSelectCallByProcessId = () => {
  const getId = (store, id, options) => id
  const getOptions = (store, id, options) => options
  const getStore = store => store

  return createSelector(
    [selectCall, getStore, getId, getOptions],
    (calls, store, id, options) => {
      let selectedCalls = calls.filter(x => x.selectiveProcess_id === id)

      //get calendars
      if (selectedCalls.length > 0 && options.withCalendar) {
        selectedCalls = selectedCalls.map(call => {
          const selectCalendarByCallId = makeSelectCalendarByCallId()
          const calendars = selectCalendarByCallId(store, call.id, options)
          return { ...call, calendars: calendars }
        })
      }

      //get vacamcy
      if (selectedCalls.length > 0 && options.withVacancy) {
        selectedCalls = selectedCalls.map(call => {
          const selectVacancyByCallId = makeSelectVacancyByCallId()
          const vacancies = selectVacancyByCallId(store, call.id, options)
          return { ...call, vacancies: vacancies }
        })
      }

      return selectedCalls
    }
  )
}

//single instance of selectCallByProcessId
export const selectCallByProcessId = makeSelectCallByProcessId()
