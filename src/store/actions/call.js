/** @format */

import _ from 'lodash'

import { GET_ERRORS } from '../actionTypes'
import { LOADING_CALL, CREATE_CALL, READ_CALL, UPDATE_CALL, DELETE_CALL } from '../actionTypes'
import spsApi from '../../apis/spsServer'
import { readListCalendar } from './calendar'
import { readListVacancy } from './vacancy'

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
        dispatch(readListCalendar({ ...newOptions, call_ids: [res.data.id] }))
      }

      //get vacancies if need
      if (options.withVacancy) {
        dispatch(readListVacancy({ ...newOptions, call_ids: [res.data.id] }))
      }

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      console.log(err)
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
