/** @format */

import _ from 'lodash'

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
import { readListInscriptionEvent } from './inscriptionEvent'
import { readListPetitionEvent } from './petitionEvent'

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
      if (options.withFatherCalendar) {
        const opt_father_calendar = typeof options.withFatherCalendar === 'object' ? options.withFatherCalendar : {}
        if (opt_father_calendar.recursive) opt_father_calendar.withParentCalendar = { ...opt_father_calendar }
        dispatch(readCalendar(res.data.calendar_id, opt_father_calendar))
      }

      //baixar inscriptionEvents associados
      if (options.withInscriptionEvent) {
        const opt_ie = typeof options.withInscriptionEvent === 'object' ? options.withInscriptionEvent : {}
        dispatch(readListInscriptionEvent({ calendar_ids: [res.data.id], ...opt_ie }))
      }

      //baixar petitionEvents associados
      if (options.withPetitionEvent) {
        const opt_pe = typeof options.withPetitionEvent === 'object' ? options.withPetitionEvent : {}
        dispatch(readListPetitionEvent({ calendar_ids: [res.data.id], ...opt_pe }))
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
  let url = `/v1/calendars`
  const callIdsString = options.call_ids ? convertArrayToQueryString('call_ids', options.call_ids) : ''
  url = `${url}?${callIdsString}`

  dispatch(setCalendarLoading())
  spsApi
    .get(url)
    .then(res => {
      dispatch({ type: READ_LIST_CALENDAR, payload: res.data })

      const newOptions = _.omit(options, 'callbackOk')

      //baixar inscriptionEvents associados
      if (res.data.length > 0 && options.withInscriptionEvent) {
        const calendar_ids = res.data.map(calendar => calendar.id)
        const opt_inscriptionEvent =
          typeof options.withInscriptionEvent === 'object'
            ? { ...options.withInscriptionEvent, ...newOptions }
            : { ...newOptions }
        dispatch(readListInscriptionEvent({ calendar_ids: calendar_ids, ...opt_inscriptionEvent }))
      }

      //baixar petitionEvents associados
      if (res.data.length > 0 && options.withPetitionEvent) {
        const calendar_ids = res.data.map(calendar => calendar.id)
        const opt_petitionEvent =
          typeof options.withPetitionEvent === 'object'
            ? { ...options.withPetitionEvent, ...newOptions }
            : { ...newOptions }
        dispatch(readListPetitionEvent({ calendar_ids: calendar_ids, ...opt_petitionEvent }))
      }

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
      payload: { anotherError: true, message: err.message }
    })
  }
}
