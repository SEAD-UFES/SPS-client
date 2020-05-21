/** @format */

import { createSelector } from 'reselect'

import { makeSelectVacancyById, makeSelectVacancyByCallId } from './vacancy'
import { makeSelectCalendarByCallId, makeSelectCalendarById } from './calendar'

const selectSingleCallById = (store, call_id, options = {}) => {
  let call = store.callStoreV2.byId[call_id] ? { ...store.callStoreV2.byId[call_id] } : null
  return call
}

//make selector call by id
export const makeSelectCallById = () => {
  const selectCalendarByCallId = makeSelectCalendarByCallId()
  const selectVacancyByCallId = makeSelectVacancyByCallId()
  const getStore = store => store
  const getOptions = (store, id, options = {}) => options
  return createSelector(
    [getStore, selectSingleCallById, getOptions],
    (store, call, options) => {
      let newCall = call

      if (call && options.withCalendar) newCall.calendars = selectCalendarByCallId(store, call.id, options)

      if (call && options.withVacancy) newCall.vacancies = selectVacancyByCallId(store, call.id, options)

      return newCall
    }
  )
}

//make selector call by vacancy id
export const makeSelectCallByVacancyId = () => (state, vacancy_id, options = {}) => {
  const selectVacancyById = makeSelectVacancyById()
  const selectCallById = makeSelectCallById()
  const vacancy = selectVacancyById(state, vacancy_id, {})
  const call = vacancy ? selectCallById(state, vacancy.call_id, options) : null
  return call
}

export const makeSelectCallByCalendarId = () => {
  const selectCalendarById = makeSelectCalendarById()
  const selectCallById = makeSelectCallById()
  const getStore = store => store
  const getOptions = (store, id, options = {}) => options

  return createSelector(
    [selectCalendarById, getStore, getOptions],
    (calendar, store, options) => {
      const call_id = calendar ? calendar.call_id : null
      const call = selectCallById(store, call_id, options)
      return call
    }
  )
}

//single instance of selectCallByVacancyId
export const selectCallByVacancyId = makeSelectCallByVacancyId()

//single instance of selectCallById
export const selectCallById = makeSelectCallById()

//single instance of selectCallByCalendarId
export const selectCallByCalendarId = makeSelectCallByCalendarId()

//select processStore
const selectProcessStore = store => store.processStore

//selectProcess
export const selectProcessByCallId = createSelector(
  [selectProcessStore, makeSelectCallById()],
  (processStore, call) => (call ? processStore.process : null)
)
