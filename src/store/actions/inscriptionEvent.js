/** @format */

import _ from 'lodash'

import { GET_ERRORS } from '../../store/actionTypes'
import spsApi from '../../apis/spsServer'
import {
  LOADING_INSCRIPTIONEVENT,
  CREATE_INSCRIPTIONEVENT,
  READ_INSCRIPTIONEVENT,
  UPDATE_INSCRIPTIONEVENT,
  DELETE_INSCRIPTIONEVENT,
  READ_LIST_INSCRIPTIONEVENT
} from '../../store/actionTypes'
import { convertArrayToQueryString } from '../../utils/queryHelpers'
import { readListInscription } from './inscription'

//InscriptionEvent loading
export const setInscriptionEventLoading = () => {
  return { type: LOADING_INSCRIPTIONEVENT }
}

//InscriptionEvent create
export const createInscriptionEvent = (data, options = {}) => (dispatch, getState) => {
  spsApi
    .post('/v1/inscriptionevents', data)
    .then(res => {
      dispatch({ type: CREATE_INSCRIPTIONEVENT, payload: res.data })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//InscriptionEvent read
export const readInscriptionEvent = (id, options = {}) => (dispatch, getState) => {
  const newOptions = _.omit(options, 'callbackOk')

  dispatch(setInscriptionEventLoading())
  spsApi
    .get(`/v1/inscriptionevents/${id}`)
    .then(res => {
      dispatch({ type: READ_INSCRIPTIONEVENT, payload: res.data })

      //get inscriptions if needed
      if (options.withInscription) {
        const opt_inscription =
          typeof options.withInscription === 'object' ? { ...options.withInscription, ...newOptions } : {}
        dispatch(readListInscription({ inscriptionEvent_ids: [res.data.id], ...opt_inscription }))
      }

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//InscriptionEvent update
export const updateInscriptionEvent = (id, data, options = {}) => (dispatch, getState) => {
  spsApi
    .put(`/v1/inscriptionevents/${id}`, data)
    .then(res => {
      dispatch({ type: UPDATE_INSCRIPTIONEVENT, payload: res.data })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//InscriptionEvent delete
export const deleteInscriptionEvent = (id, options = {}) => (dispatch, getState) => {
  spsApi
    .delete(`/v1/inscriptionevents/${id}`)
    .then(res => {
      dispatch({ type: DELETE_INSCRIPTIONEVENT, payload: id })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//InscriptionEvent Add List
export const readListInscriptionEvent = (options = {}) => dispatch => {
  let url = `/v1/inscriptionevents`
  const callIdString = options.call_id ? `call_id=${options.call_id}` : ''
  const calendarIdsString = options.calendar_ids ? convertArrayToQueryString('calendar_ids', options.calendar_ids) : ''

  url = `${url}?`
  url = callIdString ? `${url}${callIdString}` : url
  url = callIdString && calendarIdsString ? `${url}&` : url
  url = calendarIdsString ? `${url}${calendarIdsString}` : url
  const newOptions = _.omit(options, 'callbackOk')

  dispatch(setInscriptionEventLoading())
  spsApi
    .get(url)
    .then(res => {
      dispatch({ type: READ_LIST_INSCRIPTIONEVENT, payload: res.data })

      //get inscriptions if needed
      if (options.withInscription) {
        const iEventIds = res.data.map(ie => ie.id)
        dispatch(readListInscription({ inscriptionEvent_ids: iEventIds, ...newOptions }))
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
