/** @format */

import { createSelector } from 'reselect'

import { selectVacancyByCallId } from './vacancy'

const selectProcessStore = store => store.processStore

export const selectSingleCallById = (store, call_id, options = {}) => {
  let call = store.callStoreV2.byId[call_id] ? { ...store.callStoreV2.byId[call_id] } : null
  return call
}

export const makeSelectCallById = () => {
  return createSelector(
    [selectSingleCallById, selectVacancyByCallId, (store, id, options) => options],
    (call, vacancies, options) => {
      let newCall = call
      if (call && options.withVacancy) newCall.vacancies = vacancies
      return newCall
    }
  )
}

//selectCall
export const selectCallById = makeSelectCallById()

//selectProcess
export const selectProcessByCallId = createSelector(
  [selectProcessStore, makeSelectCallById()],
  (processStore, call) => (call ? processStore.process : null)
)
