/** @format */

import { createSelector } from 'reselect'

import { makeSelectVacancyById, makeSelectVacancyByCallId } from '../vacancy/vacancy'
import { makeSelectCalendarByCallId, makeSelectCalendarById } from '../calendar/calendar'
import { makeSelectInscriptionEventById } from '../inscriptionEvent/selectInscriptionEventById'

export const selectCallStore = store => store.callStoreV2

export const selectCall = createSelector(
  [selectCallStore],
  cs => cs.allIds.map(id => ({ ...cs.byId[id] }))
)

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

//make selector call by calendar id
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

//make selector call by InscriptionEvent id
export const makeSelectCallByInscriptionEventId = () => {
  const selectInscriptionEventById = makeSelectInscriptionEventById()
  const selectCallByCalendarId = makeSelectCallByCalendarId()
  const getStore = store => store
  const getOptions = (store, id, options = {}) => options

  return createSelector(
    [selectInscriptionEventById, getStore, getOptions],
    (iEvent, store, options) => {
      const calendar_id = iEvent ? iEvent.calendar_id : null
      if (!calendar_id) return null

      const call = selectCallByCalendarId(store, calendar_id, options)
      if (!call) return null

      return call
    }
  )
}

//single instance of selectCallById
export const selectCallById = makeSelectCallById()

//single instance of selectCallByVacancyId
export const selectCallByVacancyId = makeSelectCallByVacancyId()

//single instance of selectCallByCalendarId
export const selectCallByCalendarId = makeSelectCallByCalendarId()

//single instance of selectCallByInscriptionEventId
export const selectCallByInscriptionEventId = makeSelectCallByInscriptionEventId()

//select processStore
const selectProcessStore = store => store.processStore

//selectProcess
export const selectProcessByCallId = createSelector(
  [selectProcessStore, makeSelectCallById()],
  (processStore, call) => (call ? processStore.process : null)
)
