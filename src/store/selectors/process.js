/** @format */

import { makeSelectCallById, makeSelectCallByCalendarId } from './call'
import { makeSelectVacancyById } from './vacancy'
import { createSelector } from 'reselect'

//make selector process by id
export const makeSelectProcessById = () => (store, id, options = {}) => {
  const process = store.processStore.process
  return process ? process : null
}

//make selector process by call id
export const makeSelectProcessByCallId = () => (store, call_id, options = {}) => {
  const selectCallById = makeSelectCallById()
  const call = selectCallById(store, call_id, {})
  if (!call) return null

  const selectProcessById = makeSelectProcessById()
  const process = selectProcessById(store, call.selectiveProcess_id, options)
  if (!process) return null

  return process
}

//make selector process by VacancyId
export const makeSelectProcessByVacancyId = () => (store, vacancy_id, options = {}) => {
  const selectVacancyById = makeSelectVacancyById()
  const vacancy = selectVacancyById(store, vacancy_id, {})
  if (!vacancy) return null

  const selectProcessByCallId = makeSelectProcessByCallId()
  const process = selectProcessByCallId(store, vacancy.call_id, options)
  if (!process) return null

  return process
}

//make selector process by CalendarId
export const makeSelectProcessByCalendarId = () => {
  const selectCallByCalendarId = makeSelectCallByCalendarId()
  const selectProcessById = makeSelectProcessById()
  const getStore = store => store
  const getOptions = (store, id, options = {}) => options

  return createSelector(
    [selectCallByCalendarId, getStore, getOptions],
    (call, store, options) => {
      const process_id = call ? call.selectiveProcess_id : null
      const process = selectProcessById(store, process_id, options)
      return process
    }
  )
}

//single instance of selectProcessById
export const selectProcessById = makeSelectProcessById()

//single instance of selectProcessByCallId
export const selectProcessByCallId = makeSelectProcessByCallId()

//single instance of selectProcessByVacancyId
export const selectProcessByVacancyId = makeSelectProcessByVacancyId()

//single instance of selectProcessByCalendarId
export const selectProcessByCalendarId = makeSelectProcessByCalendarId()
