/** @format */

import { GET_ERRORS } from '../../store/actionTypes'
import spsApi from '../../apis/spsServer'
import {
  LOADING_CALENDAR,
  CREATE_CALENDAR,
  READ_CALENDAR,
  UPDATE_CALENDAR,
  DELETE_CALENDAR,
  READ_LIST_CALENDAR
} from '../../store/actionTypes'
import { convertArrayToQueryString } from '../../utils/queryHelpers'

//Calendar loading
export const setCalendarLoading = () => {
  return { type: LOADING_CALENDAR }
}

//Calendar create
export const createCalendar = (data, options = {}) => (dispatch, getState) => {
  spsApi
    .post('/v1/calendars', data)
    .then(res => {
      dispatch({ type: CREATE_CALENDAR, payload: res.data })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//Calendar read
export const readCalendar = (id, options = {}) => (dispatch, getState) => {
  dispatch(setCalendarLoading())
  spsApi
    .get(`/v1/calendars/${id}`)
    .then(res => {
      dispatch({ type: READ_CALENDAR, payload: res.data })

      //baixar calendarios associados
      if (options.withCalendar) {
        if (res.data.calendar_id !== null) {
          dispatch(readCalendar(res.data.calendar_id, options))
        }
      }

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//Calendar update
export const updateCalendar = (id, data, options = {}) => (dispatch, getState) => {
  spsApi
    .put(`/v1/calendars/${id}`, data)
    .then(res => {
      dispatch({ type: UPDATE_CALENDAR, payload: res.data })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//Calendar delete
export const deleteCalendar = (id, options = {}) => (dispatch, getState) => {
  spsApi
    .delete(`/v1/calendars/${id}`)
    .then(res => {
      dispatch({ type: DELETE_CALENDAR, payload: id })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//Calendar Add List
export const readListCalendar = (options = {}) => dispatch => {
  dispatch(setCalendarLoading())
  let url = `/v1/calendars`
  const callIdsString = options.call_ids ? convertArrayToQueryString('call_ids', options.call_ids) : ''
  url = `${url}?${callIdsString}`

  spsApi
    .get(url)
    .then(res => {
      dispatch({ type: READ_LIST_CALENDAR, payload: res.data })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
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
