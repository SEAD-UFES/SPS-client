/** @format */

import _ from 'lodash'

import { GET_ERRORS } from '../../store/actionTypes'
import spsApi from '../../apis/spsServer'
import {
  LOADING_PETITIONEVENT,
  CREATE_PETITIONEVENT,
  READ_PETITIONEVENT,
  DELETE_PETITIONEVENT,
  READ_LIST_PETITIONEVENT
} from '../../store/actionTypes'
import { convertArrayToQueryString } from '../../utils/queryHelpers'
import { readInscriptionEvent } from './inscriptionEvent'

//PetitionEvent loading
export const setPetitionEventLoading = () => {
  return { type: LOADING_PETITIONEVENT }
}

//PetitionEvent create
export const createPetitionEvent = (data, options = {}) => (dispatch, getState) => {
  spsApi
    .post('/v1/petitionevents', data)
    .then(res => {
      dispatch({ type: CREATE_PETITIONEVENT, payload: res.data })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//PetitionEvent read
export const readPetitionEvent = (id, options = {}) => (dispatch, getState) => {
  const newOptions = _.omit(options, 'callbackOk')

  dispatch(setPetitionEventLoading())
  spsApi
    .get(`/v1/petitionevents/${id}`)
    .then(res => {
      dispatch({ type: READ_PETITIONEVENT, payload: res.data })

      //load inscriptionEvent associado.
      if (options.withInscriptionEvent) {
        const opt_InscriptionEvent =
          typeof options.withInscriptionEvent === 'object' ? options.withInscriptionEvent : {}
        dispatch(readInscriptionEvent(res.data.inscriptionEvent_id, { ...opt_InscriptionEvent }))
      }

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//PetitionEvent delete
export const deletePetitionEvent = (id, options = {}) => (dispatch, getState) => {
  console.log('action de delete')
  spsApi
    .delete(`/v1/petitionevents/${id}`)
    .then(res => {
      dispatch({ type: DELETE_PETITIONEVENT, payload: id })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//InscriptionEvent Add List
export const readListPetitionEvent = (options = {}) => dispatch => {
  let url = `/v1/petitionevents`
  const callIdString = options.call_id ? `call_id=${options.call_id}` : ''
  const calendarIdsString = options.calendar_ids ? convertArrayToQueryString('calendar_ids', options.calendar_ids) : ''

  url = `${url}?`
  url = callIdString ? `${url}${callIdString}` : url
  url = callIdString && calendarIdsString ? `${url}&` : url
  url = calendarIdsString ? `${url}${calendarIdsString}` : url
  const newOptions = _.omit(options, 'callbackOk')

  dispatch(setPetitionEventLoading())
  spsApi
    .get(url)
    .then(res => {
      dispatch({ type: READ_LIST_PETITIONEVENT, payload: res.data })

      //get petitions if needed
      if (options.withPetition) {
        const pEventIds = res.data.map(pe => pe.id)
        //dispatch(readListInscription({ petitionEvent_ids: pEventIds, ...newOptions }))
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
