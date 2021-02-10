/** @format */

import _ from 'lodash'

import { GET_ERRORS } from '../actionTypes'
import { LOADING_CALL, CREATE_CALL, READ_CALL, UPDATE_CALL, DELETE_CALL, READ_LIST_CALL } from '../actionTypes'
import spsApi from '../../apis/spsServer'
import { readListCalendar } from './calendar'
import { readListVacancy } from './vacancy'
import { convertArrayToQueryString } from '../../utils/queryHelpers'

//Call loading
export const setCallLoading = () => {
  return { type: LOADING_CALL }
}

//Call create
export const createCall = (data, options = {}) => (dispatch, getState) => {
  spsApi
    .post('/v1/calls', data)
    .then(res => {
      dispatch({ type: CREATE_CALL, payload: res.data })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//Call read
export const readCall = (id, options = {}) => (dispatch, getState) => {
  dispatch(setCallLoading())
  spsApi
    .get(`/v1/calls/${id}`)
    .then(res => {
      dispatch({ type: READ_CALL, payload: res.data })
      const newOptions = _.omit(options, 'callbackOk')

      //get calendars if need
      if (options.withCalendar) {
        const opt_calendar =
          typeof options.withCalendar === 'object' ? { ...options.withCalendar, ...newOptions } : { ...newOptions }
        dispatch(readListCalendar({ call_ids: [res.data.id], ...opt_calendar }))
      }

      //get vacancies if need
      if (options.withVacancy) {
        const opt_calendar =
          typeof options.withVacancy === 'object' ? { ...options.withVacancy, ...newOptions } : { ...newOptions }
        dispatch(readListVacancy({ call_ids: [res.data.id], ...opt_calendar }))
      }

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//update Call
export const updateCall = (id, updateData, options = {}) => dispatch => {
  spsApi
    .put(`/v1/calls/${id}`, updateData)
    .then(res => {
      dispatch({ type: UPDATE_CALL, payload: res.data })

      //run callbackOK
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//Call delete
export const deleteCall = (id, options = {}) => (dispatch, getState) => {
  spsApi
    .delete(`/v1/calls/${id}`)
    .then(res => {
      dispatch({ type: DELETE_CALL, payload: id })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//Call List
export const readListCall = (options = {}) => (dispatch, getState) => {
  let url = `/v1/calls`
  const selectiveProcessIdsString = options.selectiveProcess_ids
    ? convertArrayToQueryString('selectiveProcess_ids', options.selectiveProcess_ids)
    : ''
  url = `${url}?${selectiveProcessIdsString}`

  dispatch(setCallLoading())
  spsApi
    .get(url)
    .then(res => {
      dispatch({ type: READ_LIST_CALL, payload: res.data })

      const newOptions = _.omit(options, 'callbackOk')

      //get calendars if need
      if (res.data.length > 0 && options.withCalendar) {
        const call_ids = res.data.map(call => call.id)
        dispatch(readListCalendar({ ...newOptions, call_ids: call_ids }))
      }

      //get vacancies if need
      if (res.data.length > 0 && options.withVacancy) {
        const call_ids = res.data.map(call => call.id)
        dispatch(readListVacancy({ ...newOptions, call_ids: call_ids }))
      }

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//Function to handle errors
const handleErrors = (err, dispatch) => {
  if (err.response) {
    let errors = {}
    errors.data = err.response.data
    errors.serverError = true
    dispatch({
      type: GET_ERRORS,
      payload: errors
    })
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: { anotherError: true }
    })
  }
}
